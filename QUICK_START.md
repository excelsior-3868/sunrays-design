# Quick Start Guide - Event Popup Feature

## What Was Implemented

✅ **MongoDB Model** - Popup data structure with all necessary fields
✅ **API Routes** - Complete CRUD operations for popup management
✅ **Admin Panel** - Beautiful interface at `/admin/popups`
✅ **Public Popup Component** - Auto-displays on website home page
✅ **Navigation** - Added to admin sidebar
✅ **Documentation** - Complete usage guide

## Quick Setup Steps

### 1. Start the Development Server
```bash
cd c:\Github\sunrays-website\sunrays-design
npm run dev
```

### 2. Access the Admin Panel
1. Open browser: `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. Navigate to "Event Popups" in the sidebar

### 3. Create Your First Popup
1. Click "+ Add New Popup"
2. Fill in the form:
   - **Title**: "Welcome to Sunrays!"
   - **Description**: "Join us for our Annual Day celebration"
   - **Upload Image**: Select the sample image provided or your own
   - **Priority**: 10 (highest)
   - **Active**: ✓ (checked)
3. Click "Create Popup"

### 4. View on Public Website
1. Visit: `http://localhost:3000/`
2. The popup should appear automatically after 0.5 seconds
3. You can close it by:
   - Clicking the X button
   - Clicking outside the popup area

### 5. Test Session Tracking
1. Close the popup
2. Refresh the page
3. The popup won't show again (session-based tracking)
4. To see it again, open in incognito mode or clear session storage

## Environment Variables Required

Ensure these are set in your `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

## Admin Panel Features

### Popup Management Dashboard
- **Grid View**: All popups displayed in beautiful cards
- **Active Badge**: Visual indicator for active popups
- **Preview**: See image thumbnails directly
- **Quick Actions**: Edit and Delete buttons on each card

### Create/Edit Modal
- **Image Upload**: Drag-and-drop or click to upload
- **Live Preview**: See your image before saving
- **Priority System**: Control which popup shows first
- **Date Scheduling**: Set start and end dates
- **Active Toggle**: Enable/disable without deleting

## API Endpoints

### Public Endpoint (No Auth Required)
```
GET /api/admin/popups?public=true
```
Returns only active popups within their date range, sorted by priority.

### Admin Endpoints (Auth Required)
```
GET    /api/admin/popups           - List all popups
POST   /api/admin/popups           - Create new popup
GET    /api/admin/popups/:id       - Get single popup
PUT    /api/admin/popups/:id       - Update popup
DELETE /api/admin/popups/:id       - Delete popup
```

## Popup Display Logic

The popup will show if ALL conditions are met:
1. ✓ `isActive` = true
2. ✓ Current date >= `startDate` (if set)
3. ✓ Current date <= `endDate` (if set)
4. ✓ Not previously seen in current session
5. ✓ Has highest priority among eligible popups

## File Changes Summary

### New Files Created:
1. `src/lib/models/Popup.ts` - Database model
2. `src/app/api/admin/popups/route.ts` - Main API routes
3. `src/app/api/admin/popups/[id]/route.ts` - Single popup routes
4. `src/components/EventPopup/EventPopup.tsx` - Public component
5. `src/components/EventPopup/EventPopup.module.css` - Popup styles
6. `src/app/admin/(authenticated)/popups/page.tsx` - Admin page
7. `src/app/admin/(authenticated)/popups/page.module.css` - Admin styles
8. `POPUP_FEATURE_README.md` - Complete documentation
9. `QUICK_START.md` - This file

### Modified Files:
1. `src/app/(public)/layout.tsx` - Added EventPopup component
2. `src/components/admin/Sidebar.tsx` - Added menu item

## Testing Checklist

- [ ] Start dev server successfully
- [ ] Login to admin panel
- [ ] Access `/admin/popups` page
- [ ] Create a new popup with image upload
- [ ] Set popup as active
- [ ] Visit home page and see popup
- [ ] Close popup and verify it doesn't reappear
- [ ] Edit existing popup
- [ ] Delete a popup
- [ ] Test with multiple popups (different priorities)
- [ ] Test date range scheduling
- [ ] Test on mobile device (responsive design)

## Next Steps

1. **Create Real Content**: Replace sample popup with actual event images
2. **Set Priorities**: Organize popups by importance (10 = highest)
3. **Schedule Events**: Use date ranges for time-sensitive promotions
4. **Monitor Usage**: Track which popups get the most engagement
5. **Optimize Images**: Use properly sized images (1600x900px recommended)

## Troubleshooting

**Q: Popup not showing on home page?**
- Check if popup is set to "Active"
- Verify date range (if set)
- Clear sessionStorage in browser DevTools
- Check browser console for errors

**Q: Can't upload image?**
- Verify `/api/upload` endpoint is working
- Check file size (keep under 5MB)
- Ensure supported format (JPG, PNG, GIF, WebP)

**Q: Multiple popups showing?**
- Only the highest priority popup should show
- Check priority values (higher = shows first)
- Verify only one popup is active

**Q: Admin panel not accessible?**
- Ensure you're logged in
- Check authentication configuration
- Verify MongoDB connection

## Support

For detailed information, see `POPUP_FEATURE_README.md`

---

**Status**: ✅ Ready to use!
**Version**: 1.0
**Last Updated**: January 16, 2026
