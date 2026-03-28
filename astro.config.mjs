import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astro.in\u4e00.be',
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
