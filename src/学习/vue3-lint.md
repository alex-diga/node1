---
title: vue3-lint
---

## 创建项目

```shell
pnpm create vite my-app --template vue-ts 
```

## 配置 eslint

### 安装 eslint

```shell
pnpm add eslint -D
```

### 初始化 eslint

```shell
pnpm eslint --init
```

设置初始化选项

```text
(1) How would you like to use ESLint?
选择：To check syntax and find problems

(2) What type of modules does your project use?
选择：JavaScript modules (import/export)

(3) Which framework does your project use?
选择：Vue.js

(4) Does your project use TypeScript?
选择：Yes

(5) Where does your code run?
选择：Browser

(6) What format do you want your config file to be in?
选择：JavaScript

(7) Would you like to install them now?
选择：Yes

(8) Which package manager do you want to use?
选择：pnpm
```

依赖安装完毕，项目会在根目录生成 `.eslintrc.js` 配置文件

```js
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {}
}
```

### 添加 lint 命令

在 `package.json` 文件 scripts 添加 lint 命令

```json
"scripts": {
  // eslint . 为指定 lint 当前项目中的文件
  // --ext 为指定 lint 哪些后缀的文件
  // --fix 开启自动修复
  // "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
  "lint": "eslint src --cache --ext .vue,.js,.ts,.jsx,.tsx"
}
```

### 执行 lint 命令

```shell
pnpm lint
```

此时命令行会显示报错信息，原因是在解析 .vue 后缀的文件时候出现解析错误

根据 [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#faq) 官方文档:
如果已经使用了另外的解析器(例如"parser": "@typescript-eslint/parser")，则需要将其移至 parseOptions，这样才不会与 vue-eslint-parser 冲突

```diff
- "parser": "@typescript-eslint/parser",
+ "parser": "vue-eslint-parser",
  "parserOptions": {
+   "parser": "@typescript-eslint/parser",
    "ecmaVersion": "latest",
    "sourceType": "module"
  }

```

修改完成，再执行pnpm lint，命令顺利执行校验通过

### 编辑器配置

#### 安装插件

编辑器(VsCode)扩展搜索 `ESLint` 选择安装

#### 添加编辑器配置

在项目根目录 `.vscode\settings.json` 文件添加配置，设置开启自动修复

```json
{
  // 其他选项...
  "editor.codeActionsOnSave": {
  // 开启自动修复
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

## 配置 prettier

### 安装 prettier

```shell
pnpm add prettier -D
```

### 添加 prettier 配置

在项目更目录新建 `.prettierrc.js` 配置文件

跟多配置信息可查看[官方文档](https://prettier.io/docs/en/options.html)

```js
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 120,
  // 一个tab代表几个空格数，默认为2
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: true,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: "all",
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true
}
```

### 添加 format 命令

在 `package.json` 文件 scripts 添加 lint 命令

```json
"scripts": {
  // 格式化src文件夹下的代码
  "format": "prettier --write \"./src/**/*.{html,vue,ts,js,json,md}\"",
}
```

### 执行 format 命令

```shell
pnpm format
```

### 编辑器配置 prettier

#### 安装插件 Prettier

编辑器(VsCode)扩展搜索 `Prettier` 选择安装

#### 添加编辑器格式化配置

在项目根目录 `.vscode\settings.json` 文件添加配置，设置自动完成格式化

```json
{
  // 其他选项...
  {
    // 保存的时候自动格式化
    "editor.formatOnSave": true,
    // 默认格式化工具选择 prettier
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 解决 eslint 和 prettier 冲突

### 安装依赖

```shell
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

### 调整 eslint 配置

修改 `.eslintrc.js` 配置文件

```diff
extends: [
  'eslint:recommended',
  'plugin:vue/vue3-essential',
  'plugin:@typescript-eslint/recommended',
+ 'plugin:prettier/recommended',
],
```

修改完成，重启编辑器(VsCode)

## 配置 stylelint

### 安装 stylelint

```shell
pnpm add stylelint postcss postcss-less postcss-html stylelint-config-prettier stylelint-config-recommended-less stylelint-config-standard stylelint-config-standard-vue stylelint-less stylelint-order -D
```

1. `stylelint`: css 样式 lint 工具
2. `postcss`: 转换 css 代码工具
3. `postcss-less`: 识别 less 语法
4. `postcss-html`: 识别 html/vue 中的 `<style></style>` 标签中的样式
5. `stylelint-config-standard`: Stylelint 的标准可共享配置规则，详细可查看官方文档
6. `stylelint-config-prettier`: 关闭所有不必要或可能与 Prettier 冲突的规则
7. `stylelint-config-recommended-less`: less 的推荐可共享配置规则，详细可查看官方文档
8. `stylelint-config-standard-vue`: lint.vue 文件的样式配置
9. `stylelint-less`: stylelint-config-recommended-less 的依赖，less 的 stylelint 规则集合
10. `stylelint-order`: 指定样式书写的顺序，在 .stylelintrc.js 中 order/properties-order 指定顺序

### 添加 lint:style 配置

在项目更目录新建 `.stylelintrc.js` 配置文件

跟多配置信息可查看[官方文档](https://stylelint.bootcss.com/user-guide/get-started)

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue'
  ],
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      // ...
    ]
  }
}
```

### 添加 lint:style 命令


在 `package.json` 文件 scripts 添加 `lint:style` 命令

```json
"scripts": {
  // 格式化 src 文件夹下的 css
  "lint:style": "stylelint \"./src/**/*.{css,less,vue,html}\" --fix"
}
```

### 执行 lint:style 命令

```shell
pnpm lint:style
```

### 编辑器配置 Stylelint

#### 安装插件 Stylelint

编辑器(VsCode)扩展搜索 `Stylelint` 选择安装

#### 添加编辑器样式配置

在项目根目录 `.vscode\settings.json` 文件添加配置，设置自动完成格式化

```diff
{
  // 保存的时候开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true,
+   "source.fixAll.stylelint": true
  },
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择 prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
+ "stylelint.validate": [
+   "css",
+   "less",
+   "vue",
+   "html"
+  ],
}
```

## 配置 husky

### 安装 husky 和 lint-staged

```shell
pnpm add husky lint-staged -D
```

### 添加 prepare 命令

在 `package.json` 文件 scripts 添加 prepare 命令

```json
"scripts": {
  "prepare": "husky install"
}
```

此命令会在执行 `pnpm install` 之后自动运行，这样项目在被克隆下来安装依赖后会自动执行该命令来安装 `husky`

### 执行 prepare 命令

执行 `pnpm prepare` 命令，项目新增了一个 `.husky` 目录

### 配置 lint-staged

在 `package.json` 文件增加 lint-staged 配置

```json
"lint-staged": {
  "*.{ts,vue,js,tsx,jsx}": [
    "eslint",
    "prettier --write",
  ],
  "*.{html,css,less,scss,md}": [
    "stylelint",
    "prettier --write"
  ]
},
```

### 新增 husky 钩子

使用 husky 命令添加 pre-commit 钩子

```shell
pnpm husky add .husky/pre-commit "npx --no-install lint-staged"
```

执行完上面的命令后，会在 .husky 目录下生成一个 pre-commit 文件

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

### 效果

提交到暂存区的代码也就会被 eslint + prettier 格式化和检查，进一步保证我们的代码规范

## 参考

1. [eslintrc-schemastore](https://json.schemastore.org/eslintrc)
1. [prettierrc-schemastore](https://json.schemastore.org/prettierrc)
