import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: 'autoUpdate',
  includeAssets: ['apollo.png', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Calendario',
    short_name: 'Calendario',
    description: 'Calendario de gestion de empresas',
    theme_color: '#374151',
    icons: [
      {
        src: '/CalendarioCeleste.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
    background_color: '#374151',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait-primary',
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
