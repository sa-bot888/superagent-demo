// 云杉银行 · 财富频道（虚构演示页面，没有任何真实交易）

// ---------- 数据 ----------
const shortcuts = [
  { name: "转账", color: "#2f80ed", icon: '<path d="M4 8h14l-4-4M20 16H6l4 4"/>' },
  { name: "账户", color: "#c8152d", icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>' },
  { name: "理财", color: "#e8563a", icon: '<path d="M4 18 9 12l4 3 7-8"/><path d="M15 7h5v5"/>' },
  { name: "基金", color: "#f2994a", icon: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9.5h4.5a1.8 1.8 0 0 1 0 3.5H10a1.8 1.8 0 0 0 0 3.5H15"/>' },
  { name: "信用卡", color: "#9b51e0", icon: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 14h4"/>' },
  { name: "贷款", color: "#d63a4e", icon: '<path d="M5 20V10l7-5 7 5v10"/><path d="M10 20v-5h4v5"/>' },
  { name: "外汇", color: "#56ccf2", icon: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>' },
  { name: "缴费", color: "#eb5757", icon: '<path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21z"/><path d="M10 8h4M10 12h4"/>' },
  { name: "积分", color: "#c9a45c", icon: '<path d="m12 4 2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9 5.5-.8z"/>' },
  { name: "全部", color: "#828282", icon: '<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>' },
];

const notices = [
  "周年庆理财节进行中，精选产品限量发售",
  "新客专享：稳享 90 天预期年化 3.20%",
  "系统将于周日凌晨 2:00–4:00 进行升级维护",
];

const slides = [
  { title: "周年庆 · 理财节", text: "精选稳健产品，限量发售", cta: "立即查看", bg: "linear-gradient(120deg,#c8152d,#d63a4e)" },
  { title: "新客专享 3.20%", text: "首次购买稳享 90 天，1000 元起", cta: "去领取", bg: "linear-gradient(120deg,#e8563a,#ff9a6b)" },
  { title: "外汇兑换 0 手续费", text: "韩元、人民币、美元实时汇率", cta: "去兑换", bg: "linear-gradient(120deg,#2f80ed,#56ccf2)" },
];

const flashProducts = [
  { name: "稳享 90 天", tag: "新客专享", rate: 3.2, days: 90, min: 1000, total: 500, sold: 312 },
  { name: "安盈 180 天", tag: "热销", rate: 3.6, days: 180, min: 5000, total: 300, sold: 251 },
  { name: "长青 365 天", tag: "限量", rate: 4.1, days: 365, min: 10000, total: 100, sold: 97 },
];

const funds = [
  { name: "云杉日日盈", rate: 2.15, label: "七日年化", tags: ["随存随取", "R1 低风险"], kind: "low" },
  { name: "云杉稳健债券 A", rate: 3.86, label: "近一年涨幅", tags: ["债券型", "R2 中低风险"], kind: "low" },
  { name: "云杉均衡配置", rate: 6.42, label: "近一年涨幅", tags: ["混合型", "R3 中风险"], kind: "mid" },
  { name: "云杉科技成长", rate: 12.3, label: "近一年涨幅", tags: ["股票型", "R4 中高风险"], kind: "mid" },
];

// ---------- 工具 ----------
const $ = (id) => document.getElementById(id);
const toast = (text) => { const t = $("toast"); t.textContent = text; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 1800); };
const money = (n) => n.toLocaleString("zh-CN");

// ---------- 金刚区 ----------
$("grid").innerHTML = shortcuts.map((s) =>
  `<a href="#" data-n="${s.name}"><span class="ic" style="background:${s.color}"><svg viewBox="0 0 24 24">${s.icon}</svg></span>${s.name}</a>`).join("");
$("grid").addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); toast(`「${a.dataset.n}」演示中暂未开放`); } });

// ---------- 搜索提示词上下滚动 ----------
const searchHints = ["搜索理财", "搜索基金", "搜索功能"];
const hintBox = $("search-hint");
hintBox.innerHTML = searchHints.map((t) => `<span>${t}</span>`).join("");
const hintSpans = hintBox.querySelectorAll("span");
let hintIndex = 0;
setInterval(() => {
  hintIndex = (hintIndex + 1) % searchHints.length;
  hintSpans.forEach((s) => (s.style.transform = `translateY(-${hintIndex * 100}%)`));
}, 2500);
const searchInput = $("search-input");
searchInput.addEventListener("input", () => {
  searchInput.closest(".search").classList.toggle("has-value", !!searchInput.value);
});

// ---------- 资产显示/隐藏 ----------
let hidden = false;
$("eye").addEventListener("click", () => {
  hidden = !hidden;
  document.querySelectorAll("[data-v]").forEach((el) => { el.textContent = hidden ? "****" : el.dataset.v; });
});

// ---------- 公告滚动 ----------
$("notice").innerHTML = notices.map((n) => `<div>${n}</div>`).join("");
let ni = 0;
setInterval(() => { ni = (ni + 1) % notices.length; $("notice").querySelectorAll("div").forEach((d) => (d.style.transform = `translateY(-${ni * 100}%)`)); }, 3000);

