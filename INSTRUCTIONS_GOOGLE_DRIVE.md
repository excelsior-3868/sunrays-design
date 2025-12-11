# Google Drive Gallery Integration

The Gallery page now pulls albums and photos directly from a Google Drive folder.

## Prerequisities

You need to set up a **Google Cloud Service Account** and grant it access to your Drive folder.

### 1. Create a Service Account
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "Sunrays Website").
3. Enable the **Google Drive API**.
4. Go to **Credentials** > **Create Credentials** > **Service Account**.
5. Give it a name (e.g., "website-gallery-bot").
6. Click **Done**.
7. Click on the newly created Service Account (email looks like `...-bot@...iam.gserviceaccount.com`).
8. Go to the **Keys** tab > **Add Key** > **Create new key** > **JSON**.
9. A `.json` file will download. Open it.

### 2. Configure Environment Variables
Open `.env.local` in `sunrays-design` and add the following variables using values from the JSON file:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_ROOT_FOLDER_ID="THE_ID_OF_THE_FOLDER_CONTAINING_ALBUMS"
```

*Note: For `GOOGLE_PRIVATE_KEY`, copy the entire string including `\n`. The code handles the newlines automatically.*

### 3. Share the Drive Folder
1. Go to your Google Drive (`gmail:gallery.sunrayspreschool.com`).
2. Right-click the folder that contains your Album subfolders.
3. Click **Share**.
4. Paste the **Service Account Email** (`...-bot@...iam.gserviceaccount.com`).
5. Set permission to **Viewer**.
6. Click **Send**.
7. Copy the **Folder ID** from the URL (the part after `folders/`) and put it in `GOOGLE_DRIVE_ROOT_FOLDER_ID`.

## Structure
- **Root Folder** (ID in .env)
  - **Album Folder 1** (Folder Name becomes Album Title)
    - Photo1.jpg
    - Photo2.jpg
  - **Album Folder 2**
    - ...
