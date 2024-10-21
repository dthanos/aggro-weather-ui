import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import {resolve} from 'path';
import routify from '@roxi/routify/vite-plugin';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@roxi/routify'],
  },
  plugins: [svelte(), routify()],
  resolve: {
    alias: [
      { find: "$stores", replacement: resolve(projectRootDir,'./src/stores') },
      { find: "$components", replacement: resolve(projectRootDir,'./src/components') },
      { find: "$assets", replacement: resolve(projectRootDir,'./src/assets') },
      { find: "$util", replacement: resolve(projectRootDir,'./src/util') },
    ],
  },
})
