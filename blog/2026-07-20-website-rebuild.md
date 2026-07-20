---
slug: website-rebuild
title: CatOS 网站开始重写
authors: []
tags: [website, development]
---

旧版 CatOS 网站只保留了静态构建产物。我们没有把压缩后的 JavaScript 当作源码继续维护，而是建立了新的 Docusaurus + TypeScript 项目。

<!-- truncate -->

新网站保留 CatOS 原有的蓝青色视觉、桌面截图和文档结构，同时重新实现：

- 响应式首页；
- 中英文内容框架；
- 下载、安装、快照和仓库文档；
- 可维护的主题变量和页面组件；
- 类型检查、结构测试和生产构建流程。

旧构建产物现在只作为只读视觉与资源参考。后续内容将根据当前 CatOS 的实际交付状态更新。
