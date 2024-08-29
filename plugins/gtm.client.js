// plugins/gtm.js
export default ({ app }) => {
  if (process.client) {
    (function(w, d, s, i) {
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s);
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtag/js?id=' + i;
      f.parentNode.insertBefore(j, f);

      w.dataLayer = w.dataLayer || [];
      function gtag(){w.dataLayer.push(arguments);}
      w.gtag = gtag;
      gtag('js', new Date());
      gtag('config', i);
    })(window, document, 'script', 'G-S8NR6D6FDP');
  }
};