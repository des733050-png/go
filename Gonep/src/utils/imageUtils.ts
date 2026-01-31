// Import all images from assets directory
import clinicAtHandOpenCrossview from '../assets/Clinic at hand open crossview.jpeg';
import clinicAtHandOpenWithIllustration from '../assets/Clinic at Hand open with illustration.jpeg';
import clinicAtHandClosedFrontLandscape from '../assets/clinic at hand closed front landscape.jpeg';
import clinicAtHandClosedVerticalPortrait from '../assets/clinic at hand closed vertical portrait.jpeg';
import logoWithoutTaglineBgWhite from '../assets/logo without tagline bg white.jpeg';
import fullLogoWithTaglineBgWhite from '../assets/full logo with tagline bg white.jpeg';
import logoWithoutTaglineBgRemoved from '../assets/flogo without tagline bg removed.png';

// Image mapping object
export const images = {
  clinicAtHandOpenCrossview,
  clinicAtHandOpenWithIllustration,
  clinicAtHandClosedFrontLandscape,
  clinicAtHandClosedVerticalPortrait,
  logoWithoutTaglineBgWhite,
  fullLogoWithTaglineBgWhite,
  logoWithoutTaglineBgRemoved,
};

// Function to get image by name
export function getImage(name: keyof typeof images): string {
  return images[name];
}

// Function to get image with fallback
export function getImageWithFallback(name: keyof typeof images, fallback?: string): string {
  try {
    return images[name];
  } catch (error) {
    console.warn(`Image ${name} not found, using fallback`);
    return fallback || images.clinicAtHandOpenCrossview;
  }
}

// Legacy support - map old string paths to imported images
export const imageMap: Record<string, string> = {
  '/assets/Clinic at hand open crossview.jpeg': images.clinicAtHandOpenCrossview,
  '/assets/Clinic at Hand open with illustration.jpeg': images.clinicAtHandOpenWithIllustration,
  '/assets/clinic at hand closed front landscape.jpeg': images.clinicAtHandClosedFrontLandscape,
  '/assets/clinic at hand closed vertical portrait.jpeg': images.clinicAtHandClosedVerticalPortrait,
  '/assets/logo without tagline bg white.jpeg': images.logoWithoutTaglineBgWhite,
  '/assets/full logo with tagline bg white.jpeg': images.fullLogoWithTaglineBgWhite,
  '/assets/flogo without tagline bg removed.png': images.logoWithoutTaglineBgRemoved,
};

// Function to convert legacy paths to imported images
export function convertImagePath(path: string): string {
  return imageMap[path] || path;
}
