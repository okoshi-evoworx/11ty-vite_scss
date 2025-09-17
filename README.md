# 11ty + vite + scss + tailwind
htmlはNunjucksを用いた11tyを、scss+jsはviteを使用しています。  
tailwind はhtmlを解析する必要があるので postcssで11tyで実行しています。  



## 準備
### node_modulesインストール
```
npm i
```
### 開発用SSL証明書の準備
mkcertが入っていなかったらHomebrewでインストールする。
```
brew install mkcert
```
↓ 自己認証局の作成
```
mkcert -install
```
### localhost SSL証明書発行
`localhost.pem` `localhost-key.pem` は gitで追跡対象にしていないので環境ごとに作成します。
```
mkcert localhost
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
- `npm run check` ：HTML + Nunjucks + js + css
- `npm run check:html` ：HTML(Markuplint)
- `npm run check:njk` ：Nunjucks (Prettier/Tailwind)
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
│       │  ├─ base/： 基本構造（ヘッダー・フッターなど）
│       │  ├─ components/： コンポーネント
│       │  └─ layouts/： レイアウトファイル
│       │     ├─ news_detail.njk： News詳細マークダウンファイル用テンプレート
│       │     └─ base.njk： 全体のベースファイル
│       └─ _template/： テンプレートファイル
│          └─ data/： データ出力確認用
├─ tests/
│   └─ axe.spec.js：@axe-core/playwright設定ファイル
├─ .browserslistrc
├─ .editorconfig
├─ .gitignore
├─ .markuplintrc
├─ .node-version
├─ .stylelintignore
├─ .stylelintrc.cjs
├─ biome.json
├─ eleventy.config.js
├─ localhost.pem
├─ localhost-key.pem
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
- [DATA | TEMPLATE(デモ)](https://localhost:8080/_template/data/)

### Collection
- [Collections | 11ty](https://www.11ty.dev/docs/collections/)
- [Pagination | 11ty](https://www.11ty.dev/docs/pagination/)
- [NEWS一覧（デモ）](https://localhost:8080/news/)