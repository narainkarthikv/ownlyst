import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        // Keep stable chunks for large dependencies
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('framer-motion')) return 'animation';
          if (id.includes('@hello-pangea/dnd')) return 'dnd';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-window')) return 'virtualization';
          return undefined;
        },
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
  },
});
