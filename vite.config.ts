import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import {resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, resolve(__dirname, 'vite_env'))
  console.log(env)

  return {
    base: './',
    envDir: './vite_env',
    envPrefix: ['VITE_'],
    plugins: [vue(), VueSetupExtend()],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src')}]
    },
    server: {
      hmr: true,
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_HOST,
          secure: false,
          changeOrigin: true, 
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/files': {
          target: env.VITE_PROXY_HOST,
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/files': '/files'
          }  
        }
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    }  
  }
})