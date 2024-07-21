import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: "./public/index.html",
        about: "./public/about.html",
        contact: "./public/contact.html",
        more: "./public/more.html",
      },
    },
  },
});
