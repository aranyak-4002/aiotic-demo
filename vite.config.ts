import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
'interior-design': resolve(__dirname, 'interior-design/index.html'),
        'interior-premium': resolve(__dirname, 'interior-premium/index.html'),
        'real-estate': resolve(__dirname, 'real-estate/index.html'),
      },
    },
  },
})
