/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}

// interface ImportMetaEnv {
//   VITE_APP_TITLE: string,
//   VITE_APP_PORT: string,
//   VITE_APP_BASE_API: string
// }

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare global {
  const ElMessage: typeof import('element-plus/es')['ElMessage']
}
export {}