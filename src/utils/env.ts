
/**
 * A utility to safely access environment variables
 */
export const env = {
  databaseUrl: import.meta.env.VITE_DATABASE_URL,
  authSecret: import.meta.env.VITE_AUTH_SECRET,
  authUrl: import.meta.env.VITE_AUTH_URL,
  apiUrl: import.meta.env.VITE_API_URL,
  storageUrl: import.meta.env.VITE_STORAGE_URL,
};

/**
 * Checks if all required environment variables are defined
 * @returns True if all required environment variables are defined
 */
export const checkEnvVariables = (): boolean => {
  const requiredEnvVars = [
    'databaseUrl',
    'authSecret',
    'authUrl',
    'apiUrl',
    'storageUrl'
  ];

  const missingEnvVars = requiredEnvVars.filter(key => !env[key as keyof typeof env]);

  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    return false;
  }

  return true;
};
