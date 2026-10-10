/* ===================================================================
   LINK LIFE 簡易パスワードゲート（非公開プレビュー用）
   ※カジュアルな鍵です。ソースを見れる技術者には中身が見えます。
     本物の防御が必要な場合はサーバー側認証(Netlify等)に切替。
   合言葉はこの PW を書き換えるだけで変更できます。
=================================================================== */
(function () {
  "use strict";
  var PW = "sensu2026ga";       // ← 合言葉（変更可）
  var KEY = "sense_gate_v1";

  var authed = false;
  try { authed = sessionStorage.getItem(KEY) === "1"; }
  catch (e) { authed = true; }  // ストレージ不可の環境ではロックアウトしない

  // 先にスタイルを注入（本文の先読み表示を防ぐ）
  var st = document.createElement("style");
  st.textContent =
    'html[data-gate="wait"] body{visibility:hidden!important}' +
    'html[data-gate="wait"] #sense-gate{visibility:visible!important}' +
    '#sense-gate{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#FBF5F0;padding:1rem;font-family:"Noto Sans JP",sans-serif}' +
    '#sense-gate .g-card{background:#fff;border:1px solid #EADFD5;border-radius:16px;box-shadow:0 10px 30px rgba(120,80,70,.14);max-width:360px;width:100%;padding:2rem 1.6rem;text-align:center;color:#574A42}' +
    '#sense-gate .fan{width:44px;height:22px;margin:0 auto .9rem;border-radius:0 0 44px 44px/0 0 22px 22px;background:conic-gradient(from 200deg at 50% 100%,#E0918B,#E8B647,#A7BE9A,#E0918B)}' +
    '#sense-gate h2{font-size:1.1rem;margin:.1rem 0 .4rem;font-weight:700}' +
    '#sense-gate p{font-size:.82rem;color:#8C7B70;margin:0 0 1.2rem;line-height:1.8}' +
    '#sense-gate input{width:100%;padding:.72rem .8rem;border:1px solid #EADFD5;border-radius:10px;font-size:1rem;margin-bottom:.8rem;text-align:center;color:#574A42;box-sizing:border-box}' +
    '#sense-gate input:focus{outline:2px solid #E6B7B2;border-color:#E0918B}' +
    '#sense-gate button{width:100%;padding:.78rem;border:0;border-radius:999px;background:#E0918B;color:#fff;font-weight:700;font-size:1rem;cursor:pointer}' +
    '#sense-gate button:hover{background:#C77B74}' +
    '#sense-gate .err{color:#C77B74;font-size:.8rem;min-height:1.1em;margin-top:.5rem}';
  (document.head || document.documentElement).appendChild(st);

  if (!authed) document.documentElement.setAttribute("data-gate", "wait");

  function reveal() {
    var g = document.getElementById("sense-gate");
    if (g && g.parentNode) g.parentNode.removeChild(g);
    document.documentElement.removeAttribute("data-gate");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (authed) { reveal(); return; }
    var g = document.createElement("div");
    g.id = "sense-gate";
    g.innerHTML =
      '<div class="g-card">' +
      '<div class="fan" aria-hidden="true"></div>' +
      '<h2>扇子訪問看護ステーション</h2>' +
      '<p>このページは関係者向けの<strong>非公開プレビュー</strong>です。<br>合言葉を入力してください。</p>' +
      '<input id="sense-gate-pw" type="password" autocomplete="off" placeholder="合言葉" aria-label="合言葉" />' +
      '<button id="sense-gate-go" type="button">見る</button>' +
      '<div class="err" id="sense-gate-err" role="alert"></div>' +
      '</div>';
    document.body.appendChild(g);

    var input = document.getElementById("sense-gate-pw");
    var err = document.getElementById("sense-gate-err");
    function submit() {
      if (input.value === PW) {
        try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
        reveal();
      } else {
        err.textContent = "合言葉が違います";
        input.value = "";
        input.focus();
      }
    }
    document.getElementById("sense-gate-go").addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    input.focus();
  });
})();
