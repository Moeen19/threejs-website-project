import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './public/index.html',
        about: './public/about.html',
        contact: './public/contact.html',
        more: './public/more.html',
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/textures/**/*',
          dest: 'textures'
        }
      ]
    })
  ]
});
