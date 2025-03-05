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

/**
 * Creates a CSS gradient using the provided colors
 * 
 * @param colors Array of color strings
 * @param options Configuration options
 * @returns CSS gradient string
 */
export const createGradient = (
  colors: string[], 
  options: {
    direction?: string;
    angle?: number;
    includeHighlight?: boolean;
    highlightColor?: string;
    highlightPosition?: number;
    mixColors?: boolean;
    mixRatio?: number;
    opacity?: number;
  } = {}
): string => {
  // Default options
  const {
    direction = undefined,
    angle = 135,
    includeHighlight = true,
    highlightColor = '#00AAFF',
    highlightPosition = 0.5, // Position in the gradient (0-1)
    mixColors = true, // Whether to blend each color with the highlight color
    mixRatio = 0.3, // How much to blend (0-1)
    opacity = 1
  } = options;
  
  // Handle empty colors array
  if (colors.length === 0) return '#f0f0f0';
  
  // If only one color, create a pleasing gradient with that color + lab blue
  if (colors.length === 1) {
    const baseColor = colors[0];
    const mixedColor1 = mixColors ? mixWithLabColor(baseColor, mixRatio * 0.7) : baseColor;
    const mixedColor2 = mixColors ? mixWithLabColor(baseColor, mixRatio * 1.3) : baseColor;
    
    // Create gradient with the base color, its mixed variant, and highlight color
    if (includeHighlight) {
      return `linear-gradient(${angle}deg, ${mixedColor1}, ${highlightColor}, ${mixedColor2})`;
    } else {
      return `linear-gradient(${angle}deg, ${mixedColor1}, ${mixedColor2})`;
    }
  }
  
  // Process the colors - mix them with lab blue if mixColors is true
  let processedColors = [...colors];
  if (mixColors) {
    processedColors = processedColors.map(color => mixWithLabColor(color, mixRatio));
  }
  
  // Add highlight color if requested
  let gradientColors = [...processedColors];
  if (includeHighlight) {
    // Calculate position to insert the highlight color
    const insertIndex = Math.floor(highlightPosition * gradientColors.length);
    gradientColors.splice(insertIndex, 0, highlightColor);
  }
  
  // Apply opacity if < 1
  if (opacity < 1) {
    gradientColors = gradientColors.map(color => {
      const [r, g, b] = hexToRgb(color);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });
  }
  
  // Create gradient stops
  const colorStops = gradientColors.map((color, index) => {
    const percentage = (index / (gradientColors.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');
  
  // Return the gradient string in the appropriate format
  if (direction) {
    return `linear-gradient(${direction}, ${colorStops})`;
  } else {
    return `linear-gradient(${angle}deg, ${colorStops})`;
  }
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