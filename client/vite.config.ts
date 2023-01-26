import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log(`proxy error: ${err}`);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log(
              `Seding request to the Target: ${req.method} ${req.url}`
            );
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              `Recieved response from the Target: ${proxyRes.statusCode} ${req.url}`
            );
          });
        },
      },
    },
  },
  plugins: [react()],
});
