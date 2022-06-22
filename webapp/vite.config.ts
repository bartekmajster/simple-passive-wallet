import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import analyze from 'rollup-plugin-analyzer';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), eslint(), analyze()],
  build: {
    outDir: './dist',
  },
});
