// EN/FR switch: texts live in data-en / data-fr attributes.
function setLang(l) {
  document.documentElement.lang = l;
  document.querySelectorAll('[data-en]').forEach(function (el) { el.textContent = el.dataset[l]; });
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.setAttribute('aria-pressed', b.dataset.lang === l);
  });
}
var lang = (navigator.language || '').slice(0, 2) === 'fr' ? 'fr' : 'en';
try { lang = localStorage.getItem('lang') || lang; } catch (e) {}
setLang(lang);
document.querySelectorAll('[data-lang]').forEach(function (b) {
  b.addEventListener('click', function () {
    setLang(b.dataset.lang);
    try { localStorage.setItem('lang', b.dataset.lang); } catch (e) {}
  });
});

// Living seal, card tilt. Skipped when the user prefers reduced motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var seal = document.querySelector('.seal');
  seal.addEventListener('click', function () {
    seal.classList.add('wig');
    setTimeout(function () { seal.classList.remove('wig'); }, 600);
  });
  document.addEventListener('pointermove', function (e) {
    var r = seal.getBoundingClientRect();
    var dx = (e.clientX - r.left - r.width / 2) / 300, dy = (e.clientY - r.top - r.height / 2) / 300;
    var k = Math.min(1, 1 / Math.hypot(dx, dy)); // keep the highlight inside the eye
    seal.style.setProperty('--ex', (dx * k * 14).toFixed(1));
    seal.style.setProperty('--ey', (dy * k * 14).toFixed(1));
  });
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 16).toFixed(1) + 'deg');
        c.style.setProperty('--rx', ((.5 - (e.clientY - r.top) / r.height) * 16).toFixed(1) + 'deg');
      });
      c.addEventListener('pointerleave', function () { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); });
    });
  }
}
