import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/spatial-viewer/',
  plugins: [react({ include: /\.[jt]sx?$|\.js$/ })],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  envPrefix: ['VITE_', 'REACT_APP_'],
  optimizeDeps: {
    entries: ['index.html'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      'txml/txml': './node_modules/txml/dist/txml',
      'react/jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
    },
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  test: {
    globals: true,
  },
});