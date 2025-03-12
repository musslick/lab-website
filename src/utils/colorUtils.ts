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
  // Ensure ratio is between 0 and 1
  const normalizedRatio = Math.max(0, Math.min(1, ratio));
  
  // Convert both colors to RGB
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  
  // Blend the colors based on the ratio
  const r = r1 + (r2 - r1) * normalizedRatio;
  const g = g1 + (g2 - g1) * normalizedRatio;
  const b = b1 + (b2 - b1) * normalizedRatio;
  
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
  h = h / 360;
  s = s / 100;
  l = l / 100;

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

  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generate a color with same hue and fixed saturation and lightness
 * @param baseColor Base color in hex format (e.g. '#00AAFF')
 * @param index Index to use for generating different hue values
 * @param totalItems Total number of items for distribution
 * @returns Hex color with fixed saturation and lightness
 */
export const generateTopicColor = (baseColor: string, index: number, totalItems: number = 10): string => {
  // Convert base color to HSL
  const [h, _, __] = hexToHsl(baseColor);
  
  // Fixed saturation and lightness values
  const s = 100; // 100% saturation for vibrant colors
  const l = 80;  // 80% lightness for bright, visible colors
  
  // Generate hue based on index, rotating around the color wheel
  // Formula: baseHue + (index * (360 / totalItems))
  const hueStep = 360 / Math.max(1, totalItems);
  const hue = (h + index * hueStep) % 360;
  
  // Convert back to hex
  return hslToHex(hue, s, l);
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

/**
 * Create a gradient specific for projects based on their topics
 * Combines the two previous versions into a single comprehensive function
 * @param project The project object with topics and topicsWithColors
 * @param baseColor The base color (lab color) to use when needed
 * @returns A CSS gradient string
 */
export const createProjectGradient = (
  project: any, 
  baseColor: string = '#00AAFF'
): string => {
  // Default return if no project or no topics
  if (!project || !project.topics || project.topics.length === 0) {
    return `radial-gradient(circle at center, ${baseColor} 0%, ${baseColor} 100%)`;
  }

  // Generate colors for topics with consistent ordering
  const topicColors = project.topics.map((topic: string, index: number) => {
    // Check if we already have this topic with a color
    const existingTopicWithColor = project.topicsWithColors?.find((t: any) => t.name === topic);
    
    if (existingTopicWithColor) {
      // Use existing color
      return existingTopicWithColor.color;
    } else {
      // Generate a new color - using the correct index order (not reversed)
      return generateTopicColor(baseColor, index, project.topics.length);
    }
  });

  // Always include the lab color
  if (!topicColors.includes(baseColor)) {
    topicColors.push(baseColor);
  }

  // Create a radial gradient using these colors
  const options = {
    type: 'radial' as const,
    position: 'circle at center',
    includeHighlight: false, // We already manually included the lab color
    mixColors: false, // Don't mix again as we're using the exact colors
  };

  return createGradient(topicColors, options);
};