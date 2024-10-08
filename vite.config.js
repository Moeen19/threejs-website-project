import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './public/index.html',
        contact: './public/contact.html',
        about: './public/about.html',
        more: './public/more.html',
      }
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets/**/*',
          dest: 'assets/'
        }
      ]
    })
  ],
  assetsInclude: ['**/*.hdr']
});
