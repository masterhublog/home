/* --- 1. 炫彩控制台输出 --- */
console.log(
  "%cCopyright © 2026 masterhu.com.cn",
  "background: linear-gradient(90deg, #ff00ff, #8e44ad); color: white; font-size: 20px; font-weight: bold; padding: 8px 20px; border-radius: 5px;"
);

const catStyle = "color: #ff9ff3; font-family: monospace; font-weight: bold; line-height: 1.2;";

console.log("%c      |\\      _,,,---,,_", catStyle);
console.log("%cZZZzz /,`.-'`'    -.  ;-;;,_", catStyle);
console.log("%c     |,4-  ) )-,_. ,\\ (  `'-'", catStyle);
console.log("%c    '---''(_/--'  `-'\\_)", catStyle);

/* --- 2. 状态与存储管理 --- */
const Storage = {
    set: (key, val) => localStorage.setItem(key, val),
    get: (key) => localStorage.getItem(key)
};

// 预定义常量
const THEMES = {
    classes: ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5", "theme-6", "theme-7"],
    names: ["原图清晰", "暗调原图", "清新卡片", "背景模糊", "蔚蓝天空", "纯白简约", "纯黑主题"],
    icons: ["🖼️", "🔅", "✨", "🌫️", "🌤️", "⚪", "⚫"]
};

// 缓存全局 DOM 引用
let UI = {};

/* --- 3. 核心功能函数 --- */

// 判断颜色深浅：用于自动切换蛇的图标颜色
function isDarkColor(color) {
    if (!color) return false;
    let r, g, b;
    if (color.startsWith('#')) {
        let c = color.substring(1);
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        r = parseInt(c.substr(0, 2), 16);
        g = parseInt(c.substr(2, 2), 16);
        b = parseInt(c.substr(4, 2), 16);
    } else {
        const match = color.match(/\d+/g);
        if (!match) return false;
        [r, g, b] = match.map(Number);
    }
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 128;
}

// 应用主题
function applyTheme(index) {
    index = (index + THEMES.classes.length) % THEMES.classes.length;
    const html = document.documentElement;
    
    // 切换 Class
    THEMES.classes.forEach(c => html.classList.remove(c));
    html.classList.add(THEMES.classes[index]);
    Storage.set("themeIndex", index);

    // 同步 UI 状态（Picker 按钮）
    if (UI.themePicker) {
        const btns = UI.themePicker.querySelectorAll('button');
        btns.forEach((btn, i) => btn.classList.toggle('active', i === index));
    }

    // 更新导航栏图标
    if (UI.navToggle) {
        UI.navToggle.textContent = THEMES.icons[index];
        UI.navToggle.setAttribute("data-tooltip", THEMES.names[index]);
    }

    // 蛇图标变色逻辑
    if (UI.snakeImg) {
        const textColor = getComputedStyle(html).getPropertyValue("--main-text-color").trim();
        const suffix = isDarkColor(textColor) ? "Dark" : "Light";
        UI.snakeImg.src = `./static/svg/snake-${suffix}.svg`;
    }

    return index;
}

/* --- 4. 弹窗逻辑 (彻底消除 QuerySelector) --- */
window.pop = function(url) {
    if (!UI.tc) return;
    UI.tcImg.src = url;
    UI.tc.classList.add("active");
    setTimeout(() => UI.tcMain.classList.add("active"), 100);
};

window.closePop = function() {
    if (!UI.tc) return;
    UI.tcMain.classList.remove("active");
    setTimeout(() => {
        UI.tc.classList.remove("active");
        UI.tcImg.src = "";
    }, 300); // 建议设为 300ms 配合 CSS 动画
};

/* --- 5. 主程序入口 --- */
document.addEventListener("DOMContentLoaded", () => {
    // 初始化 DOM 缓存池
    UI = {
        html: document.documentElement,
        tc: document.querySelector(".tc"),
        tcMain: document.querySelector(".tc-main"),
        tcImg: document.querySelector(".tc-img"),
        snakeImg: document.getElementById("snake-img"),
        motto: document.getElementById("motto"),
        navToggle: document.getElementById("theme-toggle-button"),
        themePicker: document.getElementById("theme-picker"),
        burger: document.querySelector('.burger'),
        nav: document.querySelector('.nav-links'),
        loading: document.querySelector("#mh-loading")
    };

    // --- 主题初始化 ---
    let currentThemeIdx = parseInt(Storage.get("themeIndex")) || 0;
    currentThemeIdx = applyTheme(currentThemeIdx);

    // 主题切换点击
    UI.navToggle?.addEventListener("click", (e) => {
        if (e.shiftKey) {
            const isHidden = UI.themePicker.getAttribute("aria-hidden") === "true";
            UI.themePicker.setAttribute("aria-hidden", !isHidden);
        } else {
            currentThemeIdx = applyTheme(currentThemeIdx + 1);
        }
    });

    // 生成主题选择器内容
    if (UI.themePicker) {
        UI.themePicker.innerHTML = THEMES.classes.map((_, i) => `
            <button data-theme-index="${i}" aria-label="选择 ${THEMES.names[i]}" data-tooltip="${THEMES.names[i]}">
                ${THEMES.icons[i]} ${THEMES.names[i]}
            </button>
        `).join('');
        
        UI.themePicker.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn) {
                currentThemeIdx = applyTheme(parseInt(btn.dataset.themeIndex));
                UI.themePicker.setAttribute("aria-hidden", "true");
            }
        });
    }

    // --- 移动端菜单 ---
    if (UI.burger) {
        UI.burger.addEventListener('click', () => {
            UI.nav.classList.toggle('nav-active');
            UI.burger.classList.toggle('toggle');
            document.body.classList.toggle('nav-open');
        });
    }

    // --- 点击背景关闭菜单 ---
    const navBackdrop = document.querySelector('.nav-backdrop');
    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => {
            UI.nav.classList.remove('nav-active');
            UI.burger.classList.remove('toggle');
            document.body.classList.remove('nav-open');
        });
    }

    // --- 打字机效果 (优化版) ---
    if (UI.motto) {
        const msgs = ["不忘初心，方得始终", "Stay hungry Stay foolish"];
        let msgIdx = 0, charIdx = 0, isDeleting = false, pause = 0;

        const typeTick = () => {
            if (pause > 0) { pause--; return; }

            const current = msgs[msgIdx];
            if (!isDeleting) {
                UI.motto.textContent = current.slice(0, ++charIdx);
                if (charIdx === current.length) { isDeleting = true; pause = 20; }
            } else {
                UI.motto.textContent = current.slice(0, --charIdx);
                if (charIdx === 0) { isDeleting = false; msgIdx = (msgIdx + 1) % msgs.length; pause = 10; }
            }
        };
        
        let mottoTimer = setInterval(typeTick, 80);
        document.addEventListener("visibilitychange", () => {
            document.hidden ? clearInterval(mottoTimer) : mottoTimer = setInterval(typeTick, 80);
        });
    }

    // 弹窗背景点击关闭
    UI.tc?.addEventListener("click", (e) => {
        if (e.target === UI.tc) closePop();
    });
});

// 加载遮罩消失
window.addEventListener("load", () => {
    const loading = document.querySelector("#mh-loading");
    if (loading) {
        setTimeout(() => loading.style.opacity = "0", 100);
        setTimeout(() => loading.style.display = "none", 600);
    }
});