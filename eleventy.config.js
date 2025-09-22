import fs from 'fs'
import path from 'path';
import postcss from 'postcss';
import postcssLightningcss from 'postcss-lightningcss'
import tailwindcss from '@tailwindcss/postcss';
import { format } from 'date-fns';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import clean from "eleventy-plugin-clean";


export default async function (eleventyConfig) {

  // eleventy-plugin-clean
  // https://github.com/kentaroi/eleventy-plugin-clean
  eleventyConfig.addPlugin(clean);

  // 11ty Image
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['auto'],
    // widths: ["auto"],
    failOnError: false,
    transformOnRequest: false,
    outputDir: undefined,
    urlPath: undefined,
    sharpOptions: {
      animated: true,
      quality: 100,
    },
    filenameFormat: function (id, src, width, format, options) {
      // Define custom filenames for generated images
      // id: hash of the original image
      // src: original image path
      // width: current width in px
      // format: current file format
      // options: set of options passed to the Image call

      // ファイル名だけ取り出して dist/img/ に格納
      // const filename = src.split('/').pop().replace(/\.[^/.]+$/, "");

      // src/njk/img/ 内の階層を維持したまま dist/img/ に格納
      const filename = src.replace(/src\/njk\/img\//, '').replace(/\.[^/.]+$/, "");

      // widthの値が1つだけなら拡張子のみ変更
      if (options.widths.length === 1) {
        return `${filename}.${format}`;
      }
      return `${filename}-${width}.${format}`;
    },
    htmlOptions: {
      imgAttributes: {
        alt : "", // required
        loading: "lazy",
      },
      // HTML attributes added to `<picture>` (omitted when <img> used)
      pictureAttributes: {},
      // Which source to use for `<img width height src>` attributes
      fallback: "smallest", // or "smallest"
    }
  });

  // Collections (NEWS)：newsディレクトリ配下を取得
  // https://www.11ty.dev/docs/collections-api/
	eleventyConfig.addCollection('news', async function (collectionApi) {
		return collectionApi.getFilteredByGlob('src/njk/news/**/*.md');
	});

  // Filter (datetime) 2025-01-01 -> 2025-01-01
	eleventyConfig.addFilter('datetime', function (value) {
		return format(value, 'yyyy-MM-dd');
	});

  // Filter (dateview) 2025-01-01 -> 2025.01.01
	eleventyConfig.addFilter('dateview', function (value) {
		return format(value, 'yyyy.MM.dd');
	});

  // Eleventy Dev Server
  // https://www.11ty.dev/docs/dev-server/
  eleventyConfig.setServerOptions({
		liveReload: true,
		domDiff: true,
		port: 8080,
		watch: ['dist/css/*.css', 'dist/js/*.js'],
		showAllHosts: false,
		// https: {
		// 	key: "./localhost-key.pem",
		// 	cert: "./localhost.pem",
		// },
		indexFileName: "index.html",
		onRequest: {},
	});

  // TailwindCSS
  // https://www.humankode.com/eleventy/how-to-set-up-tailwind-4-with-eleventy-3/
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/tailwind/app.css');
    const tailwindOutputPath = './dist/css/tailwind.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([
      tailwindcss(),
      postcssLightningcss({
        lightningcssOptions: {
          minify: true,
          sourceMap: false,
          drafts: {
            nesting: false,
          },
        }
      })
    ])
    .process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });
  // tailwind.cssの変更を監視
  eleventyConfig.addWatchTarget('src/tailwind/**/*.css');

  // File Copy
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy('src/njk/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/njk/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/njk/favicon.svg');

  // Nunjucks
  // https://www.11ty.dev/docs/languages/nunjucks/
  // eleventyConfig.setNunjucksEnvironmentOptions({
  //   autoescape: true, // default: true
  //   throwOnUndefined: true, // default: false
  //   trimBlocks: false, // default: false
  //   lstripBlocks: false, // default: false
  //   watch: false, // default: false
  //   noCache: false, // default: false
  // });

  return {
    // templateFormats: ['njk', 'html', 'md', 'json', 'jpg', 'png', 'svg', 'webp', 'gif', 'ico' ],// inputディレクトリ（src/njk）からコピーしたいファイルも含める
    templateFormats: ['njk', 'html', 'md', 'json'],// 画像はプラグインから処理するため除外
    pathPrefix: '/',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src/njk',
      output: "dist",
      includes: "_includes",
      layouts: "_includes/layouts",// Front Matter
      data: "_data",
    },
  };
};

