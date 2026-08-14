# 集成开发指南（中英双语）

基于 [VitePress](https://vitepress.dev/) 的文档站，支持简体中文 / English，可发布到 GitHub Pages。

## 本地预览

```bash
npm install
npm run dev
```

- 中文：http://localhost:5173/
- 英文：http://localhost:5173/en/

## 构建

```bash
npm run build
```

## 中英文档对应关系

左侧菜单对齐 Urovo「集成开发指南」结构，在 `docs/.vitepress/config.ts` 的 `zhSidebar` / `enSidebar` 中维护。

| 中文 | English |
|------|---------|
| `docs/index.md` | `docs/en/index.md` |
| `docs/guide/*` | `docs/en/guide/*` |
| `docs/*.md`（各能力专题） | `docs/en/*.md` |

右上角语言切换器由 VitePress `locales` 提供。新增菜单项时：中英文各写一份 Markdown，并在两侧边栏各加一条链接。

## 发布到 GitHub Pages

1. 将本目录推送到 GitHub 仓库
2. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
3. 若站点 URL 为 `https://<user>.github.io/<repo>/`，在 `config.ts` 中设置：

```ts
base: '/<repo>/'
```

4. 推送到 `main` 后，Actions 会自动构建并发布
