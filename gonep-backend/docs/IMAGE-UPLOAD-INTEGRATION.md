# Image Upload Integration Guide

## Overview

The image upload system has been completely redesigned to provide a better user experience with automatic image optimization and preview functionality. Users can now upload images of any size and quality, and the system will automatically handle resizing and cropping to fit the intended display area.

## Key Features

### 🎯 **No Aspect Ratio Restrictions**
- Users can upload images of any dimensions
- System automatically handles resizing and cropping
- Maintains image quality during optimization

### 👁️ **Preview System**
- Shows users exactly how their image will look in different contexts
- Preview contexts: `blog`, `profile`, `logo`, `banner`, `thumbnail`
- Real-time preview with different styling for each context

### 📱 **Dual Upload Modes**
- **URL Mode**: Enter image URL directly
- **Upload Mode**: Drag & drop or click to upload files

### ✅ **Smart Validation**
- File type validation (JPEG, PNG, WebP)
- File size limits (configurable per context)
- Image quality preservation

## Implementation

### Backend Setup

#### 1. File Upload Endpoint
```typescript
POST /api/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

// Response
{
  "success": true,
  "data": {
    "file": {
      "id": 1,
      "filename": "file-1234567890-image.jpg",
      "originalFilename": "image.jpg",
      "filePath": "./uploads/file-1234567890-image.jpg",
      "fileSize": 1024000,
      "mimeType": "image/jpeg",
      "uploadedBy": 1
    }
  }
}
```

#### 2. File Serving
```typescript
// Static file serving
app.use('/api/uploads', express.static(config.UPLOAD_PATH));

// Access uploaded files at:
// http://localhost:8000/api/uploads/{filename}
```

#### 3. Database Schema
```sql
CREATE TABLE file_uploads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Frontend Components

#### ImageUpload Component
```typescript
interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  required?: boolean;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  recommendedSize?: {
    width: number;
    height: number;
  };
  previewContext?: 'blog' | 'profile' | 'logo' | 'banner' | 'thumbnail';
}
```

#### Usage Examples

**Blog Post Images**
```typescript
<ImageUpload
  label="Blog Post Image"
  value={formData.image || ''}
  onChange={(url) => setFormData({ ...formData, image: url })}
  helperText="Upload or enter URL for the blog post image"
  maxSize={5}
  recommendedSize={{ width: 1200, height: 630 }}
  previewContext="blog"
/>
```

**Profile Images**
```typescript
<ImageUpload
  label="Profile Image"
  value={formData.image || ''}
  onChange={(url) => setFormData({ ...formData, image: url })}
  helperText="Upload or enter URL for the team member's profile image"
  maxSize={3}
  recommendedSize={{ width: 400, height: 400 }}
  previewContext="profile"
/>
```

**Logo Images**
```typescript
<ImageUpload
  label="Partner Logo"
  value={formData.logoUrl || ''}
  onChange={(url) => setFormData({ ...formData, logoUrl: url })}
  helperText="Upload or enter URL for the partner's logo"
  maxSize={2}
  recommendedSize={{ width: 200, height: 200 }}
  previewContext="logo"
/>
```

## Preview Contexts

### Blog Context
- **Display**: Full-width banner style
- **Dimensions**: 100% width × 200px height
- **Object Fit**: Cover (crops to fit)
- **Use Case**: Blog post headers, article images

### Profile Context
- **Display**: Circular profile picture
- **Dimensions**: 120px × 120px
- **Object Fit**: Cover (crops to fit)
- **Border Radius**: 50% (circular)
- **Use Case**: User avatars, team member photos

### Logo Context
- **Display**: Rectangular logo container
- **Dimensions**: 150px × 80px
- **Object Fit**: Contain (fits entire image)
- **Use Case**: Company logos, partner badges

### Banner Context
- **Display**: Wide banner style
- **Dimensions**: 100% width × 150px height
- **Object Fit**: Cover (crops to fit)
- **Use Case**: Page headers, section banners

### Thumbnail Context
- **Display**: Square thumbnail
- **Dimensions**: 100px × 100px
- **Object Fit**: Cover (crops to fit)
- **Use Case**: Gallery thumbnails, preview images

## User Workflow

### 1. Upload Process
1. User clicks "Upload" mode or drags file
2. File is validated (type, size)
3. File is uploaded to server
4. Preview dialog opens automatically
5. User sees how image will look in context
6. User can accept or try different image

### 2. URL Process
1. User clicks "URL" mode
2. User enters image URL
3. Image is validated and previewed
4. User can see preview in context

### 3. Preview Features
- Shows image in actual display context
- Displays original dimensions
- Shows recommended size
- Explains automatic optimization
- Allows user to accept or change image

## Configuration

### Environment Variables
```env
# File Upload Settings
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### Component Configuration
```typescript
// Default settings
const defaultConfig = {
  maxSize: 5, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  previewContext: 'blog'
};
```

## Security Features

### File Validation
- MIME type checking
- File size limits
- File extension validation
- Malicious file detection

### Access Control
- Authentication required for uploads
- User tracking for uploaded files
- File ownership management

### Storage Security
- Files stored outside web root
- Unique filename generation
- Path traversal protection

## Performance Optimization

### Image Processing
- Automatic resizing for different contexts
- Quality preservation during optimization
- Lazy loading support
- CDN-ready URLs

### Caching
- Static file serving with proper headers
- Browser caching optimization
- CDN integration ready

## Error Handling

### Common Errors
- **File too large**: Shows size limit and allows retry
- **Invalid file type**: Lists allowed types
- **Upload failed**: Network error handling
- **Invalid URL**: URL validation and feedback

### User Feedback
- Clear error messages
- Visual indicators
- Retry options
- Help text and guidance

## Testing

### Test Script
```bash
# Run the test script
node test-upload.js
```

### Manual Testing
1. Test file upload with different sizes
2. Test URL input with various formats
3. Test preview functionality
4. Test error scenarios
5. Test responsive behavior

## Migration Guide

### From Old System
1. Remove `aspectRatio` props
2. Add `previewContext` props
3. Update component imports
4. Test upload functionality
5. Verify preview dialogs

### Breaking Changes
- `aspectRatio` prop removed
- New `previewContext` prop required
- Preview dialog behavior changed
- Upload flow now includes preview step

## Future Enhancements

### Planned Features
- Image editing tools (crop, rotate, filter)
- Multiple image upload
- Drag & drop reordering
- Image optimization settings
- Cloud storage integration

### Performance Improvements
- WebP conversion
- Progressive image loading
- Lazy loading optimization
- CDN integration

## Support

### Troubleshooting
1. Check file permissions on uploads directory
2. Verify environment variables
3. Check network connectivity
4. Review browser console for errors
5. Test with different file types

### Common Issues
- **Upload fails**: Check file size and type
- **Preview not showing**: Verify image URL accessibility
- **Permission errors**: Check uploads directory permissions
- **CORS issues**: Verify server configuration

---

This system provides a modern, user-friendly image upload experience with automatic optimization and clear preview functionality, ensuring users can confidently upload images knowing exactly how they will appear in their intended context.
