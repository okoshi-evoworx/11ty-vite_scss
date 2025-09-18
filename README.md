# 11ty + vite + scss + tailwind
htmlはNunjucksを用いた11tyを、scss+jsはviteを使用しています。  
tailwind はhtmlを解析する必要があるので postcssで11tyで実行しています。  



## 準備
### node_modulesインストール
```
npm i
```

## dev
```
npm run serve
```
※ または `npm run s`

### Watchのみ
```
npm run watch
```
※ または `npm run w`

## build
```
npm run build
```
## Check(lint)
- `npm run check` Nunjucks + js + css
- `npm run check:njk` ：Nunjucks (Markuplint + Prettier/Tailwind)
- `npm run check:js` ：JS (Biome)
- `npm run check:css` ：CSS (Stylelint)

## Fix
- `npm run fix` ：Nunjucks + js + css
- `npm run fix:njk` ：njk
- `npm run fix:js` ：js
- `npm run fix:css` ：css

## VSCode Plugin
Tailwind CSSのClass名の整列はVSCodeでも可能です。

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## a11y test
```
npm run test
```
### 参考
- [Accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [@axe-core/playwright によるアクセシビリティテストの自動化](https://azukiazusa.dev/blog/axe-core-playwright/)

## beautify
HTMLの整形（[js-beautify](https://github.com/beautify-web/js-beautify)使用）
```
npm run beautify:html
```

## Directory
```
├─ dist/
│   ├─ css/
│   │   ├─ tailwind.css
│   │   └─ styles.css
│   ├─ js/
│   │   └─ main.js
│   ├─ img/
│   └─ index.html
├─ public/：静的ファイル
├─ src/
│   ├─ css/
│   │   ├─ foundation/
│   │   │   ├─ mixin/：SCSSの@mixin, @function
│   │   │   └─ variable/：CSS変数
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ object/
│   │   │  ├─ component/：UIコンポーネント（再利用可能な最小単位）
│   │   │  ├─ page/：コンポーネントの組み合わせ（ページ単位のパーツ）
│   │   │  └─ utility/：ユーティリティ（Skip to Content等）
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ styles.scss
│   │   └─ tailwind.css ※拡張子注意
│   ├─ img/
│   ├─ js/
│   │   ├─ modules/
│   │   └─ main.js
│   └─ njk/
│       ├─ _data/: データ格納用
│       ├─ _includes/： インクルードファイル
│       │   ├─ base/： 基本構造
│       │   │   ├─ breadcrumbs.njk： パンくずリスト
│       │   │   ├─ footer.njk： 共通フッター
│       │   │   ├─ gtm_noscript.njk： GTMタグ（noscript）
│       │   │   ├─ gtm.njk： GTMタグ
│       │   │   ├─ header.njk： 共通ヘッダー
│       │   │   └─ index.njk： 基本HTML構造
│       │   ├─ components/： コンポーネント
│       │   │   ├─ news_item.njk： ニュース記事一覧パーツ
│       │   │   └─ pager.njk： ページネーション
│       │   └─ layouts/： レイアウト（Markdown）
│       │       └─ news_detail.njk： News詳細用テンプレート
│       └─ _template/： テンプレートファイル
│           └─ data/： データ出力確認用
├─ tests/
│   └─ axe.spec.js：@axe-core/playwright設定ファイル
├─ .editorconfig
├─ .gitignore
├─ .markuplintrc
├─ .node-version
├─ .stylelintignore
├─ .stylelintrc.cjs
├─ biome.json
├─ eleventy.config.js
├─ mise.toml
├─ package-lock.json
├─ package.json
├─ playwright.config.js
├─ README.md
└─ vite.config.js
```
## 11ty

### Data
- [Eleventy Supplied Data | 11ty](https://www.11ty.dev/docs/data-eleventy-supplied/)
- [DATA | TEMPLATE(デモ)](http://localhost:8080/_template/data/)

### Collection
- [Collections | 11ty](https://www.11ty.dev/docs/collections/)
- [Pagination | 11ty](https://www.11ty.dev/docs/pagination/)
- [NEWS一覧（デモ）](http://localhost:8080/news/)

## 11ty Image
11ty Image Pluginを入れているので imgタグに `eleventy:formats="webp"` を追加するとwebpに変換されます。

```
<img src="/img/360x360.png" alt="" width="360" height="360" loading="lazy" eleventy:formats="webp" />
```
↓
```
<img src="/img/360x360.webp" alt="" width="360" height="360" loading="lazy">
```

widthを複数指定する場合は、`width`の代わりに`eleventy:widths`を使用してください。
```
<img src="/img/360x360.png" alt="テスト" eleventy:widths="180,360" height="360" loading="lazy" eleventy:formats="webp,png" />
```
↓
```
<picture><source type="image/webp" srcset="/img/360x360-180.webp 180w, /img/360x360-360.webp 360w" sizes="auto"><img alt="テスト" loading="lazy" src="/img/360x360-180.png" height="180" width="180" sizes="auto" srcset="/img/360x360-180.png 180w, /img/360x360-360.png 360w"></picture>
```

変換してほしくない画像には `eleventy:ignore` を追加してください。
```
<img src="https://placehold.jp/cccccc/ffffff/320x320.png" alt="" width="360" height="360" loading="lazy" eleventy:ignore" />
```

詳しくは [11ty - Image](https://www.11ty.dev/docs/plugins/image/)を参照してください。

※srcディレクトリ内の、imgタグに記載されていない画像(=Image pluginsで処理しないogp画像など）もコピーしたい場合は `eleventy.config.js` の `templateFormats` に拡張子を追加してください。
