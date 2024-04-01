import * as fs from "fs";

/* v8 ignore next 6 */
export const log = {
  info: (message: string) => console.log(`🗯️ ${message}`),
  warn: (message: string) => console.log(`⚠️ ${message}`),
  error: (message: string) => console.error(`⛔ ${message}`),
  success: (message: string) => console.log(`✅ ${message}`),
  plain: (message: string) => console.log(message),
}

/**
 * Create a directory if it does not exist
 * @param dir the directory to create
 */
export const createDirIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive
        : true
    });
  }
}

/**
 * Get directory from file path
 * @param filePath the file path
 * @param splitChar the split character
 * @returns the directory
 * 
 * @example
 * filePathToDir("path/to/file.txt") // "path/to"
 */
export const filePathToDir = (filePath: string, splitChar: string = "\\") => {
  return filePath.split(splitChar).slice(0, -1).join(splitChar);
}
