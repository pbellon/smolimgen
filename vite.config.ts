/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
