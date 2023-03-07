# rollup配置打包

[了解rollup配置](https://rollupjs.org/guide/en/)

## resolve

`@rollup/plugin-node-resolve`插件

## json

`@rollup/plugin-json` 插件支持项目引入 `json` 格式文件

按官网说法 `which allows Rollup to import data from a JSON file.`

## commonjs

`@rollup/plugin-commonjs` 插件支持

## terser

`rollup-plugin-terser`插件压缩代码

## clear

`rollup-plugin-clear`插件清除对应文件或目录

## autoExternal

`rollup-plugin-auto-external`插件

## bundleSize

`rollup-plugin-bundle-size`插件分析打包代码包大小

## babel

rollup打包配置babel，安装`@rollup/plugin-babel`

```js
// rollup.config.js
import { babel } from '@rollup/plugin-babel';

...
plugins: [
  babel({
    exclude: 'node_modules/**',
    include: 'src/**',
    babelHelpers: 'runtime',
  }),
];
...

```

babel 配置`presets`, 安装`@babel/preset-env`, 目前babel多数插件已集成在`@babel/preset-env`
了解更多[babel-preset-env](https://www.babeljs.cn/docs/babel-preset-env)

Babel做语法转换、使用polyfill补齐, 安装`@babel/plugin-transform-runtime`, `plugin-transform-runtime`根据插件的配置属性`corejs`需要依赖`@babel/runtime`/`@babel/runtime-corejs2`/`@babel/runtime-corejs3`
了解更多[babel-plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

使用

### 安装依赖

```shell
yarn add @babel/core @babel/preset-env @babel/runtime-corejs3 @babel/plugin-transform-runtime -D
```

### 配置babel

```js
// .babelrc.js
module.exports = {
  presets: [['@babel/preset-env', { loose: true, modules: false }]],
  plugins: [['@babel/transform-runtime', { corejs: 3 }]],
};
```

## bug

构建生成的代码iife代码，无法正确识别类的this

## 完整rollup配置

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size';
import clear from 'rollup-plugin-clear';

// eslint-disable-next-line no-undef
const pkg = require('./package.json');
const outputFileName = 'project';
const name = 'project';
const input = './src/index.js';

const buildConfig = ({ es5, browser = true, minifiedVersion = true, ...config }) => {
  const build = ({ minified }) => ({
    input,
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? 'min.js' : 'js'}`,
    },
    plugins: [
      clear({ targets: ['dist'] }),
      json(),
      resolve({ browser }),
      commonjs(),
      minified && terser(),
      minified && bundleSize(),
      ...(es5
        ? [
            babel({
              exclude: 'node_modules/**',
              include: 'src/**',
              babelHelpers: 'runtime',
            }),
          ]
        : []),
      ...(config.plugins || []),
    ],
  });
  const configs = [build({ minified: false })];
  if (minifiedVersion) {
    configs.push(build({ minified: true }));
  }
  return configs;
};

export default () => {
  const year = new Date().getFullYear();
  const banner = `// ${name} v${pkg.version} Copyright (c) ${year} ${pkg.author}`;
  //   const banner = `/*
  //  *  ${name} v${pkg.version} Copyright (c) ${year} ${pkg.author}. All Rights Reserved.
  //  *
  //  *  Use of this source code is governed by a ISC license
  //  *  that can be found in the LICENSE file in the root of the source
  //  *  tree.
  //  */`;
  return [
    ...buildConfig({
      es5: true,
      output: {
        name,
        file: `dist/${outputFileName}`,
        format: 'umd',
        banner,
      },
    }),
    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
        banner,
      },
    }),
    {
      input,
      output: {
        file: `dist/cjs/${outputFileName}.cjs`,
        format: 'cjs',
        preferConst: true,
        exports: 'default',
        banner,
      },
      plugins: [autoExternal(), resolve(), commonjs()],
    },
  ];
};

```
