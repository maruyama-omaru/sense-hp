/* ===================================================================
   扇子訪問看護ステーション 共通JS
   Inspired by structure of keepon.jp / Designed for 扇子訪問看護
   外部ライブラリ不使用（軽量・実直）
=================================================================== */
(function () {
  "use strict";

  /* ---------- プリローダー（読み込み完了で消す / Inspired by keepon.jp） ---------- */
  var preloader = document.getElementById("preloader");
  if (preloader) {
    var hidePreloader = function () {
      preloader.classList.add("is-hidden");
      setTimeout(function () {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 600);
    };
    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
      // フォールバック（画像が遅い場合でも最大3秒で表示）
      setTimeout(hidePreloader, 3000);
    }
  }

  /* ---------- 上に戻るボタン ---------- */
  var scrollTop = document.createElement("button");
  scrollTop.className = "scroll-top";
  scrollTop.setAttribute("aria-label", "ページの先頭へ戻る");
  scrollTop.innerHTML = "↑";
  document.body.appendChild(scrollTop);
  var onScroll = function () {
    var y =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      (document.scrollingElement && document.scrollingElement.scrollTop) ||
      0;
    if (y > 400) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  scrollTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- ハンバーガーメニュー（SP） ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".gnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // ナビ内リンクをタップしたら閉じる
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- スクロールフェードイン（IntersectionObserver） ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el, i) {
        // data-reveal-delay があればそれを優先（Heroのシネマティック順次フェード）
        var custom = el.getAttribute("data-reveal-delay");
        el.style.transitionDelay = (custom !== null ? custom : (i % 4) * 80) + "ms";
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ---------- FAQ アコーディオン ---------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var expanded = q.getAttribute("aria-expanded") === "true";
      var ans = q.nextElementSibling;
      q.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (ans) {
        ans.style.maxHeight = expanded ? null : ans.scrollHeight + "px";
      }
    });
  });

  /* ---------- お問い合わせフォーム（ダミー送信） ---------- */
  var form = document.querySelector(".js-contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "【ダミー送信】送信機能は後日設定します。\nお急ぎの場合はお電話（052-779-1370）でご連絡ください。"
      );
    });
  }

  /* ---------- 現在年（コピーライト） ---------- */
  var y = document.querySelector(".js-year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
})();
