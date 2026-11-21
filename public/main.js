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

// Tilt toward the mouse on cards and the profile picture, spin the picture on click.
// Skipped when the user prefers reduced motion; tilt only with a fine pointer.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var pp = document.querySelector('.pp');
  pp.addEventListener('click', function () {
    pp.classList.remove('spin');
    void pp.offsetWidth; // restart the animation on a quick second click
    pp.classList.add('spin');
  });
  pp.addEventListener('animationend', function () { pp.classList.remove('spin'); });
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.card, .pp').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var ry = ((e.clientX - r.left) / r.width - .5) * 16, rx = (.5 - (e.clientY - r.top) / r.height) * 16;
        el.style.transform = 'perspective(800px) rotateX(' + rx.toFixed(1) + 'deg) rotateY(' + ry.toFixed(1) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
}
