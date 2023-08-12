import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

const path = require('path')
export default defineConfig({
  base: '/pod-attack-calc/',
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [
        VuetifyResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom'
  }
})
