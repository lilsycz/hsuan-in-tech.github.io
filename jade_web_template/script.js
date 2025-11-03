// Theme toggle
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
let light = false;
btn?.addEventListener('click', () => {
  light = !light;
  root.classList.toggle('light', light);
  btn.textContent = light ? '☀︎' : '☾';
});
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const reveals = [...document.querySelectorAll('.reveal')];
const onScroll = () => {
  const h = window.innerHeight;
  reveals.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < h - 80) el.classList.add('visible');
  });
};
window.addEventListener('scroll', onScroll);
onScroll();

// Tiny canvas dots background
const canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');
let w, h, dots;
function resize() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
  dots = Array.from({length: 80}, () => ({
    x: Math.random()*w, y: Math.random()*h,
    vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3
  }));
}
function step() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text');
  ctx.globalAlpha = 0.15;
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x<0||d.x>w) d.vx*=-1;
    if (d.y<0||d.y>h) d.vy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,1.5,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(step);
}
window.addEventListener('resize', resize);
resize(); step();
