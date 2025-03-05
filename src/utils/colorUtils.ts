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
  direction?: string;
  includeHighlight?: boolean;
  highlightColor?: string;
  mixColors?: boolean;
  mixRatio?: number;
  angle?: number;
}

/**
 * Creates a CSS gradient string from an array of colors
 * @param colors - Array of color strings (hex)
 * @param options - Configuration options for the gradient
 * @returns CSS gradient string
 */
export const createGradient = (
  colors: string[],
  options: GradientOptions = {}
): string => {
  // Default options
  const {
    direction = 'to right',
    includeHighlight = false,
    highlightColor = '#00AAFF',
    mixColors = false,
    mixRatio = 0.2,
    angle = 120
  } = options;
  
  // If we don't have any colors, return a default gradient
  if (!colors.length) {
    return `linear-gradient(${angle}deg, #FF5733, ${highlightColor})`;
  }
  
  // If we only have one color, create a subtle gradient with the same color
  if (colors.length === 1) {
    const baseColor = colors[0];
    // If we should include a highlight color, mix it with the base color
    if (includeHighlight) {
      return `linear-gradient(${angle}deg, ${baseColor}, ${highlightColor}, ${baseColor})`;
    }
    // Otherwise make a subtle gradient by adjusting lightness
    return `linear-gradient(${angle}deg, ${baseColor}, ${adjustBrightness(baseColor, 15)})`;
  }
  
  // If we have multiple colors
  let gradientColors = [...colors]; // Clone the array
  
  // Mix colors with highlight if requested
  if (mixColors && includeHighlight) {
    gradientColors = gradientColors.map(color => 
      mixColorWithRatio(color, highlightColor, mixRatio)
    );
  }
  
  // Add highlight color in the middle if requested but not mixed
  if (includeHighlight && !mixColors) {
    // Insert highlight in the middle
    const middleIndex = Math.floor(gradientColors.length / 2);
    gradientColors.splice(middleIndex, 0, highlightColor);
  }
  
  // Create the gradient string
  return `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`;
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