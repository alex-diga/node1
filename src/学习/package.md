---
title: package.json
---

## npm

> npm 是 node 的默认包管理工具，在项目工程开发中，通过 package.json 来管理项目中所依赖的 npm 包的配置

官方说明: [npm](https://www.npmjs.com/)为您和您的团队打开了整个 JavaScript 的世界。它是世界上最大的软件注册机构，每周下载量约为30亿次。该注册表包含600,000多个包（构建代码块）。来自各大洲的开源开发人员使用 npm 来共享和借用包，许多组织也使用 npm 来管理私有开发。

npm 由三部分组成:

1. 网站
2. CLI（命令行界面）工具
3. 注册表

## 创建 package.json 文件

通过 npm CLI 会初始化一个 node 项目，项目会生成 package.json

```shell
# 初始化node项目
npm init

# 使用 --yes 或 -y 创建默认值 package.json
# 此方法将 package.json 使用从当前目录中提取的信息生成默认值。
npm init -y
```

## 常用属性

- `version` 表明了当前的版本
- `name` 设置了应用程序/软件包的名称
- `description` 是应用程序/软件包的简短描述
- `main` 设置了应用程序的入口点
- `author` 项目作者
- `license` 项目的开源许可证
- `scripts` 定义了一组可以运行的 node 脚本
- `dependencies` 设置了作为依赖安装的 npm 软件包的列表
- `devDependencies` 设置了作为开发依赖安装的 npm 软件包的列表
- `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行
- `browserslist` 用于告知要支持哪些浏览器（及其版本）

### 描述配置

#### name

项目或库的名称，可以通过该名称使用 npm install 进行安装第三方包，在发布到 npm 仓库时，要确保名称的唯一性

#### version

项目的版本，通常在应用程序开发中，由于没有必要对项目进行版本控制，因此经常忽略这一块。
社区开源项目的版本号通常遵循 [semver](https://semver.org/lang/zh-CN/) 语义化规范。

#### description

项目的描述，会展示在 npm 官网，让别人能快速了解该项目。默认是空字符串

### 文件配置

#### files

可以通过 files 指定需要跟随一起发布的内容来控制 npm 包的大小，避免安装时间太长。

发布时默认会包括 package.json、license、README 、main 字段里指定的文件。忽略 node_modules、lockfile 等文件。
一般情况下，files 指定的是项目构建出来的产物和类型文件

#### type

node 现在支持了 ES module 规范，在 package.json 中可以通过 type 字段来声明 npm 包遵循的模块化规范

```json
"type": "module" // module - ES 模块; commonjs - CommonJS 模块 
```

#### main

定义了 npm 包的入口文件，browser 环境和 node 环境均可使用

项目发布时，默认会包括 package.json，license，README 和 main 字段里指定的文件。
如果不设置 main 字段，那么入口文件就是根目录下的 index.js

#### module

定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用

#### browser

定义 npm 包在 browser 环境下的入口文件

当一个项目同时定义了 main、browser 和 module，构建工具 webapck、esbuild 在构建项目的时候，默认会按照 browser -> module -> main 的顺序来查找入口文件

#### exports

exports 字段可以配置不同环境对应的模块入口文件，并且它的优先级最高。

```json
{
  "name": "pkg",
  "exports": {
    "require": "./index.cjs",
    "import": "./index.js"
  }
}
```

```js
import { something } from "pkg"; // from "pkg/index.js"
const { something } = require("pkg"); // require("pkg/index.cjs")
```

exports 除了支持配置包的默认导出，还支持配置包的子路径

```json
{
  "name": "pkg",
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.js"
    },
    "./style": "./dist/css/index.css"
  }
}
```

```js
import from "pkg/style"; // from "pkg/dist/css/index.css"
```

### 脚本配置

#### scripts

指定项目的一些内置脚本命令，这些命令可以通过 npm run 来执行

#### config

config 用于设置 scripts 里的脚本在运行时的参数

```json
"config": {
  "port": "3001"
}
```

在执行脚本时，我们可以通过 npm_package_config_port 这个变量访问

```js
console.log(process.env.npm_package_config_port); // 3001
```

#### bin

bin 属性用来将可执行文件加载到全局环境中，指定了 bin 字段的 npm 包，一旦在全局安装，就会被加载到全局环境中，可以通过别名来执行该文件。

### 发布配置

#### private

如果是私有项目，不希望发布到公共 npm 仓库上，可以将 private 设为 true。

### 系统配置

#### engines

项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求

```json
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
```

要求 node 版本大于等于 14 且小于 16，同时 pnpm 版本号需要大于 7

### 第三方配置

#### types

指定 TypeScript 的类型定义的入口文件

```json
"types": "./index.d.ts"
```

## package-lock.json 文件

> package-lock.json 文件描述了项目中使用的依赖项的确切版本，达到锁版本作用。

官方是这样解释的: package-lock.json 它会在 npm 更改 node_modules 目录树或者 package.json 时自动生成的，它准确的描述了当前项目 npm 包的依赖树，并且在随后的安装中会根据 package-lock.json 来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

文件通常是由 `npm install` 命令生成的，使用 `cnpm install` 并不会生成 package-lock.json 文件

## 参考

1. [about-npm](https://docs.npmjs.com/about-npm)
2. [JSON schema for NPM package.json files](https://json.schemastore.org/package)
3. [package.json 配置](https://juejin.cn/post/7145759868010364959)
4. [深入浅出package.json](https://juejin.cn/post/7099041402771734559)
