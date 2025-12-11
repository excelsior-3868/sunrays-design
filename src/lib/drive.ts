import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Initialize auth - requires Service Account credentials in environment variables
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

export interface DriveFolder {
    id: string;
    name: string;
    description?: string;
    createdTime?: string;
    coverImage?: string;
}

export interface DriveFile {
    id: string;
    name: string;
    webViewLink?: string;
    webContentLink?: string;
    thumbnailLink?: string;
    mimeType: string;
}

/**
 * Lists all subfolders in the root gallery folder (Albums)
 */
export async function getBeforeAlbums() {
    if (!ROOT_FOLDER_ID) {
        console.error('GOOGLE_DRIVE_ROOT_FOLDER_ID is not set');
        return [];
    }

    try {
        const response = await drive.files.list({
            q: `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and tracehed = false`,
            fields: 'files(id, name, description, createdTime)',
            orderBy: 'createdTime desc',
        });

        const folders = response.data.files || [];

        // Fetch cover images for each album (first image in the folder)
        // We do this in parallel, but limit concurrency if needed. For now, Promise.all is okay for small sets.
        const albumsWithCovers = await Promise.all(
            folders.map(async (folder) => {
                const coverImage = await getAlbumCoverImage(folder.id!);
                return {
                    id: folder.id!,
                    name: folder.name!,
                    description: folder.description || '',
                    createdTime: folder.createdTime!,
                    coverImage
                };
            })
        );

        return albumsWithCovers;
    } catch (error) {
        console.error('Error fetching albums from Drive:', error);
        return [];
    }
}

/**
 * Gets the first image in a folder to use as a cover
 */
async function getAlbumCoverImage(folderId: string): Promise<string | undefined> {
    try {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(thumbnailLink, webContentLink)',
            pageSize: 1, // We only need one
        });

        const file = response.data.files?.[0];
        // Use a high-res thumbnail if possible, or webContentLink. 
        // thumbnailLink usually ends with =s220. We can replace it with =s1000 for higher res.
        return file?.thumbnailLink?.replace('=s220', '=s800') || file?.webContentLink;
    } catch (error) {
        console.warn(`Could not fetch cover for folder ${folderId}`, error);
        return undefined;
    }
}

/**
 * Lists all images in a specific folder (Album Photos)
 */
export async function getAlbumPhotos(folderId: string): Promise<DriveFile[]> {
    try {
        const response = await drive.files.list({
            // mimeType contains 'image/' to filter only images
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)',
            orderBy: 'createdTime desc',
            pageSize: 100
        });

        return (response.data.files || []).map(file => ({
            id: file.id!,
            name: file.name!,
            mimeType: file.mimeType!,
            webViewLink: file.webViewLink || '',
            webContentLink: file.webContentLink || '',
            // Optimize thumbnail size for gallery display
            thumbnailLink: file.thumbnailLink?.replace('=s220', '=s1200') // Fetch large version
        }));
    } catch (error) {
        console.error(`Error fetching photos for folder ${folderId}:`, error);
        return [];
    }
}

/**
 * Get folder details (title, description)
 */
export async function getAlbumDetails(folderId: string) {
    try {
        const response = await drive.files.get({
            fileId: folderId,
            fields: 'id, name, description, createdTime',
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching album details ${folderId}:`, error);
        return null;
    }
}
