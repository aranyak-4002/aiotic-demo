(function () {
  var params = new URLSearchParams(window.location.search);

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

    // Replace logo images with clinic name text
    document.querySelectorAll('img.logo_image, img.brand_logo').forEach(function (img) {
      var span = document.createElement('span');
      span.textContent = cfg.name;
      span.style.cssText =
        'font-family:Sora,sans-serif;font-size:18px;font-weight:700;' +
        'color:inherit;letter-spacing:-0.3px;white-space:nowrap;';
      img.parentNode.replaceChild(span, img);
    });

    // Replace "Lumora Dental" before "Lumora" so longer match goes first
    replaceText(document.body, 'Lumora Dental', cfg.name);
    replaceText(document.body, 'Lumora', cfg.name);

    // Replace footer credit
    replaceText(document.body, 'Crafted by RapidXAI', 'Aiotic Technologies');

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
