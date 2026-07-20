# CatOS Website

CatOS 的官方网站与文档源码。项目使用 Docusaurus、React 和 TypeScript，默认提供简体中文与英文站点。

## 本地开发

```bash
pnpm install
pnpm start
```

默认开发地址为 `http://localhost:3000/`。

## 验证

```bash
pnpm typecheck
pnpm build
```

生产构建输出到 `build/`，并同时生成：

- 简体中文站点：`build/`
- 英文站点：`build/en/`

## 内容位置

```text
docs/        中文文档
blog/        中文动态
i18n/en/     英文翻译和英文内容
src/pages/   页面源码
src/css/     全局主题
static/      Logo、截图和其他静态资源
```

旧网站的静态构建产物只用于视觉和资源参考，不是本项目的源码依赖。
