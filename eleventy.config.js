import fs from 'fs'
import path from 'path';
import postcss from 'postcss';
import postcssLightningcss from 'postcss-lightningcss'
import tailwindcss from '@tailwindcss/postcss';
import { format } from 'date-fns';

export default async function (eleventyConfig) {

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
    const tailwindInputPath = path.resolve('./src/css/tailwind.css');
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
    templateFormats: ['njk', 'html', 'md', 'json', 'jpg', 'png', 'svg', 'webp', 'gif', 'ico' ],// inputからコピーしたいファイルも含める
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

