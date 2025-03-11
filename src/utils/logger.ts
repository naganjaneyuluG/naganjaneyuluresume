
/**
 * Simple logger utility with different log levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const ENABLE_DEBUG = true; // Set to false in production

const logger = {
  debug: (message: string, ...args: any[]) => {
    if (ENABLE_DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARNING] ${message}`, ...args);
  },
  
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  
  // Group related logs together
  group: (groupName: string, logFn: () => void) => {
    console.group(groupName);
    try {
      logFn();
    } finally {
      console.groupEnd();
    }
  }
};

export default logger;
