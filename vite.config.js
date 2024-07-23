import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './public/index.html',
        // other entries
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets/wolf/**/*',
          dest: 'assets/wolf'
        }
      ]
    })
  ],
  assetsInclude: ['**/*.hdr']
});
