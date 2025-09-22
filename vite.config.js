import {defineConfig} from 'vite'
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import path from 'path';


export default defineConfig({
    resolve: {
        alias: {
            "/node_modules": path.resolve(".", "node_modules"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        sassGlobImports(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
              additionalData: `
                @use "sass:math";
                @use "@/scss/foundation/mixin" as *;
                @use "@/scss/foundation/variable" as *;
              `,
              logger: {
                  warn(message, options) {
                  if (message.includes('@import rules are deprecated')) return
                  console.warn(`Warning: ${message}`)
                  },
              },
            },
        },
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist())// extend browserslist-config-baseline
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        assetsInlineLimit: 0,
        cssMinify: 'lightningcss',
        cssCodeSplit: true,
        rollupOptions: {
          input: [
            'src/js/main.js',
            'src/scss/styles.scss'
          ],
          output: {
                entryFileNames: `js/main.js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: (assetInfo) => {
                  // https://rollupjs.org/configuration-options/#output-assetfilenames
                  const { name } = assetInfo;

                  // 拡張子抽出
                  const extType = name.split('.').pop();

                  // CSS
                  if (extType === 'css') {
                    return `css/[name][extname]`;
                  }

                  return "assets/[name][extname]";
                },
            },
        },
    },
})