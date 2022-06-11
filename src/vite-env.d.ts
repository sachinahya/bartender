/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FN_CORS_HEADERS?: string;
  readonly FN_CORS_ORIGIN?: string;
  readonly VITE_AUDIENCE?: string;
  readonly VITE_CLIENT_ID?: string;
  readonly VITE_DOMAIN?: string;
  readonly VITE_SCOPE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
