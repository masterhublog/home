console.log(
  "%cCopyright © 2026 masterhu.com.cn",
  "background: linear-gradient(90deg, #ff00ff, #8e44ad); color: white; font-size: 20px; font-weight: bold; padding: 8px 20px; border-radius: 5px;"
);

const catStyle = "color: #ff9ff3; font-family: monospace; font-weight: bold; line-height: 1.2;";

console.log("%c      |\\      _,,,---,,_", catStyle);
console.log("%cZZZzz /,`.-'`'    -.  ;-;;,_", catStyle);
console.log("%c     |,4-  ) )-,_. ,\\ (  `'-'", catStyle);
console.log("%c    '---''(_/--'  `-'\\_)", catStyle);

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  var html = document.documentElement;
  var tanChiShe = document.getElementById("tanChiShe");

  var themeClasses = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5", "theme-6", "theme-7"];
  var themeNames = ["原图清晰", "暗调原图", "清新卡片", "背景模糊", "蔚蓝天空", "纯白简约", "纯黑主题"];
  var themeIcons = ["🖼️", "🔅", "✨", "🌫️", "🌤️", "⚪", "⚫"];
  var themeIndex = parseInt(getCookie("themeIndex"), 10);
  if (isNaN(themeIndex) || themeIndex < 0 || themeIndex >= themeClasses.length) themeIndex = 0;

  function applyThemeByIndex(index) {
    index = ((index % themeClasses.length) + themeClasses.length) % themeClasses.length;
    // remove other theme classes and any simple light/dark classes
    themeClasses.forEach(function (c) {
      html.classList.remove(c);
    });
    html.classList.remove("light-theme", "dark-theme");
    html.classList.add(themeClasses[index]);
    setCookie("themeIndex", index, 365);
    themeIndex = index;

    // update picker button active state
    try {
      var pickerButtons = document.querySelectorAll('.theme-picker button');
      pickerButtons.forEach(function (btn) {
        var btnIndex = parseInt(btn.getAttribute('data-theme-index'), 10);
        if (btnIndex === index) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    } catch (e) {}

    // update toggle button icon and tooltip (title)
    try {
      var navBtn = document.getElementById("theme-toggle-button");
      var nameForTitle = themeNames[index] || ("主题" + (index + 1));
      if (navBtn) {
        navBtn.textContent = themeIcons[index];
        navBtn.setAttribute("data-tooltip", nameForTitle);
        navBtn.setAttribute("aria-label", nameForTitle);
      }
    } catch (e) {}

    // update snake image depending on whether theme text color is dark or light
    try {
      var mt = getComputedStyle(html).getPropertyValue("--main_text_color").trim();
      var color = mt || "#000000";
      var isDark = false;
      if (color.indexOf("#") === 0) {
        var c = color.replace("#", "");
        if (c.length === 3) c = c.split("").map(function (ch) {
          return ch + ch;
        }).join("");
        var r = parseInt(c.substr(0, 2), 16),
          g = parseInt(c.substr(2, 2), 16),
          b = parseInt(c.substr(4, 2), 16);
        var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        isDark = lum < 128;
      } else if (color.indexOf("rgb") === 0) {
        var nums = color.match(/\d+/g).map(Number);
        var r = nums[0],
          g = nums[1],
          b = nums[2];
        var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        isDark = lum < 128;
      }
      if (tanChiShe) tanChiShe.src = "./static/svg/snake-" + (isDark ? "Dark" : "Light") + ".svg";
    } catch (e) {}
  }

  // initialize
  applyThemeByIndex(themeIndex);

  // navbar toggle button cycles through themes on click; shift+click opens picker
  var navToggle = document.getElementById("theme-toggle-button");
  var themePicker = document.getElementById("theme-picker");
  function closePicker() {
    if (themePicker) themePicker.setAttribute("aria-hidden", "true");
  }
  function openPicker() {
    if (themePicker) themePicker.setAttribute("aria-hidden", "false");
  }
  if (navToggle) {
    navToggle.addEventListener("click", function (ev) {
      if (ev.shiftKey) {
        // open picker
        if (themePicker && themePicker.getAttribute("aria-hidden") === "false") closePicker();
        else openPicker();
        return;
      }
      applyThemeByIndex(themeIndex + 1);
    });
  }

  // theme picker buttons
  if (themePicker) {
    themePicker.innerHTML = "";
    themeClasses.forEach(function (c, idx) {
      var b = document.createElement('button');
      b.setAttribute('data-theme-index', idx);
      var label = themeNames[idx] || ('主题' + (idx + 1));
      b.setAttribute('aria-label', '选择 ' + label);
      b.setAttribute('data-tooltip', label);
      b.innerHTML = themeIcons[idx] + ' ' + label;
      if (idx === themeIndex) {
        b.classList.add('active');
      }
      b.addEventListener('click', function (e) {
        applyThemeByIndex(idx);
        closePicker();
      });
      themePicker.appendChild(b);
    });
    // close when clicking outside
    document.addEventListener('click', function (e) {
      if (!themePicker.contains(e.target) && !navToggle.contains(e.target)) {
        closePicker();
      }
    });
  }

  // Mobile Navigation Toggle
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  const backdrop = document.querySelector('.nav-backdrop');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      // Toggle Nav
      nav.classList.toggle('nav-active');
      document.body.classList.toggle('nav-open');

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });

      // Burger Animation
      burger.classList.toggle('toggle');
    });
    // Close when clicking backdrop
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        document.body.classList.remove('nav-open');
        burger.classList.remove('toggle');
        navLinks.forEach((link) => (link.style.animation = ''));
      });
    }
    // Close when pressing ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        nav.classList.remove('nav-active');
        document.body.classList.remove('nav-open');
        burger.classList.remove('toggle');
        navLinks.forEach((link) => (link.style.animation = ''));
      }
    });
    // Close after clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        document.body.classList.remove('nav-open');
        burger.classList.remove('toggle');
        navLinks.forEach((l) => (l.style.animation = ''));
      });
    });
  }
  // Motto: （loop print）
  var mottoEl = document.getElementById("motto");
  if (mottoEl) {
    var messages = ["不忘初心，方得始终", "Stay hungry Stay foolish"];
    var msgIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var pauseTicks = 0;
    var intervalId = null;
    var TYPE_DELAY = 60;   // ms per character type
    var DELETE_DELAY = 40; // ms per character delete
    var PAUSE_AFTER_COMPLETE = 20; // ticks to pause after completing type/delete

    mottoEl.textContent = "";

    function tick() {
      if (pauseTicks > 0) {
        pauseTicks--;
        return;
      }
      var current = messages[msgIndex];
      if (!deleting) {
        if (charIndex < current.length) {
          mottoEl.textContent = current.slice(0, charIndex + 1);
          charIndex++;
        } else {
          deleting = true;
          pauseTicks = PAUSE_AFTER_COMPLETE;
        }
      } else {
        if (charIndex > 0) {
          mottoEl.textContent = current.slice(0, charIndex - 1);
          charIndex--;
        } else {
          deleting = false;
          msgIndex = (msgIndex + 1) % messages.length;
          pauseTicks = PAUSE_AFTER_COMPLETE;
        }
      }
    }

    function startLoop() {
      stopLoop();
      intervalId = setInterval(tick, deleting ? DELETE_DELAY : TYPE_DELAY);
    }
    function stopLoop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    startLoop();
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });
  }
});

function pop(url) {
  var tc = document.querySelector(".tc");
  var tcMain = document.querySelector(".tc-main");
  var tcImg = document.querySelector(".tc-img");
  tcImg.src = url;
  tc.classList.add("active");
  setTimeout(function() {
    tcMain.classList.add("active");
  }, 100);
}

function closePop() {
  var tc = document.querySelector(".tc");
  var tcMain = document.querySelector(".tc-main");
  tcMain.classList.remove("active");
  setTimeout(function() {
    tc.classList.remove("active");
    document.querySelector(".tc-img").src = "";
  }, 300);
}

// Close popup when clicking on the background
document.addEventListener("DOMContentLoaded", function() {
  var tc = document.querySelector(".tc");
  if (tc) {
    tc.addEventListener("click", function(e) {
      if (e.target === tc) {
        closePop();
      }
    });
  }
});

var pageLoading = document.querySelector("#mh-loading");
window.addEventListener("load", function () {
  setTimeout(function () {
    pageLoading.style.opacity = "0";
  }, 100);
});
