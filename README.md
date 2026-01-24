# MasterHu Homepage

![Version](https://img.shields.io/badge/version-1.0.0-blue)![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)![HTML](https://img.shields.io/badge/HTML-5-orange)![CSS](https://img.shields.io/badge/CSS-3-blue)![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

简洁优雅的静态个人主页模板，基于原生 HTML / CSS / JavaScript，零依赖，零构建，开箱即用。

🌐 **在线预览**: [masterhu.com.cn](https://masterhu.com.cn/)

📦 **仓库地址**: [github.com/masterhublog/homepage](https://github.com/masterhublog/homepage)

---

## ✨ 特性

- 🎨 **多主题支持** - 内置多套配色方案，支持主题切换
- 📱 **响应式设计** - 完美适配桌面端、平板、手机，含移动端汉堡菜单
- ⚡ **零构建依赖** - 纯原生技术栈，无需 Node.js、Webpack 等工具
- 🎭 **可替换图标** - 使用 SVG 图标系统，轻松自定义
- ⌨️ **打字机效果** - 流畅的中英文座右铭循环展示，低性能开销
- 🧩 **语义化结构** - 代码清晰易读，便于二次开发
- 🚀 **轻量高效** - 加载速度快，无冗余代码

## 📂 项目结构

```
homepage/
├── index.html              # 页面主体结构
├── static/
│   ├── css/
│   │   ├── style.css      # 通用样式与布局
│   │   ├── theme.css      # 主题配色方案
│   │   └── mobile.css     # 移动端样式与布局
│   ├── js/
│   │   └── script.js      # 交互逻辑与功能
│   └── svg/               # SVG 图标资源
│       ├── homepage.svg
│       ├── about.svg
│       ├── blog.svg
│       └── ...
└── README.md
```



## 🚀 快速开始

### 前置要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 可选：本地 HTTP 服务器（Python、Node.js 等）

### 克隆仓库

```bash
git clone https://github.com/masterhublog/homepage.git
cd homepage
```

### 本地预览

#### 方式一：直接打开（不推荐）

```bash
# 直接双击 index.html 在浏览器中打开
# 注意：可能存在跨域资源加载问题
```

#### 方式二：使用 Python 本地服务器（推荐）

**Python 3.x:**

```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

**Python 2.x:**

```bash
python -m SimpleHTTPServer 8000
# 访问 http://localhost:8000
```

#### 方式三：使用 Node.js 服务器

**安装 serve:**

```bash
npm install -g serve
```

**启动服务:**

```bash
serve -s . -l 8000
# 访问 http://localhost:8000
```

#### 方式四：使用 VS Code Live Server

1. 安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件
2. 右键 `index.html` → **Open with Live Server**
3. 自动在浏览器中打开

#### 方式五：使用 PHP 服务器

```bash
php -S localhost:8000
# 访问 http://localhost:8000
```

### 验证安装

访问主页后，你应该能看到：

- 左侧个人信息和时间线
- 右侧欢迎界面和个人链接
- 主题切换功能
- 响应式布局（调整浏览器窗口大小测试）

## 🛠️ Configuration

This project is designed to be easily configurable without touching the core logic.

### 1. Basic Settings (`static/js/script.js`)

Open `static/js/script.js` and modify the top `Configuration Section`:

```javascript
/* Theme Configuration */
const THEME_CONFIG = {
  // ... customize themes
};

/* Motto Configuration */
const MOTTO_TEXTS = [
  "Your custom motto here!",
  "Another one..."
];

// Typing speed for the hero motto (ms per step)
const HERO_TYPING_INTERVAL = 200;

/* Site Configuration */
const SITE_CONFIG = {
  BIRTH_TIME: "2026/01/01 00:00:00", // Your site's birth time
  // ...
};
```

### 2. Styling (`static/css/theme.css`)

Colors and visual variables are stored in `static/css/theme.css`. You can:
- Modify existing themes
- Add new themes (requires adding to `THEME_CONFIG` in JS as well)
- Change global variables in `:root`

## 🛫 部署指南

本项目为纯静态页面，可部署到任何静态托管平台。

### GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 **Settings** → **Pages**
3. Source 选择 `main` 分支
4. 保存后等待部署完成

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

拖拽项目文件夹到 [Netlify Drop](https://app.netlify.com/drop) 即可。

### 其他平台

支持 Cloudflare Pages、GitLab Pages、Nginx、Apache 等任何静态托管服务。

## 🛠️ 技术栈

### 前端技术

- **HTML5** - 语义化页面结构，支持现代浏览器特性
- **CSS3** - 现代样式与动画效果，包含：
  - Flexbox & Grid 布局
  - CSS 变量与主题系统
  - 毛玻璃效果（backdrop-filter）
  - 响应式媒体查询
- **JavaScript (ES6+)** - 原生 DOM 操作与交互，包含：
  - 模块化代码结构
  - LocalStorage 主题持久化
  - 打字机动画效果
  - 移动端导航菜单与弹窗交互

### 外部资源

- **Google Fonts** - 字体服务
- **Skillicons.dev** - 技能图标生成
- **WebLive2D** - 可选的看板娘组件
- **Busuanzi** - 极简的网站访问量统计（不蒜子）

### 开发工具

- 零构建配置，无需 Webpack、Vite 等构建工具
- 支持任何静态文件服务器
- 兼容所有主流代码编辑器

## 📋 浏览器兼容性


| 浏览器  | 支持版本  |
| ------- | --------- |
| Chrome  | ✅ 最新版 |
| Firefox | ✅ 最新版 |
| Safari  | ✅ 最新版 |
| Edge    | ✅ 最新版 |
| IE      | ❌ 不支持 |

## 🗺️ 开发路线

详见 [Issues](https://github.com/masterhublog/homepage/issues) 和 [Projects](https://github.com/masterhublog/homepage/projects)

## 🤝 Contributing

欢迎通过 Issue 或 Pull Request 参与贡献，具体流程可参考 GitHub 仓库中的说明。

## 💬 反馈与支持

- 🐛 [报告 Bug](https://github.com/masterhublog/homepage/issues/new?labels=bug)
- 💡 [功能建议](https://github.com/masterhublog/homepage/issues/new?labels=enhancement)
- 💬 [讨论区](https://github.com/masterhublog/homepage/discussions)

## 📄 License

This project is licensed under the [CC BY-NC 4.0](LICENSE) License - see the LICENSE file for details.

## 🙏 致谢

感谢所有为本项目做出贡献的开发者！

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=masterhublog/homepage&type=Date)](https://star-history.com/#masterhublog/homepage&Date)

---

**Made with ❤️ by [MasterHu](https://masterhu.com.cn)**
