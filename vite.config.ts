import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, resolve(__dirname, 'vite_env'))
  process.env.NODE_ENV = env.VITE_NODE_ENV
  console.log(env)
  return {
    base: './',
    envDir: './vite_env',
    envPrefix: ['VITE_'],
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              'src/assets/style/base.less'
            )}";`
          },
          javascriptEnabled: true
        }
      }
    },
    server: {
      hmr: true,
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_HOST,
          port: env.VITE_PROXY_PORT,
          secure: env.VITE_IS_SECURE == 'true',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/files': {
          target: env.VITE_PROXY_HOST,
          port: env.VITE_PROXY_PORT,
          secure: env.VITE_IS_SECURE == 'true',
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
        // 打包时去掉 log
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // 分包编译
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
