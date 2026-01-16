# Event Popup Feature - Implementation Guide

## Overview
This feature allows you to display promotional popups/banners for special school events and advertisements on your public website's home page. The system includes a complete admin panel for managing these popups with image uploads, scheduling, and priority settings.

## Features Implemented

### 1. **MongoDB Model** (`Popup.ts`)
- Title and description fields
- Image URL storage
- Optional link URL for call-to-action
- Active/Inactive status toggle
- Priority ranking (higher number = higher priority)
- Optional start and end dates for scheduling
- Automatic timestamp tracking

### 2. **API Routes**
- **GET `/api/admin/popups`** - Fetch all popups (admin) or active popups (public)
- **POST `/api/admin/popups`** - Create a new popup
- **GET `/api/admin/popups/[id]`** - Get single popup
- **PUT `/api/admin/popups/[id]`** - Update popup
- **DELETE `/api/admin/popups/[id]`** - Delete popup

All admin routes are protected with authentication.

### 3. **Public Popup Component** (`EventPopup`)
- Automatically displays on page load
- Shows highest priority active popup
- Session-based tracking (won't show same popup twice in one session)
- Responsive design with smooth animations
- Click-to-close functionality
- Optional "Learn More" button if link URL is provided
- Modern glassmorphism effect

### 4. **Admin Panel** (`/admin/popups`)
- Beautiful card-based grid layout
- Create, edit, and delete popups
- Image upload with preview
- Set title, description, and link URL
- Configure priority and active status
- Schedule popups with start and end dates
- Real-time preview of uploaded images

### 5. **Navigation Integration**
- Added "Event Popups" menu item to admin sidebar
- Bell icon for easy identification
- Located between Contacts and Gallery for logical grouping

## How to Use

### For Administrators

#### Creating a New Popup:
1. Navigate to `/admin/popups` in your admin panel
2. Click the "+ Add New Popup" button
3. Fill in the form:
   - **Title** (required): Name of the event/promotion
   - **Description** (optional): Brief description to show below image
   - **Upload Image** (required): Select an image file
   - **Link URL** (optional): External link for "Learn More" button
   - **Priority**: Higher numbers display first (default: 0)
   - **Active**: Toggle to enable/disable immediately
   - **Start Date** (optional): When to start showing the popup
   - **End Date** (optional): When to stop showing the popup
4. Click "Create Popup"

#### Editing a Popup:
1. Click the "Edit" button on any popup card
2. Modify the fields as needed
3. Upload a new image if desired (optional)
4. Click "Update Popup"

#### Deleting a Popup:
1. Click the "Delete" button on any popup card
2. Confirm the deletion

### For Website Visitors

When visitors land on your website:
- The popup will automatically appear after a 500ms delay
- Only the highest priority, active popup within its date range is shown
- Users can close it by:
  - Clicking the X button
  - Clicking outside the popup
  - Clicking "Learn More" (if configured)
- Once closed, the same popup won't appear again during that session

## Technical Details

### Popup Display Logic
1. Fetches all popups with `isActive: true`
2. Filters by date range (if start/end dates are set)
3. Sorts by priority (descending) then creation date
4. Shows the first result
5. Tracks viewed popups in `sessionStorage`

### Scheduling Logic
A popup is shown when:
- `isActive` is `true`, AND
- Current date is within the start/end date range (if specified)

Date combinations:
- **No dates**: Always shown (when active)
- **Start date only**: Shown from start date onwards
- **End date only**: Shown until end date
- **Both dates**: Shown within the specified range

### Image Upload
- Uses the existing `/api/upload` endpoint
- Supports common image formats (PNG, JPG, JPEG, GIF, WebP)
- Images are automatically optimized by Next.js Image component
- Recommended size: 1600x900px (16:9 aspect ratio) for best display

### Session Storage
- Key: `seenPopups`
- Value: Array of popup IDs
- Resets when browser/tab is closed
- Prevents popup fatigue for users

## File Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── layout.tsx                    # Added EventPopup component
│   ├── admin/
│   │   └── (authenticated)/
│   │       └── popups/
│   │           ├── page.tsx              # Admin management page
│   │           └── page.module.css       # Styling
│   └── api/
│       └── admin/
│           └── popups/
│               ├── route.ts              # GET, POST endpoints
│               └── [id]/
│                   └── route.ts          # GET, PUT, DELETE endpoints
├── components/
│   ├── admin/
│   │   └── Sidebar.tsx                   # Updated with popup menu item
│   └── EventPopup/
│       ├── EventPopup.tsx                # Public popup component
│       └── EventPopup.module.css         # Popup styling
└── lib/
    └── models/
        └── Popup.ts                       # MongoDB model
```

## Example Use Cases

### 1. School Annual Day Announcement
- Title: "Annual Day 2026"
- Description: "Join us for our biggest celebration!"
- Start Date: 30 days before event
- End Date: Event day
- Priority: 10 (high)

### 2. Admission Open Notice
- Title: "Admissions Open for 2026"
- Link URL: /admissions
- Start Date: When admissions open
- End Date: Last day of admission
- Priority: 9

### 3. Holiday Notice
- Title: "School Closed - Holiday"
- Description: "We'll be closed for Dashain festival"
- Start Date: 3 days before holiday
- End Date: Holiday end date
- Priority: 8

### 4. Special Offer/Discount
- Title: "Early Bird Discount - 20% Off"
- Link URL: /admissions
- End Date: Offer expiry date
- Priority: 7

## Styling and Customization

### Popup Appearance
The popup uses:
- Modern gradient backgrounds
- Smooth fade-in/scale animations
- Glassmorphism backdrop
- Responsive design (mobile-friendly)
- Premium shadow effects

### Colors
- Primary gradient: Purple to blue (`#667eea` to `#764ba2`)
- Background overlay: Semi-transparent black with blur
- Text: Dark gray for readability

### Fonts
- Title: Uses Fredoka (playful, child-friendly)
- Body: System fonts with good readability

To customize, edit `EventPopup.module.css`.

## Best Practices

1. **Image Quality**: Use high-resolution images (minimum 1200px wide)
2. **Keep It Simple**: Avoid too much text in the popup
3. **Priority Management**: Use priorities thoughtfully (0-10 range recommended)
4. **Scheduling**: Always set end dates to avoid outdated popups
5. **Testing**: Create a popup, set it to active, and view the public site
6. **Mobile First**: Test on mobile devices as well
7. **Accessibility**: Ensure images have descriptive titles

## Troubleshooting

### Popup Not Showing?
- Check if popup is marked as "Active"
- Verify start/end dates are correct
- Clear sessionStorage in browser dev tools
- Ensure there's at least one active popup

### Image Not Uploading?
- Check file size (should be reasonable, < 5MB)
- Verify image format is supported
- Check upload API endpoint is working
- Ensure proper permissions on server

### Admin Panel Not Accessible?
- Verify you're logged in to admin panel
- Check authentication session
- Clear browser cache and cookies

## Future Enhancements (Optional)

Potential features you could add:
- Multiple popups in a carousel
- Geographic targeting
- A/B testing
- Click tracking analytics
- Scheduled auto-publishing
- Template library
- Video support

## Support

For any issues or questions about the popup feature, refer to this documentation or modify the components as needed.

## Sample Popup Image

A sample event popup image has been generated and is included in the artifacts. You can use this as a template or reference when creating your own popup images.
