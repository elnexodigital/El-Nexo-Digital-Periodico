
export const CLOUDINARY_CLOUD_NAMES = {
  AUDIO: 'dgvkbrgre', // música 542 archivos
  VIDEO: 'dnauavz56', // postales, imágenes de publicidades, miniaturas de biblioteca y carátulas de los podcast en MP4
  IMAGE: 'dnauavz56', // postales, imágenes de publicidades, miniaturas
  GENERAL: 'dnauavz56',
  SECONDARY_VIDEO: 'dnauavz56',
  MISC: 'dnauavz56',
  PODCASTS: 'dgb6icyzx', // podcast MP3
  JINGLES: 'dgb6icyzx' // música propia, presentación de jingles propios
};

export const getCloudinaryUrl = (
  path: string, 
  cloudName: string = CLOUDINARY_CLOUD_NAMES.AUDIO, 
  resourceType: string = 'video',
  params: string = ''
): string => {
  // Cloudinary uses 'video' for audio files as well
  const prefix = params ? `${params}/` : '';
  
  // If path already contains a version (starts with v followed by digits), use it as is
  // Otherwise, we don't force a version anymore to avoid 404s if the version is wrong
  let finalPath = path;
  
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${prefix}${finalPath}`;
};

/**
 * Utility to clean and encode media URLs, specifically handling Cloudinary parameters
 * that might cause 404 errors in certain environments.
 */
export const cleanMediaUrl = (url: string): string => {
  if (!url) return '';
  
  let clean = url;
  
  // Remove problematic parameters
  if (clean.includes('cloudinary.com')) {
    // Remove q_auto, q_auto:good, f_auto and handle surrounding commas
    clean = clean.replace(/,?q_auto(:good)?,?/g, (match) => {
      if (match.startsWith(',') && match.endsWith(',')) return ',';
      return '';
    });
    
    clean = clean.replace(/,?f_auto,?/g, (match) => {
      if (match.startsWith(',') && match.endsWith(',')) return ',';
      return '';
    });
    
    // Clean up double slashes that might result from empty params
    clean = clean.replace(/\/upload\/\//, '/upload/');
    // Remove trailing comma in params if any
    clean = clean.replace(/\/upload\/,/, '/upload/');
    // Remove trailing comma before the version/path
    clean = clean.replace(/,\/v/, '/v');
  }
  
  return clean;
};
