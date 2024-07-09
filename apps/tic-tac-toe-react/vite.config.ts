/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/tic-tac-toe-react',

  server: {
    port: 4201,
    host: 'localhost',
  },

  preview: {
    port: 4301,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    federation({
      name: 'styling-react',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/app/App.tsx',
      },
      // shared: ['react', 'react-dom'],
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/tic-tac-toe-react',
    assetsDir: 'tic-tac-toe-react-assets',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
