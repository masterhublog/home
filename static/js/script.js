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
    icons: ["🖼️", "🔅", "✨", "🌫️", "🌤️", "⚪", "🔮"]
};

// 缓存全局 DOM 引用
let UI = {};

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

    // 更新导航栏图标
    if (UI.navThemeBtn) {
        UI.navThemeBtn.textContent = THEMES.icons[index] + "主题";
        //UI.navThemeBtn.textContent = THEMES.icons[index] + " " + THEMES.names[index];
        UI.navThemeBtn.setAttribute("data-tooltip", THEMES.names[index]);
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
    }, 200);
};

document.addEventListener("DOMContentLoaded", () => {
    UI = {
        html: document.documentElement,
        tc: document.querySelector(".tc"),
        tcMain: document.querySelector(".tc-main"),
        tcImg: document.querySelector(".tc-img"),
        snakeImg: document.getElementById("snake-img"),
        heroMotto: document.getElementById("hero-motto"),
        
        navBurger: document.querySelector('.mh-nav__burger'),
        navLinks: document.querySelector('.mh-nav__links'),
        navThemeBtn: document.querySelector(".mh-nav__theme-toggle"),
        loading: document.querySelector("#mh-loading")
    };

    let currentThemeIdx = parseInt(Storage.get("themeIndex")) || 0;
    currentThemeIdx = applyTheme(currentThemeIdx);

    UI.navThemeBtn?.addEventListener("click", (e) => {
        currentThemeIdx = applyTheme(currentThemeIdx + 1);
    });

    // --- 移动端菜单 ---
    UI.navBurger?.addEventListener('click', () => {
        UI.navLinks.classList.toggle('nav-active');
        UI.navBurger.classList.toggle('toggle');
        document.body.classList.toggle('nav-open');
    });

    if (UI.navBurger) {
        document.addEventListener('click', (e) => {
            const isMenuOpen = UI.navLinks.classList.contains('nav-active');

            // 如果点击的【既不是菜单】且【也不是汉堡按钮】，就关闭
            //if (isMenuOpen && !UI.navBurger.contains(e.target) && !UI.navLinks.contains(e.target))
            if (isMenuOpen &&  !e.target.closest('.mh-nav__burger') || e.target.closest('.mh-nav__links')) {
                UI.navLinks.classList.remove('nav-active');
                UI.navBurger.classList.remove('toggle');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // --- 打字机效果 ---
    if (UI.heroMotto) {
        const msgs = ["不忘初心，方得始终!", "Stay hungry Stay foolish!"];
        let msgIdx = 0, charIdx = 0, isDeleting = false, pause = 0;
        const typeTick = () => {
            if (pause > 0) { pause--; return; }

            const current = msgs[msgIdx];
            if (!isDeleting) {
                UI.heroMotto.textContent = current.slice(0, ++charIdx);
                if (charIdx === current.length) { isDeleting = true; pause = 20; }
            } else {
                UI.heroMotto.textContent = current.slice(0, --charIdx);
                if (charIdx === 0) { isDeleting = false; msgIdx = (msgIdx + 1) % msgs.length; pause = 10; }
            }
        };
        
        let heroMottoTimer = setInterval(typeTick, 80);
        document.addEventListener("visibilitychange", () => {
            document.hidden ? clearInterval(heroMottoTimer) : heroMottoTimer = setInterval(typeTick, 80);
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