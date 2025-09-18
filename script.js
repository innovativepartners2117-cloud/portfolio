// Year
document.getElementById("yr").textContent = new Date().getFullYear?.() || new Date().getFullYear();

// Mobile nav
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navLinks");
if (hamburger) hamburger.addEventListener("click", () => nav.classList.toggle("open"));

// Reveal on scroll
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.18 }
);
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
document.querySelectorAll(".section-title, .xp-card, .card").forEach(el => el.classList.add("reveal"));

// Filters + Lightbox
const chips = document.querySelectorAll(".filters .chip");
const items = Array.from(document.querySelectorAll("#gallery .card"));
let activeFilter = "all";

chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  activeFilter = chip.dataset.filter;
  items.forEach(it => it.style.display =
    activeFilter === "all" || it.dataset.category === activeFilter ? "block" : "none");
}));

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const closeBtn = document.getElementById("close");
let visible = items;
let idx = 0;

function updateVisible() {
  visible = items.filter(it => activeFilter === "all" || it.dataset.category === activeFilter);
}
function openLB(i) {
  updateVisible();
  idx = i;
  const card = visible[idx];
  const img = card.querySelector("img");
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = card.querySelector("h3").textContent;
  lb.classList.add("open"); document.body.style.overflow = "hidden";
}
function closeLB() { lb.classList.remove("open"); document.body.style.overflow = ""; }
function navLB(d) {
  updateVisible();
  idx = (idx + d + visible.length) % visible.length;
  const card = visible[idx]; const img = card.querySelector("img");
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = card.querySelector("h3").textContent;
}
items.forEach((card, i) => card.addEventListener("click", () => {
  updateVisible();
  const actual = visible.indexOf(card);
  openLB(actual > -1 ? actual : i);
}));
if (next) next.addEventListener("click", () => navLB(1));
if (prev) prev.addEventListener("click", () => navLB(-1));
if (closeBtn) closeBtn.addEventListener("click", closeLB);
if (lb) lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
window.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowRight") navLB(1);
  if (e.key === "ArrowLeft") navLB(-1);
});

// Contact form (demo only)
const form = document.getElementById("contactForm");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  alert(`Thanks ${data.name}! I will reply to ${data.email}.`);
  form.reset();
});
