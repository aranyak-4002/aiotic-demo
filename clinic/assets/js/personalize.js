(async function () {
  var params = new URLSearchParams(window.location.search);

  // Persist params across page navigations within same session
  if (params.toString()) {
    sessionStorage.setItem('aiotic_clinic_params', params.toString());
  } else {
    var stored = sessionStorage.getItem('aiotic_clinic_params');
    if (stored) params = new URLSearchParams(stored);
  }

  var clientKey = params.get('client');

  var SUPABASE_URL = 'https://ygubqwujuigodtjhemao.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_pU2u5bkVpcJtagQxu1VoKw_XKYrXSQC';

  // 1. Load client data: try Supabase first, fall back to static JSON
  var data = {};
  if (clientKey) {
    var loaded = false;
    // Supabase fetch (only if credentials are configured)
    if (SUPABASE_URL) {
      try {
        var sbRes = await fetch(
          SUPABASE_URL + '/rest/v1/demo_clients?slug=eq.' + encodeURIComponent(clientKey) + '&is_active=eq.true&select=data&limit=1',
          { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY } }
        );
        if (sbRes.ok) {
          var rows = await sbRes.json();
          if (rows.length > 0) { data = rows[0].data; loaded = true; }
        }
      } catch (e) {}
    }
    // Static JSON fallback
    if (!loaded) {
      try {
        var res = await fetch('/clinic-data/' + clientKey + '.json');
        if (res.ok) data = await res.json();
      } catch (e) {}
    }
  }

  // 2. URL param overrides (quick demo without a full JSON)
  function ov(key, val) {
    if (val) data[key] = val;
  }
  ov('name',        params.get('name'));
  ov('phone',       params.get('phone'));
  ov('email',       params.get('email'));
  ov('city',        params.get('city'));
  ov('booking_url', params.get('cal'));
  if (params.get('doctor') && data.doctors && data.doctors[0]) {
    data.doctors[0].name = params.get('doctor');
  } else if (params.get('doctor')) {
    data.doctors = [{ name: params.get('doctor'), role: '', photo: '' }];
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  function setText(sel, text) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = text; });
  }

  // ── 3. Page title & meta ────────────────────────────────────────────────────

  if (data.name) {
    document.title = data.name + (data.tagline ? ' | ' + data.tagline : '');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    var twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = document.title;
  }

  // ── 4. Phone ────────────────────────────────────────────────────────────────

  if (data.phone) {
    // All tel: href links
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.href = 'tel:' + data.phone;
      var div = a.querySelector('div');
      if (div && !div.querySelector('svg')) div.textContent = data.phone;
    });
    // Hero info card call text
    document.querySelectorAll('.our-info_item-link').forEach(function (a) {
      if (a.href && a.href.indexOf('tel:') !== -1) {
        a.href = 'tel:' + data.phone;
        var para = a.querySelector('.our-info_item-para');
        if (para) para.textContent = 'Call : ' + data.phone;
      }
    });
    // Footer contact header
    document.querySelectorAll('.footer-contact_link').forEach(function (a) {
      if (a.href && a.href.indexOf('tel:') !== -1) {
        a.href = 'tel:' + data.phone;
        var div = a.querySelector('div');
        if (div) div.textContent = data.phone;
      }
    });
  }

  // ── 5. Email ────────────────────────────────────────────────────────────────

  if (data.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.href = 'mailto:' + data.email;
      // Hero info card
      var para = a.querySelector('.our-info_item-para');
      if (para) { para.textContent = 'Email: ' + data.email; return; }
      // Footer contact header
      var div = a.querySelector('div');
      if (div && !div.querySelector('svg')) div.textContent = data.email;
    });
  }

  // ── 6. Booking / appointment links ─────────────────────────────────────────

  if (data.booking_url) {
    document.querySelectorAll(
      'a[href*="calendly.com"], a[href*="cal.com"]'
    ).forEach(function (a) { a.href = data.booking_url; });
  }

  // ── 7. Clinic name in footer ────────────────────────────────────────────────

  if (data.name) {
    document.querySelectorAll('.footer_bottom .text-color-dark').forEach(function (el) {
      if (el.textContent.indexOf('Lumora Dental') !== -1) {
        el.textContent = '© ' + new Date().getFullYear() + ' ' + data.name + '. All rights reserved.';
      }
    });
    document.querySelectorAll('.dropdown-info_text').forEach(function (el) {
      el.textContent = '© ' + new Date().getFullYear() + ' ' + data.name;
    });
  }

  // ── 8. Opening hours (hero info bar on index.html) ─────────────────────────

  if (data.hours) {
    var hourBlocks = document.querySelectorAll('.our-info_item.is-last .our-info_block');
    if (hourBlocks[0] && data.hours.weekday) {
      var wdParas = hourBlocks[0].querySelectorAll('.our-info_item-para');
      if (wdParas[1]) wdParas[1].textContent = data.hours.weekday;
    }
    if (hourBlocks[1] && data.hours.weekend) {
      var weParas = hourBlocks[1].querySelectorAll('.our-info_item-para');
      if (weParas[1]) weParas[1].textContent = data.hours.weekend;
    }
  }

  // ── 9. Team / doctors ──────────────────────────────────────────────────────

  if (data.doctors && data.doctors.length) {
    var teamCards = document.querySelectorAll('.team_item');
    data.doctors.slice(0, teamCards.length).forEach(function (doc, i) {
      var card = teamCards[i];
      var nameEl = card.querySelector('.team-menmber_name');
      var roleEl = card.querySelector('.team-menuber_designation');
      var imgEl  = card.querySelector('.team_image');
      if (nameEl)             nameEl.textContent = doc.name;
      if (roleEl && doc.role) roleEl.textContent = doc.role;
      if (imgEl  && doc.photo) { imgEl.src = doc.photo; imgEl.alt = doc.name; imgEl.removeAttribute('srcset'); }
    });
  }

  // ── 10. Testimonials ───────────────────────────────────────────────────────

  if (data.testimonials && data.testimonials.length) {
    var slides = document.querySelectorAll('.testimonial-slider_slide');
    data.testimonials.slice(0, slides.length).forEach(function (t, i) {
      var slide   = slides[i];
      var nameEl  = slide.querySelector('.testimonial-author_name');
      var roleEl  = slide.querySelector('.testimonial-author_designation');
      var imgEl   = slide.querySelector('.testimonial-author_image');
      var quoteEl = slide.querySelector('.testimonial-slider_quotes');
      if (nameEl)            nameEl.textContent  = t.name;
      if (roleEl && t.role)  roleEl.textContent  = t.role;
      if (quoteEl)           quoteEl.textContent = t.quote;
      if (imgEl  && t.photo) imgEl.src           = t.photo;
    });
  }

  // ── 11. Services (home page sticky scroll) ─────────────────────────────────

  if (data.services && data.services.length) {
    // Home page: .service-item_info-title + p + .service_tag items
    var homeServiceItems = document.querySelectorAll('.service_item');
    data.services.slice(0, homeServiceItems.length).forEach(function (svc, i) {
      var item    = homeServiceItems[i];
      var titleEl = item.querySelector('.service-item_info-title');
      var descEl  = titleEl ? titleEl.nextElementSibling : null;
      if (titleEl)                   titleEl.textContent = svc.name;
      if (descEl && descEl.tagName === 'P') descEl.textContent = svc.description;
      if (svc.tags) {
        var tagEls = item.querySelectorAll('.service_tag div, .service-item_tag-list div');
        svc.tags.slice(0, tagEls.length).forEach(function (tag, j) {
          tagEls[j].textContent = tag;
        });
      }
    });

    // Service page: .service-trigger_title accordion headers
    var svcTriggers = document.querySelectorAll('.service-trigger_title');
    data.services.slice(0, svcTriggers.length).forEach(function (svc, i) {
      svcTriggers[i].textContent = svc.name;
    });
  }

  // ── 12. Social links (footer) ──────────────────────────────────────────────

  if (data.social) {
    var footerSocials = document.querySelectorAll('.footer-menu_link-wrap.is-social .footer-menu_link');
    var footerOrder   = ['facebook', 'twitter', 'linkedin', 'instagram'];
    footerSocials.forEach(function (a, i) {
      var key = footerOrder[i];
      if (key && data.social[key]) a.href = data.social[key];
    });
    var dropSocials = document.querySelectorAll('.navbar-dropdown_social .dropdown-social_icon-item');
    var dropOrder   = ['facebook', 'instagram', 'twitter'];
    dropSocials.forEach(function (a, i) {
      var key = dropOrder[i];
      if (key && data.social[key]) a.href = data.social[key];
    });
  }

  // ── 13. Stats (about page) ─────────────────────────────────────────────────

  if (data.stats) {
    var successCards = document.querySelectorAll('.success_card');
    if (data.stats.years      && successCards[0]) setText('.success_card:nth-child(1) .success-card_number', data.stats.years);
    if (data.stats.patients   && successCards[1]) setText('.success_card:nth-child(2) .success-card_number', data.stats.patients);
    if (data.stats.rating     && successCards[2]) setText('.success_card:nth-child(3) .success-card_number', data.stats.rating);
    if (data.stats.awards     && successCards[3]) setText('.success_card:nth-child(4) .success-card_number', data.stats.awards);
  }

  // ── 14. Location / address (about page) ───────────────────────────────────

  if (data.locations && data.locations.length) {
    var locationItems = document.querySelectorAll('.location_list .location_item, .location_list > div');
    data.locations.slice(0, locationItems.length).forEach(function (loc, i) {
      var item    = locationItems[i];
      var nameEl  = item.querySelector('.location_name, h3');
      var addrEl  = item.querySelector('.location_address, p');
      var mapLink = item.querySelector('a[href*="maps.google"], a[href*="goo.gl"]');
      if (nameEl  && loc.name)    nameEl.textContent = loc.name;
      if (addrEl  && loc.address) addrEl.textContent = loc.address;
      if (mapLink && loc.map_url) mapLink.href        = loc.map_url;
    });
  }

  // ── 15. Navbar + footer logo → clinic name text ───────────────────────────

  if (data.name) {
    function swapLogoToText(wrapperSel, imgSel, color, maxW) {
      document.querySelectorAll(wrapperSel).forEach(function (wrap) {
        var img = wrap.querySelector(imgSel);
        if (!img) return;
        img.style.display = 'none';
        wrap.style.maxWidth = maxW || '160px';
        var span = document.createElement('span');
        span.textContent = data.name;
        span.style.cssText = [
          'font-family:Sora,sans-serif',
          'font-weight:700',
          'font-size:0.82rem',
          'letter-spacing:-0.01em',
          'line-height:1.25',
          'color:' + (color || '#ffffff'),
          'display:block',
          'white-space:normal',
          'word-break:break-word',
          'max-width:100%',
        ].join(';');
        wrap.insertBefore(span, img);
      });
    }
    swapLogoToText('.navbar_logo', '.logo_image', '#ffffff', '160px');
    swapLogoToText('.footer_brand', '.brand_logo', '#ffffff', '200px');
  }

  // ── 17. Global "Lumora" → clinic name replacement in all text nodes ────────
  // Catches hardcoded brand name in descriptions, subheadings, paragraphs.

  if (data.name && data.name !== 'Lumora Dental') {
    var skipTags = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };

    function replaceInNode(node) {
      if (node.nodeType === 3) {
        var orig = node.nodeValue;
        var updated = orig
          .replace(/Lumora Dental/g, data.name)
          .replace(/Lumora/g, data.name);
        if (updated !== orig) node.nodeValue = updated;
      } else if (node.nodeType === 1 && !skipTags[node.tagName]) {
        for (var c = node.firstChild; c; c = c.nextSibling) replaceInNode(c);
      }
    }

    replaceInNode(document.body);

    // Also fix the WhatsApp lead-form message built in index.html inline JS
    // by exposing the name globally so the handler can pick it up
    window.__clinicName = data.name;
  }

})();
