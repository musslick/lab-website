// Lab color constant - used across the application
export const LAB_COLOR = '#00AAFF';
export const LAB_COLOR_DARK = '#005580';

/**
 * Converts a hex color to HSL components
 */
export function hexToHsl(hex: string): [number, number, number] {
  // Convert hex to RGB
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Converts HSL values to a hex color string
 */
export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates a topic color based on the provided hue
 */
export function generateTopicColor(hue: number): string {
  // Use a fixed saturation and lightness for consistent, vibrant colors
  return hslToHex(hue, 100, 80);
}

/**
 * Creates a gradient from multiple colors
 * @deprecated Use createProjectGradient instead
 */
export function createGradient(
  colors: string[],
  options: {
    direction?: string;
    includeHighlight?: boolean;
    highlightColor?: string;
    mixColors?: boolean;
    mixRatio?: number;
    type?: 'linear' | 'radial';
    position?: string;
  } = {}
): string {
  // For backwards compatibility, redirect to createProjectGradient
  return createProjectGradient(colors);
}

/**
 * Creates a unified project gradient for both cards and detail pages
 * 
 * @param topicColors Array of topic colors to include in the gradient
 * @param position The position for the radial gradient (e.g., 'circle at center')
 * @param options Additional options to customize the gradient
 * @returns A CSS gradient string
 */
export function createProjectGradient(
  topicColors: string[] = [], 
  position: string = 'circle at center',
  options: {
    baseColor?: string, 
    endColor?: string,
    distribution?: number
  } = {}
): string {
  // Default options
  const baseColor = options.baseColor || LAB_COLOR;
  const endColor = options.endColor || LAB_COLOR_DARK;
  const distribution = options.distribution || 50; // Percent of gradient to use for topic colors

  // If no topic colors, use the default lab blue color (not gradient)
  if (topicColors.length === 0) {
    return baseColor;
  }
  
  // Otherwise create a gradient with topic colors
  // Base color is on the outside (100%)
  // Topic colors are distributed in the inner area (0% to distribution%)
  const colorStops = topicColors.map((color, index, array) => {
    // Distribute colors between 0% and distribution% to leave space for base color on the outside
    const percentage = Math.round((index / Math.max(1, array.length - 1)) * distribution);
    return `${color} ${percentage}%`;
  }).join(', ');
  
  // Use baseColor at the outside (100%)
  return `radial-gradient(${position}, ${colorStops}, ${baseColor} 100%)`;
}

/**
 * Get topic colors from a project
 */
export function getTopicColorsFromProject(
  project: { topicsWithColors?: { name: string; color: string }[], topics?: string[] }
): string[] {
  if (project.topicsWithColors && project.topicsWithColors.length > 0) {
    return project.topicsWithColors.map(t => t.color);
  } else if (project.topics && project.topics.length > 0) {
    return project.topics.map((_, i) => {
      // Generate evenly spaced hues around the color wheel
      const hue = Math.round((i / project.topics!.length) * 360);
      return generateTopicColor(hue);
    });
  }
  return [];
}