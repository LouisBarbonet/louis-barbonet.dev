import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pure static output -- no server runtime. Deployed as static files behind
// nginx on the Oracle Cloud free-tier VM, same pattern as CoffeeExplorer.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
