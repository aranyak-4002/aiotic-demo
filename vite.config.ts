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
        dashboard: resolve(__dirname, 'dashboard/index.html'),
        'interior-design': resolve(__dirname, 'interior-design/index.html'),
        'interior-design-about': resolve(__dirname, 'interior-design/about/index.html'),
        'interior-design-services': resolve(__dirname, 'interior-design/services/index.html'),
        'interior-design-portfolio': resolve(__dirname, 'interior-design/portfolio/index.html'),
        'interior-design-contact': resolve(__dirname, 'interior-design/contact/index.html'),
        'interior-premium': resolve(__dirname, 'interior-premium/index.html'),
        'interior-premium-about': resolve(__dirname, 'interior-premium/about/index.html'),
        'interior-premium-services': resolve(__dirname, 'interior-premium/services/index.html'),
        'interior-premium-portfolio': resolve(__dirname, 'interior-premium/portfolio/index.html'),
        'interior-premium-contact': resolve(__dirname, 'interior-premium/contact/index.html'),
        'real-estate': resolve(__dirname, 'real-estate/index.html'),
        'real-estate-properties': resolve(__dirname, 'real-estate/properties/index.html'),
        'real-estate-services': resolve(__dirname, 'real-estate/services/index.html'),
        'real-estate-about': resolve(__dirname, 'real-estate/about/index.html'),
        'real-estate-team': resolve(__dirname, 'real-estate/team/index.html'),
      },
    },
  },
})
