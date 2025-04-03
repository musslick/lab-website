/**
 * Utility to export the current localStorage data as TypeScript code
 * that could be used as the default data in the application.
 */

import { formatObject } from './formatUtils';

// Define the types of data that can be exported
const DATA_TYPES = [
  'projects', 
  'teamMembers', 
  'newsItems', 
  'collaborators', 
  'publications', 
  'software', 
  'jobOpenings',
  'fundingSources'
];

/**
 * Exports the current localStorage data as formatted TypeScript code
 */
export const exportAsDefaultData = (): { 
  success: boolean; 
  data?: {[key: string]: string}; 
  error?: string 
} => {
  try {
    const result: {[key: string]: string} = {};

    // Process each data type
    DATA_TYPES.forEach(type => {
      const data = localStorage.getItem(type);
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          
          // Generate TypeScript code for this data type
          result[type] = formatDataAsTypeScript(type, parsedData);
        } catch (e) {
          console.error(`Error parsing ${type} data:`, e);
        }
      }
    });

    return { 
      success: true, 
      data: result 
    };
  } catch (error) {
    console.error("Error exporting data:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Formats a data object as TypeScript code
 */
const formatDataAsTypeScript = (type: string, data: any[]): string => {
  // Start with the export statement
  let result = `export const ${type} = `;
  
  // Format the data as a pretty-printed TypeScript object
  result += formatObject(data, 2); // 2 spaces indentation
  
  // Add a semicolon at the end
  result += ';';
  
  return result;
};

/**
 * Downloads the exported data as TypeScript files
 */
export const downloadAsTypeScriptFiles = () => {
  const { success, data, error } = exportAsDefaultData();
  
  if (!success || !data) {
    alert(`Failed to export data: ${error}`);
    return;
  }
  
  // Create a ZIP file containing all the TypeScript files
  Object.entries(data).forEach(([type, code]) => {
    // Create a Blob containing the TypeScript code
    const blob = new Blob([code], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.ts`;
    
    // Add to document, click it, then remove it
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
};
