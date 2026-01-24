# MasterHu Homepage | 个人主页模板

![Version](https://img.shields.io/badge/version-1.0.0-blue)

![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

简洁优雅的静态个人主页模板，基于原生 HTML / CSS / JavaScript 构建。零依赖、零构建工具，开箱即用，专为开发者和设计师打造。

---

## ✨ 特性

- 🎨 **多主题支持** - 内置 7 套精美配色方案，支持一键切换与 LocalStorage 持久化
- 📱 **全端响应式** - 完美适配桌面端 (4K ready)、平板、手机，包含移动端专属交互
- ⚡ **极致轻量** - 纯原生技术栈，无 Node.js/Webpack 依赖，核心代码体积极小
- 🎭 **沉浸式体验** - 毛玻璃拟态 (Glassmorphism) 设计，配合流畅的过渡动画
- ⌨️ **动态交互** - 首页打字机效果、图片画廊弹窗、3D 加载动画
- 📊 **数据统计** - 集成 Busuanzi 访问量统计，并包含本地隐私友好的"今日访客"计数
- 🧩 **高度可配** - 语义化代码结构，通过简单配置即可修改内容

## 🌐 在线预览

访问示例站点: **[masterhu.com.cn](https://masterhu.com.cn/)**

## 📂 项目结构

```
homepage/
├── index.html              # 页面入口 (HTML5 语义化结构)
├── static/
│   ├── css/
│   │   ├── style.css       # 核心样式 (PC端布局、动画、组件)
│   │   ├── mobile.css      # 移动端适配样式
│   │   └── theme.css       # 主题变量 (CSS Variables)
│   ├── js/
│   │   └── script.js       # 核心逻辑 (无依赖，ES6+)
│   ├── img/                # 图片资源 (头像、背景、二维码)
│   └── svg/                # SVG 图标 Sprite 系统
└── README.md               # 项目文档
```

## 🚀 快速开始

### 方式一：直接克隆 (推荐)

```bash
git clone https://github.com/masterhublog/homepage.git
cd homepage
```

### 方式二：下载 ZIP

点击右上角 "Code" -> "Download ZIP" 下载并解压。

### 本地预览

由于浏览器安全策略 (CORS)，直接双击打开 `index.html` 可能会导致部分图标或字体无法加载。建议使用本地服务器：

**Python 3:**

```bash
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

**VS Code:**
安装 "Live Server" 插件，右键 `index.html` 选择 "Open with Live Server"。

## ✅ 发布前检查清单

在部署之前，请确保你已经完成了以下修改：

- [ ]  **Meta 信息**: 修改 `index.html` 中的 `<title>`, `description`, `keywords` 等 Meta 标签。
- [ ]  **个人信息**: 修改 `index.html` 中的头像、名字、社交链接。
- [ ]  **站点配置**: 在 `static/js/script.js` 中修改 `SITE_CONFIG` (建站时间) 和 `MOTTO_TEXTS` (座右铭)。
- [ ]  **图片资源**: 替换 `static/img/` 下的 `avatar.gif` (头像) 和 `background.webp` (背景图)。
- [ ]  **技能图标**: 修改 `index.html` 中 `skillicons.dev` 的 URL 参数，定制你的技能栈。
- [ ]  **统计代码**: 如果不需要 Busuanzi 统计，可以在 `script.js` 中注释掉 `initAnalytics` 相关代码。

## 🛠️ 配置指南

本项目设计为"配置即代码"，大部分修改只需编辑 `static/js/script.js` 和 `index.html`。

### 1. 基础信息配置

打开 `index.html`，修改 Meta 标签和页面内容：

```html
<!-- 修改你的名字和描述 -->
<title>Your Name | 个人主页</title>
<meta name="author" content="Your Name">

<!-- 修改头像和背景 -->
<div class="mh-avatar" ...></div>
```

### 2. 站点逻辑配置 (`script.js`)

在 `static/js/script.js` 顶部找到配置区域：

```javascript
/* Site Configuration | 站点基础配置 */
const SITE_CONFIG = {
  BIRTH_TIME: "2026/01/01 00:00:00", // 修改为你的建站时间
  // ...
};

/* Motto Configuration | 座右铭配置 */
const MOTTO_TEXTS = [
  "Hello World!",
  "编写代码，改变世界"
];
```

### 3. 更换图片与图标

- **头像**: 替换 `static/img/avatar.gif`
- **背景**: 替换 `static/img/background.webp` (建议 1920x1080, WebP 格式)
- **图标**: 项目使用 SVG Sprite (`static/svg/icons.svg`)。如需新增图标，请使用 `<symbol>` 格式添加到该文件中。

### 4. 技能图标配置

找到 `index.html` 中的 `mh-skills` 区域，修改 `<img>` 标签的 `src` 属性：

```html
<!-- 修改 i= 参数后的技能列表，逗号分隔 -->
<img src="https://skillicons.dev/icons?i=html,css,js,react..." />
```

完整图标列表请参考: [Skill Icons](https://skillicons.dev)

## 🛫 部署

本项目是纯静态的，可以免费部署到任何静态托管平台：

- **GitHub Pages**: Settings -> Pages -> Source 选择 main 分支
- **Vercel / Netlify**: 导入仓库即可，无需构建命令
- **Cloudflare Pages**: 直接连接仓库部署

## 🛠️ 技术栈详情

- **HTML5**: 语义化标签 (main, aside, nav, article)
- **CSS3**: CSS Variables, Flexbox, Grid, Backdrop Filter, Keyframes
- **JavaScript**: ES6+, MutationObserver, IntersectionObserver, LocalStorage
- **Icons**: SVG Sprite System

## 📋 浏览器兼容性


| Chrome | Firefox | Safari |  Edge  | IE |
| :----: | :-----: | :----: | :----: | :-: |
| ✅ 80+ | ✅ 75+ | ✅ 13+ | ✅ 80+ | ❌ |

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request！

- 🐛 [报告 Bug](https://github.com/masterhublog/homepage/issues)
- 💡 [提出建议](https://github.com/masterhublog/homepage/issues)

## 📄 开源协议

本项目采用 [CC BY-NC 4.0](LICENSE) 协议。
您可以自由地分享、修改本项目，但**禁止用于商业用途**。如需商用，请联系作者获得授权。

## 🌟 支持项目

如果这个项目对您有帮助，请在 GitHub 上点个 **Star** ⭐️ 支持一下！

[![GitHub stars](https://img.shields.io/github/stars/masterhublog/homepage?style=social)](https://github.com/masterhublog/homepage)

---

**Made with ❤️ by [MasterHu](https://masterhu.com.cn)**
