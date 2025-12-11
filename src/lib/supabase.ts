import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Missing Supabase environment variables. Some features may not work.')
}

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations (only use in server components or API routes)
export function createServerSupabaseClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
        return supabase
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

// Database types
export type Album = {
    id: string
    created_at: string
    title: string
    description: string | null
    cover_image_url: string | null
}

export type GalleryItem = {
    id: string
    created_at: string
    title: string | null
    description: string | null
    image_url: string
    drive_file_id: string | null
    drive_web_view_link: string | null
    album_id: string | null
}
