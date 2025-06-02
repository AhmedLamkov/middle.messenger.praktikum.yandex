import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  plugins: [eslint()],
});
