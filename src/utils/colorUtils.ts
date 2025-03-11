/**
 * Convert a hex color code to RGB values
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Parse the hex values to get r, g, b
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);

  return [r, g, b];
};

/**
 * Convert RGB values to a hex color code
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
};

/**
 * Blend two colors together
 */
export const blendColors = (color1: string, color2: string, ratio: number = 0.5): string => {
  // Convert hex to RGB
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  
  // Blend the colors
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  // Convert back to hex
  return rgbToHex(r, g, b);
};

/**
 * Mix a color with the lab blue color to maintain consistent branding
 */
export const mixWithLabColor = (color: string, mixRatio: number = 0.3): string => {
  const labBlue = '#00AAFF';
  return blendColors(color, labBlue, mixRatio);
};

interface GradientOptions {
  includeHighlight?: boolean;
  highlightColor?: string;
  mixColors?: boolean;
  mixRatio?: number;
  angle?: number;
  direction?: string;
  type?: 'linear' | 'radial';
  position?: string;
}

/**
 * Create a CSS gradient string from an array of colors
 * @param colors Array of color strings (hex, rgb, etc.)
 * @param options Configuration options for the gradient
 * @returns CSS gradient string
 */
export const createGradient = (colors: string[], options: GradientOptions = {}): string => {
  const {
    includeHighlight = false,
    highlightColor = '#00AAFF', // Default lab blue
    mixColors = false,
    mixRatio = 0.2,
    angle = 135,
    direction = '',
    type = 'radial', // Changed default to radial
    position = 'circle at center' // Default position for radial gradient
  } = options;

  // Ensure we have at least one color
  if (!colors || colors.length === 0) {
    return `${type === 'linear' ? 'linear' : 'radial'}-gradient(${direction || `${angle}deg`}, #FF5733, ${highlightColor})`;
  }

  // Add the highlight color if requested
  let gradientColors = [...colors];
  if (includeHighlight && !colors.includes(highlightColor)) {
    gradientColors = type === 'radial' ? 
      [...gradientColors, highlightColor] : // For radial, add highlight at the end (outside)
      [highlightColor, ...gradientColors];   // For linear, add at beginning
  }

  // Create the gradient stops
  let gradientStops;
  
  if (type === 'linear') {
    gradientStops = gradientColors.map((color, index) => {
      const percentage = Math.round((index / (gradientColors.length - 1)) * 100);
      return `${color} ${percentage}%`;
    }).join(', ');
    
    return `linear-gradient(${direction || `${angle}deg`}, ${gradientStops})`;
  } else {
    // For radial gradients, we want to make sure the lab blue is always the outermost color
    const labBlueIndex = gradientColors.indexOf(highlightColor);
    
    // If lab blue is included and not already at the end, move it there
    if (labBlueIndex !== -1 && labBlueIndex !== gradientColors.length - 1) {
      const blueColor = gradientColors.splice(labBlueIndex, 1)[0];
      gradientColors.push(blueColor);
    }
    
    gradientStops = gradientColors.map((color, index) => {
      // For radial, inner colors cover less area, outer colors cover more
      const percentage = Math.round(Math.pow(index / (gradientColors.length - 1), 0.8) * 100);
      return `${color} ${percentage}%`;
    }).join(', ');
    
    return `radial-gradient(${position}, ${gradientStops})`;
  }
};

/**
 * Adjusts the brightness of a hex color
 * @param color - Hex color string
 * @param percent - Percent to adjust (positive = lighter, negative = darker)
 * @returns Adjusted hex color
 */
const adjustBrightness = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

/**
 * Mix two colors with a given ratio
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @param ratio - Ratio of second color (0-1)
 * @returns Mixed hex color
 */
const mixColorWithRatio = (
  color1: string,
  color2: string,
  ratio: number
): string => {
  // Convert hex to RGB
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  // Mix the colors based on ratio
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Determines if a color is light or dark
 */
export const isLightColor = (color: string): boolean => {
  const [r, g, b] = hexToRgb(color);
  
  // Calculate perceived brightness using YIQ formula
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  return yiq >= 128; // 128 is the threshold between light and dark
};

/**
 * Lighten or darken a color
 * @param color The base color (hex)
 * @param amount Amount to lighten (positive) or darken (negative). Range: -1 to 1
 * @returns Modified color (hex)
 */
export const adjustColor = (color: string, amount: number): string => {
  // Remove hash if present
  color = color.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Adjust RGB values
  const adjustComponent = (value: number): number => {
    const newValue = value + Math.round(value * amount);
    return Math.min(255, Math.max(0, newValue));
  };
  
  const newR = adjustComponent(r);
  const newG = adjustComponent(g);
  const newB = adjustComponent(b);
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

/**
 * Convert hex color to HSL
 * @param hex Hex color string
 * @returns Array of [hue, saturation, lightness]
 */
export const hexToHsl = (hex: string): [number, number, number] => {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Convert hex to RGB
  const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
  const b = parseInt(cleanHex.substr(4, 2), 16) / 255;
  
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
};

/**
 * Convert HSL values to hex color
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns Hex color string
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

/**
 * Generate a color with same hue and saturation but different lightness
 * @param baseColor Base color in hex format (e.g. '#00AAFF')
 * @param index Index to use for generating different lightness values
 * @param totalItems Total number of items for distribution
 * @returns Hex color with adjusted lightness
 */
export const generateTopicColor = (baseColor: string, index: number, totalItems: number = 10): string => {
  // Convert base color to HSL
  const [h, s, _] = hexToHsl(baseColor);
  
  // Generate lightness based on index, range from 35% to 70%
  // This range provides good visibility on both light and dark backgrounds
  const minLightness = 35;
  const maxLightness = 70;
  
  // Calculate lightness using a consistent distribution
  let l = minLightness;
  if (totalItems > 1) {
    // Distribute lightness values across the range
    l = minLightness + ((maxLightness - minLightness) * (index % totalItems)) / (totalItems - 1);
  }
  
  // Convert back to hex
  return hslToHex(h, s, l);
};

/**
 * Generate multiple topic colors based on a base color (lab color)
 * @param baseColor Base color (lab color)
 * @param topicCount Number of topics
 * @returns Array of hex color strings
 */
export const generateTopicColors = (baseColor: string, topicCount: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < topicCount; i++) {
    colors.push(generateTopicColor(baseColor, i, topicCount));
  }
  return colors;
};