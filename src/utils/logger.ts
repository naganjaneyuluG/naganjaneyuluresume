
/**
 * Enhanced logger utility with different log levels and time stamps
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const ENABLE_DEBUG = true; // Set to false in production

const getTimeStamp = () => {
  return new Date().toISOString();
};

const logger = {
  debug: (message: string, ...args: any[]) => {
    if (ENABLE_DEBUG) {
      console.debug(`[${getTimeStamp()}] [DEBUG] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    console.info(`[${getTimeStamp()}] [INFO] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[${getTimeStamp()}] [WARNING] ${message}`, ...args);
  },
  
  error: (message: string, ...args: any[]) => {
    console.error(`[${getTimeStamp()}] [ERROR] ${message}`, ...args);
  },
  
  // Group related logs together
  group: (groupName: string, logFn: () => void) => {
    console.group(`[${getTimeStamp()}] ${groupName}`);
    try {
      logFn();
    } finally {
      console.groupEnd();
    }
  }
};

export default logger;

