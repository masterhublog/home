console.log(
  "%cCopyright © 2024 masterhu.com.cn",
  "background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;"
);
console.log("%c   /\\_/\\", "color: #8B4513; font-size: 20px;");
console.log("%c  ( o.o )", "color: #8B4513; font-size: 20px;");
console.log(" %c  > ^ <", "color: #8B4513; font-size: 20px;");
console.log("  %c /  ~ \\", "color: #8B4513; font-size: 20px;");
console.log("  %c/______\\", "color: #8B4513; font-size: 20px;");

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

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

  // theme classes defined in CSS: theme-1 .. theme-5
  var themeClasses = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5"];
  // human-readable theme names matching the CSS --name variables
  var themeNames = ["暗夜模糊", "照片卡片", "蓝色渐变", "简约白", "图像暗色"];
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

    // update visible theme name from CSS variable --name
    try {
      var themeNameEl = document.getElementById("theme-name");
      if (themeNameEl) {
        var computed = getComputedStyle(html).getPropertyValue("--name") || "";
        themeNameEl.textContent = computed.trim().replace(/^"|"$/g, "") || (themeNames[index] || ("主题" + (index + 1)));
      }
    } catch (e) {}

    // update toggle button icon and tooltip (title)
    try {
      var themeIcon = document.getElementById("theme-icon");
      var navBtn = document.getElementById("theme-toggle-button");
      var nameForTitle = themeNames[index] || (document.getElementById("theme-name") || {}).textContent || ("主题" + (index + 1));
      if (themeIcon) themeIcon.src = "./static/svg/theme" + (index + 1) + ".svg";
      if (navBtn) {
        navBtn.title = nameForTitle;
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

  // build picker buttons
  if (themePicker) {
    themePicker.innerHTML = "";
    themeClasses.forEach(function (c, idx) {
      var b = document.createElement('button');
      b.setAttribute('data-theme-index', idx);
      var label = themeNames[idx] || ('主题' + (idx + 1));
      b.setAttribute('aria-label', '选择 ' + label);
      b.title = label;
      var img = document.createElement('img');
      img.src = './static/svg/theme' + (idx + 1) + '.svg';
      img.alt = label;
      b.appendChild(img);
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

  var fpsElement = document.createElement("div");
  fpsElement.id = "fps";
  fpsElement.style.zIndex = "10000";
  fpsElement.style.position = "fixed";
  fpsElement.style.left = "0";
  document.body.insertBefore(fpsElement, document.body.firstChild);

  var showFPS = (function () {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    var fps = 0,
      last = Date.now(),
      offset,
      step,
      appendFps;

    step = function () {
      offset = Date.now() - last;
      fps += 1;

      if (offset >= 1000) {
        last += offset;
        appendFps(fps);
        fps = 0;
      }

      requestAnimationFrame(step);
    };

    appendFps = function (fpsValue) {
      fpsElement.textContent = "FPS: " + fpsValue;
    };

    step();
  })();

  //pop('./static/img/tz.jpg')
});

var pageLoading = document.querySelector("#mh-loading");
window.addEventListener("load", function () {
  setTimeout(function () {
    pageLoading.style.opacity = "0";
  }, 100);
});
