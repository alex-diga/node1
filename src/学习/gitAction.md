---
title: GitHub Actions 入门
---

在 GitHub Actions 的仓库中自动化、自定义和执行软件开发工作流程。 您可以发现、创建和共享操作以执行您喜欢的任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。

## 基础概念

1. `workflow` (工作流程): 持续集成一次运行的过程，就是一个 `workflow`
2. `job` (任务): 一个 `workflow` 由一个或多个 `jobs` 构成，含义是一次持续集成的运行，可以完成多个任务
3. `step` (步骤): 每个 `job` 由多个 `step` 构成，一步步完成
4. `action` (动作): 每个 `step` 可以依次执行一个或多个命令 `action`

![关系图谱](https://docs.github.com/assets/cb-25535/mw-1000/images/help/images/overview-actions-simple.webp)

## workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库根目录的 `.github/workflows` 目录

workflow 文件采用[yaml 格式](https://learnxinyminutes.com/docs/yaml/)，查看[工作流程语法](https://docs.github.com/zh/actions/using-workflows/workflow-syntax-for-github-actions)

## 创建一个 workflow 流程

在 `.github/workflows` 目录下创建一个 `ci.yml` 文件，这是一个把 vue3 + ts 项目打包部署至 github pages 的构建流程
当工程有提交代码至 `main` 分支时，这个 `workflow` 会执行，并通过 `JamesIves/github-pages-deploy-action@v4` 部署到 github pages

```yml
name: GitHub Actions Deploy
on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3 # 第一步，下载代码仓库

      - name: Install pnpm
        uses: pnpm/action-setup@v2.2.4
        with:
          version: 7

      - name: Set node version to 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      - name: Install and Build
        run: |
          pnpm install
          pnpm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist # The folder the action should deploy.
          clean: true

```

## 部署至 github pages

在 github 项目中，找到 `Settings` 模块，点击 `Pages` 选择，进行 GitHub Pages 相关设置，默认使用 `gh-pages` 分支作为 GitHub Pages 站点构建分支

## 参考

1. [GitHub Actions 文档](https://docs.github.com/zh/actions)
2. [GitHub Pages 文档](https://docs.github.com/zh/pages/quickstart)
3. [GitHub Actions 入门教程 - 阮一峰](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
4. [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)
5. [学会用 Github Action 入门](https://juejin.cn/post/7113562222852309023)
6. [快速编写一个自己的 Github Action](https://juejin.cn/post/7191357386139893817)
