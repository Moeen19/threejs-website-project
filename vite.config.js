import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'),
        about: path.resolve(__dirname, 'public/about.html'),
        contact: path.resolve(__dirname, 'public/contact.html'),
        more: path.resolve(__dirname, 'public/more.html'),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'public/assets/wolf/**/*'),
          dest: 'assets/wolf'
        }
      ]
    })
  ],
  assetsInclude: ['**/*.hdr']
});
