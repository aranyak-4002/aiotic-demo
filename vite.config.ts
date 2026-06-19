import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        coaching: resolve(__dirname, 'coaching/index.html'),
        'interior-design': resolve(__dirname, 'interior-design/index.html'),
        'real-estate': resolve(__dirname, 'real-estate/index.html'),
      },
    },
  },
})
