import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const path = require('path')
export default defineConfig({
  base: '/pod-attack-calc/',
  build: {
    rollupOptions: {
      external: [
        'd2-data/json/LocaleStringsEn.json',
        'd2-data/json/Weapons.json'
      ]
    }
  },
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