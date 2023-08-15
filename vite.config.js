import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const path = require('path')
export default defineConfig({
  base: '/pod-attack-calc/',
  plugins: [
    vue(),
    vuetify()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: [
      'tests/vuetify.config.ts'
    ]
  },
  ssr: {
    noExternal: ['vuetify']
  }
})
