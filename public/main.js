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
