
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_URL: string;
  readonly VITE_AUTH_SECRET: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_STORAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
