/**
 * Utility functions for iframe security and video embed URL generation
 */

/**
 * Get video embed URL for various video platforms
 * @param url - The original video URL
 * @param autoplay - Whether to enable autoplay (default: false)
 * @param muted - Whether to mute the video (default: true)
 * @param loop - Whether to loop the video (default: false)
 * @returns The embed URL
 */
export const getVideoEmbedUrl = (
  url: string, 
  autoplay: boolean = false, 
  muted: boolean = true, 
  loop: boolean = false
): string => {
  // YouTube
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return url;
    
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    if (muted) params.append('mute', '1');
    if (loop) {
      params.append('loop', '1');
      params.append('playlist', videoId);
    }
    params.append('rel', '0'); // Don't show related videos
    params.append('modestbranding', '1'); // Hide YouTube logo
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (!videoId) return url;
    
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    if (muted) params.append('muted', '1');
    if (loop) params.append('loop', '1');
    params.append('title', '0'); // Hide title
    params.append('byline', '0'); // Hide byline
    params.append('portrait', '0'); // Hide portrait
    
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  }
  
  // Dailymotion
  if (url.includes('dailymotion.com/video/')) {
    const videoId = url.split('dailymotion.com/video/')[1]?.split('?')[0];
    if (!videoId) return url;
    
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    if (muted) params.append('mute', '1');
    if (loop) params.append('loop', '1');
    params.append('ui-logo', '0'); // Hide logo
    params.append('ui-start-screen-info', '0'); // Hide info
    
    return `https://www.dailymotion.com/embed/video/${videoId}?${params.toString()}`;
  }
  
  // Facebook
  if (url.includes('facebook.com/') && url.includes('/videos/')) {
    return url.replace('facebook.com', 'facebook.com/plugins/video.php');
  }
  
  // Instagram
  if (url.includes('instagram.com/p/') && url.includes('/')) {
    const postId = url.split('instagram.com/p/')[1]?.split('/')[0];
    return postId ? `https://www.instagram.com/p/${postId}/embed/` : url;
  }
  
  // TikTok
  if (url.includes('tiktok.com/@') && url.includes('/video/')) {
    return url.replace('tiktok.com', 'tiktok.com/embed');
  }
  
  // Direct video file
  if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
    return url;
  }
  
  // For any other URL, return as is (will be handled by iframe)
  return url;
};

/**
 * Get secure iframe attributes for video embeds
 * @param title - The iframe title for accessibility
 * @param allowFullScreen - Whether to allow fullscreen (default: true)
 * @returns Object with iframe attributes
 */
export const getSecureIframeAttributes = (
  title: string, 
  allowFullScreen: boolean = true
) => {
  return {
    title,
    className: "w-full h-full",
    frameBorder: "0" as const,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen,
    sandbox: "allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox" as const,
    loading: "lazy" as const,
  };
};

/**
 * Check if a URL is from an allowed video platform
 * @param url - The URL to check
 * @returns Whether the URL is from an allowed platform
 */
export const isAllowedVideoPlatform = (url: string): boolean => {
  const allowedDomains = [
    'youtube.com',
    'youtu.be',
    'vimeo.com',
    'dailymotion.com',
    'facebook.com',
    'instagram.com',
    'tiktok.com'
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    // If URL parsing fails, check if it's a direct video file
    return url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) !== null;
  }
};

/**
 * Sanitize video URL to prevent XSS
 * @param url - The URL to sanitize
 * @returns The sanitized URL
 */
export const sanitizeVideoUrl = (url: string): string => {
  // Remove any script tags or javascript: protocols
  return url
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};
