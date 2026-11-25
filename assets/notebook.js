// Portfolio-style ink cursor: six coloured blobs chase the pointer. Desktop pointers only, off for reduced motion.
(function () {
  if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var B = [[18, "var(--tomato)", 1], [14, "var(--marigold)", .85], [11, "var(--rose)", .7], [9, "var(--lake)", .55], [7, "var(--sage)", .45], [5, "var(--grape)", .35]];
  var box = document.createElement("div"); box.className = "blob-cursor"; box.setAttribute("aria-hidden", "true"); box.style.opacity = 0;
  var dots = B.map(function (b) { var i = document.createElement("i"); i.style.cssText = "width:" + b[0] + "px;height:" + b[0] + "px;background:" + b[1] + ";opacity:" + b[2] + ";margin:" + (-b[0] / 2) + "px 0 0 " + (-b[0] / 2) + "px"; box.appendChild(i); return i; });
  document.body.appendChild(box);
  var t = { x: innerWidth / 2, y: innerHeight / 2 }, p = B.map(function () { return { x: t.x, y: t.y }; }), last = performance.now();
  addEventListener("mousemove", function (e) { t.x = e.clientX; t.y = e.clientY; box.style.opacity = 1; }, { passive: true });
  document.addEventListener("mouseleave", function () { box.style.opacity = 0; });
  (function tick(now) {
    var dt = Math.min(60, Math.max(0, now - last)); last = now;
    p.forEach(function (q, i) { var l = i ? p[i - 1] : t, k = 1 - Math.exp(-(0.022 - 0.0025 * i) * dt); q.x += (l.x - q.x) * k; q.y += (l.y - q.y) * k;
      dots[i].style.transform = "translate(" + q.x + "px," + q.y + "px)"; });
    requestAnimationFrame(tick);
  })(last);
})();
