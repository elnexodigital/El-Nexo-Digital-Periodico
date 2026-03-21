
export const CLOUDINARY_CLOUD_NAMES = {
  AUDIO: 'dgvkbrgre',
  VIDEO: 'ddmj6zevz',
  IMAGE: 'ddmj6zevz', // Using the same cloud name as video for images
  GENERAL: 'dnauavz56',
  SECONDARY_VIDEO: 'dus9zcgen',
  MISC: 'dsammmekc'
};

export const getCloudinaryUrl = (
  path: string, 
  cloudName: string = CLOUDINARY_CLOUD_NAMES.AUDIO, 
  resourceType: string = 'video',
  params: string = ''
): string => {
  // Cloudinary uses 'video' for audio files as well
  const prefix = params ? `${params}/` : '';
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${prefix}${path}`;
};

/**
 * Utility to clean and encode media URLs, specifically handling Cloudinary parameters
 * that might cause 404 errors in certain environments.
 */
export const cleanMediaUrl = (url: string): string => {
  if (!url) return '';
  
  let clean = url;
  
  // Remove q_auto:good which is causing 404s in this environment/Cloudinary account
  if (clean.includes('cloudinary.com') && clean.includes('q_auto:good')) {
    clean = clean.replace('q_auto:good/', '');
  }
  
  // Ensure the URL is correctly encoded for the browser
  try {
    // decodeURIComponent first in case it's already partially encoded, 
    // then encodeURI for a clean result
    return encodeURI(decodeURIComponent(clean));
  } catch (e) {
    return encodeURI(clean);
  }
};
