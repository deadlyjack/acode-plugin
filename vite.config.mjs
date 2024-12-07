import { defineConfig } from 'vite';
import { resolve } from 'path';
import { exec } from 'node:child_process';

// Custom plugin to run bundle plugin zip
function zipPlugin() {
  return {
    name: 'zip-plugin',
    writeBundle() {
      createZip();
    }
  }
}

function createZip(callback) {
  exec('node .vscode/pack-zip.js', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    if (callback) callback();
  });
}

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js')
      },
      output: {
        format: 'es',
        entryFileNames: 'main.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        preserveModules: false,
      },
    }
  },
  plugins: [
    zipPlugin()
  ],
  server: {
    port: 3000
  }
})