// ---------- 轮播 ----------
$("slides").innerHTML = slides.map((s) => `<div class="slide" style="background:${s.bg}"><h3>${s.title}</h3><p>${s.text}</p><span class="cta">${s.cta}</span></div>`).join("");
$("dots").innerHTML = slides.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("");
let si = 0;
const slidesEl = $("slides");
const dotEls = $("dots").querySelectorAll("i");
function goTo(i) {
  si = ((i % slides.length) + slides.length) % slides.length;
  slidesEl.style.transform = `translateX(-${si * 100}%)`;
  dotEls.forEach((d, n) => d.classList.toggle("on", n === si));
}
let autoTimer = setInterval(() => goTo(si + 1), 3500);

// 手指 / 鼠标滑动切换轮播
let drag = null;
slidesEl.addEventListener("pointerdown", (e) => {
  drag = { startX: e.clientX, base: -si * slidesEl.getBoundingClientRect().width };
  slidesEl.style.transition = "none";
  try { slidesEl.setPointerCapture(e.pointerId); } catch (e) {}
  clearInterval(autoTimer);
});
slidesEl.addEventListener("pointermove", (e) => {
  if (!drag) return;
  slidesEl.style.transform = `translateX(${drag.base + (e.clientX - drag.startX)}px)`;
});
function endDrag(e) {
  if (!drag) return;
  const dx = e.clientX - drag.startX;
  drag = null;
  slidesEl.style.transition = "";
  if (Math.abs(dx) > 40) goTo(si + (dx < 0 ? 1 : -1));
  else goTo(si);
  autoTimer = setInterval(() => goTo(si + 1), 3500);
}
slidesEl.addEventListener("pointerup", endDrag);
slidesEl.addEventListener("pointercancel", () => {
  if (!drag) return;
  drag = null;
  slidesEl.style.transition = "";
  goTo(si);
  autoTimer = setInterval(() => goTo(si + 1), 3500);
});

// ---------- 限时抢购 ----------
function renderFlash() {
  $("flash").innerHTML = flashProducts.map((p, i) => {
    const left = p.total - p.sold, pct = Math.round((p.sold / p.total) * 100);
    return `<article class="card">
      <span class="tag">${p.tag}</span>
      <h4>${p.name}</h4>
      <div class="rate">${p.rate.toFixed(2)}%<small>预期年化</small></div>
      <div class="meta"><span>${p.days} 天</span><span>${money(p.min)} 元起</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="stock">已抢 ${pct}% · 剩余 ${left} 份</div>
      <button class="buy" data-i="${i}" ${left <= 0 ? "disabled" : ""}>${left <= 0 ? "已售罄" : "立即抢购"}</button>
    </article>`;
  }).join("");
}
$("flash").addEventListener("click", (e) => { const b = e.target.closest(".buy"); if (b && !b.disabled) openSheet(flashProducts[b.dataset.i]); });

// 倒计时：到今天 23:59:59
function tick() {
  const end = new Date(); end.setHours(23, 59, 59, 0);
  const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  const pad = (n) => String(n).padStart(2, "0");
  $("cd-h").textContent = pad(Math.floor(s / 3600));
  $("cd-m").textContent = pad(Math.floor(s / 60) % 60);
  $("cd-s").textContent = pad(s % 60);
}

// ---------- 精选理财 ----------
function renderList(kind = "all") {
  $("list").innerHTML = funds.filter((f) => kind === "all" || f.kind === kind).map((f) => `
    <li><div class="l"><b>${f.rate.toFixed(2)}%</b><span>${f.label}</span></div>
      <div class="m"><h5>${f.name}</h5><p>${f.tags.map((t) => `<em>${t}</em>`).join("")}</p></div>
      <a class="go" href="#">去看看</a></li>`).join("");
}
$("tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  $("tabs").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
  renderList(b.dataset.k);
});
$("list").addEventListener("click", (e) => { if (e.target.closest(".go")) { e.preventDefault(); toast("产品详情演示中暂未开放"); } });

// ---------- 购买弹层 ----------
let current = null;
function openSheet(p) {
  current = p;
  $("sheet-title").textContent = p.name;
  $("sheet-rate").textContent = p.rate.toFixed(2) + "%";
  $("amount").value = p.min;
  updateTip();
  $("mask").classList.add("show"); $("sheet").classList.add("show"); $("sheet").setAttribute("aria-hidden", "false");
}
function closeSheet() { $("mask").classList.remove("show"); $("sheet").classList.remove("show"); $("sheet").setAttribute("aria-hidden", "true"); }
function updateTip() {
  const v = Number($("amount").value) || 0;
  const income = (v * current.rate / 100 * current.days / 365).toFixed(2);
  $("sheet-tip").textContent = v < current.min ? `最低 ${money(current.min)} 元起购` : `预计到期收益约 ${income} 元（仅供参考）`;
}
$("amount").addEventListener("input", updateTip);
document.querySelectorAll(".stepper button").forEach((b) => b.addEventListener("click", () => {
  $("amount").value = Math.max(0, (Number($("amount").value) || 0) + Number(b.dataset.d)); updateTip();
}));
$("mask").addEventListener("click", closeSheet);
$("sheet-close").addEventListener("click", closeSheet);
$("confirm").addEventListener("click", () => {
  const v = Number($("amount").value) || 0;
  if (v < current.min) return toast(`最低 ${money(current.min)} 元起购`);
  current.sold = Math.min(current.total, current.sold + 1);
  renderFlash(); closeSheet();
  toast(`抢购成功：${current.name}\n${money(v)} 元（演示）`);
});

// ---------- 启动 ----------
renderFlash();
renderList();
tick();
setInterval(tick, 1000);
