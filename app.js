// 云杉银行理财限时抢购（虚构演示页面，没有任何真实交易）
const products = [
  { name: "稳享 90 天", tag: "新客专享", rate: 3.2, days: 90, min: 1000, total: 500, sold: 312 },
  { name: "安盈 180 天", tag: "热销", rate: 3.6, days: 180, min: 5000, total: 300, sold: 251 },
  { name: "长青 365 天", tag: "限量", rate: 4.1, days: 365, min: 10000, total: 100, sold: 97 },
];

const list = document.getElementById("list");
const toast = document.getElementById("toast");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function render() {
  list.innerHTML = products.map((p, i) => {
    const left = p.total - p.sold;
    const pct = Math.round((p.sold / p.total) * 100);
    return `
      <article class="card">
        <span class="tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="rate">${p.rate.toFixed(2)}%<small>预期年化</small></div>
        <div class="meta"><span>期限 ${p.days} 天</span><span>${p.min} 元起购</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="stock">已抢 ${pct}%，剩余 ${left} 份</div>
        <button class="buy" data-i="${i}" ${left <= 0 ? "disabled" : ""}>${left <= 0 ? "已售罄" : "立即抢购"}</button>
      </article>`;
  }).join("");
}

list.addEventListener("click", (e) => {
  const btn = e.target.closest(".buy");
  if (!btn) return;
  const p = products[btn.dataset.i];
  if (p.sold >= p.total) return;
  p.sold += 1;
  render();
  showToast(`抢购成功：${p.name}（演示）`);
});

// 本场结束时间：今天 23:59:59
function tick() {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("cd").textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

render();
tick();
setInterval(tick, 1000);
