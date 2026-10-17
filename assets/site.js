(function () {
  "use strict";
  var EMAIL = "amos@warshawskis.com";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Polaroid of the day ---------- */
  var pol = document.getElementById("polaroid");
  var img = document.getElementById("pol-img");
  var cap = document.getElementById("pol-cap");
  var flash = pol.querySelector(".flash");
  var photos = [];

  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function todayKey() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function todayLabel() { return new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" }).toLowerCase(); }
  function preload(list) { list.forEach(function (src) { var i = new Image(); i.src = src; }); }

  function flipTo(finalIndex) {
    if (!photos.length) return;
    var final = photos[finalIndex];
    if (reduce || photos.length < 3) { img.src = final; land(); return; }
    pol.classList.remove("landed"); pol.classList.add("flipping");
    cap.textContent = "…";
    // 14 frames that slow down like a flipbook running out of pages
    var frames = 14, n = 0, last = -1;
    (function next() {
      var k;
      do { k = Math.floor(Math.random() * photos.length); } while ((k === last || k === finalIndex) && photos.length > 2);
      last = k;
      img.src = photos[k];
      flash.animate && flash.animate([{ opacity: .35 }, { opacity: 0 }], { duration: 90 });
      n++;
      if (n < frames) { setTimeout(next, 55 + Math.pow(n / frames, 2.4) * 260); }
      else { setTimeout(function () { img.src = final; land(); }, 340); }
    })();
  }
  function land() {
    pol.classList.remove("flipping");
    void pol.offsetWidth; pol.classList.add("landed");
    cap.textContent = todayLabel() + " · photo of the day";
  }

  fetch("photos/manifest.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (m) {
      photos = (m.photos || []).map(function (f) { return "photos/" + f; });
      if (!photos.length) throw new Error("empty");
      preload(photos);
      var pick = hash(todayKey()) % photos.length;
      setTimeout(function () { flipTo(pick); }, 650);
      document.getElementById("flip-again").addEventListener("click", function () {
        flipTo(Math.floor(Math.random() * photos.length));
      });
    })
    .catch(function () { cap.textContent = todayLabel(); document.getElementById("flip-again").hidden = true; });

  /* ---------- Work + Lab lists ---------- */
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  var work = document.getElementById("work-list");
  (window.WORK || []).forEach(function (p) {
    var li = el("li", "row");
    var a = el("div"); a.appendChild(el("h3", null, p.title)); a.appendChild(el("div", "meta", p.meta));
    var b = el("div"); b.appendChild(el("p", "hook", p.hook));
    var tags = el("div", "tags"); p.tags.forEach(function (t) { tags.appendChild(el("span", "tag", t)); }); b.appendChild(tags);
    var c = el("div", "ctas");
    if (p.live) { var l = el("a", "btn solid", "Visit live site ↗"); l.href = p.live; l.target = "_blank"; l.rel = "noopener"; c.appendChild(l); }
    if (p.caseStudy) { var r = el("button", "btn", "Request case study"); r.type = "button"; r.addEventListener("click", function () { openReq(p.title); }); c.appendChild(r); }
    li.appendChild(a); li.appendChild(b); li.appendChild(c); work.appendChild(li);
  });

  var lab = document.getElementById("lab-list");
  (window.LAB || []).forEach(function (x) {
    var li = el("li", "tile");
    li.appendChild(el("span", "status", x.status));
    li.appendChild(el("h3", null, x.title));
    var todo = /^TODO/.test(x.hook);
    li.appendChild(el("p", todo ? "todo-hook" : null, todo ? "Hook coming soon." : x.hook));
    var tags = el("div", "tags"); x.tools.forEach(function (t) { tags.appendChild(el("span", "tag", t)); }); li.appendChild(tags);
    lab.appendChild(li);
  });

  /* ---------- Request dialog ---------- */
  var dlg = document.getElementById("req"), form = document.getElementById("req-form"), msg = document.getElementById("req-msg");
  var current = "";
  function openReq(title) {
    current = title; document.getElementById("req-proj").textContent = title + " · I'll email you a link, usually within a day.";
    msg.textContent = ""; document.getElementById("req-send").disabled = false;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }
  document.getElementById("req-cancel").addEventListener("click", function () { dlg.close(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    data._subject = "Case study request: " + current;
    data.project = current;
    document.getElementById("req-send").disabled = true;
    msg.textContent = "Sending…";
    fetch("https://formsubmit.co/ajax/" + EMAIL, {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data)
    }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { msg.textContent = "Sent. I'll be in touch soon."; form.reset(); setTimeout(function () { dlg.close(); }, 1600); })
      .catch(function () { msg.textContent = "That didn't go through. Email " + EMAIL + " and mention " + current + "."; document.getElementById("req-send").disabled = false; });
  });

  /* ---------- Footer ---------- */
  document.getElementById("yr").textContent = new Date().getFullYear();
  document.getElementById("copy-mail").addEventListener("click", function (e) {
    var btn = e.currentTarget;
    try {
      navigator.clipboard.writeText(EMAIL).then(function () { btn.textContent = "Copied"; }, sel);
    } catch (err) { sel(); }
    function sel() { var r = document.createRange(); r.selectNodeContents(document.getElementById("mail-text")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Selected"; }
  });
})();
