(function () {
  var params = new URLSearchParams(window.location.search);
  var STORE_KEY = 'aiotic_demo_params';

  // Save to sessionStorage when params are in URL; restore on subsequent pages
  if (params.toString()) {
    sessionStorage.setItem(STORE_KEY, params.toString());
  } else {
    var stored = sessionStorage.getItem(STORE_KEY);
    if (stored) params = new URLSearchParams(stored);
  }

  var cfg = {
    name:    params.get('name')   || 'Your Clinic Name',
    doctor:  params.get('doctor') || 'Dr. Your Name',
    spec:    params.get('spec')   || 'General Physician',
    city:    params.get('city')   || 'Your City',
    phone:   params.get('phone')  || '+91 00000 00000',
    email:   params.get('email')  || 'hello@yourclinic.com',
    area:    params.get('area')   || 'Your Area',
    cal:     params.get('cal')    || 'https://cal.com/aiotic/discovery',
  };

  // --- Handle lead form ---
  window.lumoraLead = function (e) {
    e.preventDefault();
    var form = e.target;
    var success = document.querySelector('.lead-form_success');
    if (form && success) {
      form.style.display = 'none';
      success.style.display = 'block';
    }
    return false;
  };

  // Text node replacement helper (skips script/style tags)
  function replaceText(el, from, to) {
    if (!to || from === to) return;
    if (el.nodeType === 3) {
      if (el.textContent.includes(from)) {
        el.textContent = el.textContent.split(from).join(to);
      }
    } else if (el.nodeType === 1 && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
      el.childNodes.forEach(function (c) { replaceText(c, from, to); });
    }
  }

  function applyParams() {
    // Page title + meta
    document.title = cfg.name + ' | Modern, Gentle Dentistry';
    ['og:title', 'twitter:title'].forEach(function (prop) {
      var el = document.querySelector('meta[property="' + prop + '"], meta[name="' + prop + '"]');
      if (el) el.setAttribute('content', cfg.name);
    });

    // Replace logos and copyright by ID (most reliable — no Webflow JS interference)
    var navLogo = document.getElementById('demo-nav-logo');
    if (navLogo) navLogo.textContent = cfg.name;

    var footerLogo = document.getElementById('demo-footer-logo');
    if (footerLogo) footerLogo.textContent = cfg.name;

    var copyright = document.getElementById('demo-copyright');
    if (copyright) copyright.textContent = '© 2026 ' + cfg.name;

    var copyright2 = document.getElementById('demo-copyright-2');
    if (copyright2) copyright2.textContent = '© 2026 ' + cfg.name;

    // Replace remaining "Lumora Dental" / "Lumora" text nodes
    replaceText(document.body, 'Lumora Dental', cfg.name);
    replaceText(document.body, 'Lumora', cfg.name);

    // Hero sub-paragraph → doctor · specialty · area, city
    var heroPara = document.querySelector('.home-hero_para');
    if (heroPara) {
      heroPara.textContent =
        cfg.doctor + '  ·  ' + cfg.spec + '  ·  ' + cfg.area + ', ' + cfg.city;
    }

    // Phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.href = 'tel:' + cfg.phone.replace(/\D/g, '');
      var div = a.querySelector('div');
      if (div) div.textContent = 'Call : ' + cfg.phone;
    });

    // Email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.href = 'mailto:' + cfg.email;
      var div = a.querySelector('div');
      if (div) div.textContent = 'Email: ' + cfg.email;
    });

    // Booking / Calendly links
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
      a.href = cfg.cal;
    });

    // Footer "Get Appointment" button (data-wf variant) → booking link
    document.querySelectorAll('a[href*="calendly"]').forEach(function (a) {
      a.href = cfg.cal;
    });

    // Add "Powered by Aiotic" sticky banner
    var banner = document.createElement('div');
    banner.id = 'aiotic-demo-banner';
    banner.innerHTML =
      '🤖 Personalized demo by <strong><a href="https://getaiotic.com" target="_blank" style="color:#1c91a1;text-decoration:none;">Aiotic Technologies</a></strong>' +
      '&nbsp;&nbsp;|&nbsp;&nbsp;<a href="' + cfg.cal + '" target="_blank" style="color:#1c91a1;">Book a free call to get your own website →</a>';
    banner.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
      'background:#011f23;color:#e2f1f3;font-family:Sora,sans-serif;font-size:13px;' +
      'padding:12px 20px;text-align:center;border-top:2px solid #1c91a1;line-height:1.4;';
    document.body.appendChild(banner);

    // Add body padding so content isn't hidden behind banner
    document.body.style.paddingBottom = '52px';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyParams);
  } else {
    applyParams();
  }
})();
