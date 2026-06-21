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

  // ── 9. Team / doctors (UPDATED: show/hide logic) ──────────────────────────
  // If data.doctors has ≥1 → show only those, hide extras
  // If data.doctors is missing or empty → keep all defaults

  if (data.doctors && data.doctors.length > 0) {
    var teamCards = document.querySelectorAll('.team_item');
    teamCards.forEach(function (card, i) {
      if (i < data.doctors.length) {
        var doc = data.doctors[i];
        var nameEl = card.querySelector('.team-menmber_name');
        var roleEl = card.querySelector('.team-menuber_designation');
        var imgEl  = card.querySelector('.team_image');
        if (nameEl)             nameEl.textContent = doc.name;
        if (roleEl && doc.role) roleEl.textContent = doc.role;
        if (imgEl  && doc.photo) {
          imgEl.setAttribute('referrerpolicy', 'no-referrer');
          imgEl.src = doc.photo;
          imgEl.alt = doc.name;
          imgEl.removeAttribute('srcset');
        }
      } else {
        // Hide extra template cards
        var wrapper = card.closest('.w-dyn-item');
        if (wrapper) wrapper.style.display = 'none';
        else card.style.display = 'none';
      }
    });
  }

  // ── 10. Testimonials (UPDATED: show/hide logic) ───────────────────────────

  if (data.testimonials && data.testimonials.length > 0) {
    var slides = document.querySelectorAll('.testimonial-slider_slide');
    slides.forEach(function (slide, i) {
      if (i < data.testimonials.length) {
        var t       = data.testimonials[i];
        var nameEl  = slide.querySelector('.testimonial-author_name');
        var roleEl  = slide.querySelector('.testimonial-author_designation');
        var imgEl   = slide.querySelector('.testimonial-author_image');
        var quoteEl = slide.querySelector('.testimonial-slider_quotes');
        if (nameEl)            nameEl.textContent  = t.name;
        if (roleEl)            roleEl.textContent  = t.role || '';
        if (quoteEl)           quoteEl.textContent = t.quote;
        if (imgEl  && t.photo) {
          imgEl.setAttribute('referrerpolicy', 'no-referrer');
          imgEl.src = t.photo;
          imgEl.removeAttribute('srcset');
        }
      } else {
        // Hide extra slides
        slide.style.display = 'none';
      }
    });
  }

  // ── 11. Services (UPDATED: show/hide logic) ────────────────────────────────

  if (data.services && data.services.length > 0) {
    // Home page: .service_item-wrap blocks
    var homeServiceItems = document.querySelectorAll('.service_item-wrap');
    homeServiceItems.forEach(function (wrap, i) {
      if (i < data.services.length) {
        var svc     = data.services[i];
        var item    = wrap.querySelector('.service_item');
        var titleEl = item ? item.querySelector('.service-item_info-title') : null;
        var descEl  = titleEl ? titleEl.nextElementSibling : null;
        if (titleEl)                       titleEl.textContent = svc.name;
        if (descEl && descEl.tagName === 'P' && svc.description) descEl.textContent = svc.description;
        // Update tags if provided
        if (svc.tags && svc.tags.length) {
          var tagEls = item ? item.querySelectorAll('.service-item_tag div:not(.service-tag_icon)') : [];
          svc.tags.slice(0, tagEls.length).forEach(function (tag, j) {
            tagEls[j].textContent = tag;
          });
        }
        // Update service image if provided
        if (svc.image && item) {
          var imgDiv = item.querySelector('.service-item_image');
          if (imgDiv) imgDiv.style.backgroundImage = 'url("' + svc.image + '")';
        }
      } else {
        // Hide extra service cards
        wrap.style.display = 'none';
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

  // ── 14. Location / address (UPDATED: show/hide logic) ─────────────────────

  if (data.locations && data.locations.length > 0) {
    // Update the paragraph text dynamically to avoid showing USA defaults
    var locPara = document.querySelector('.location-header_para');
    if (locPara) {
      if (data.locations.length === 1) {
        locPara.textContent = 'Visit our clinic in ' + (data.city || 'India') + ' for premium dental care.';
      } else {
        locPara.textContent = data.locations.length + ' convenient locations in ' + (data.city || 'India') + ' for premium dental care.';
      }
    }

    var locationItems = document.querySelectorAll('.locatioin_item, .location_item');
    locationItems.forEach(function (item, i) {
      // Cycle through available locations to fill all marquee slots beautifully
      var loc = data.locations[i % data.locations.length];
      var nameEl  = item.querySelector('.location_title, .location_name, h3');
      var addrEl  = item.querySelector('.location_para, .location_address, p');
      if (nameEl  && loc.name)    nameEl.textContent = loc.name;
      if (addrEl  && loc.address) addrEl.textContent = loc.address;
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

  // ── 16. Gallery / Before-After (NEW) ──────────────────────────────────────
  // If data.gallery has ≥1 → replace gallery items, hide extras
  // If data.gallery is missing or empty → keep all 3 defaults

  if (data.gallery && data.gallery.length > 0) {
    var galleryList = document.getElementById('gallery-list');
    var galleryItems = galleryList ? galleryList.querySelectorAll('.gallery_item') : [];

    galleryItems.forEach(function (item, i) {
      if (i < data.gallery.length) {
        var g = data.gallery[i];

        if (g.type === 'before_after' && g.before && g.after) {
          // Update before/after images
          item.setAttribute('data-gallery-type', 'before_after');
          var beforeImg = item.querySelector('.gallery_before-img');
          var afterImg = item.querySelector('.gallery_after-img');
          if (beforeImg) {
            beforeImg.setAttribute('referrerpolicy', 'no-referrer');
            beforeImg.src = g.before;
            beforeImg.removeAttribute('srcset');
          }
          if (afterImg)  {
            afterImg.setAttribute('referrerpolicy', 'no-referrer');
            afterImg.src = g.after;
            afterImg.removeAttribute('srcset');
          }
        } else if (g.type === 'photo' && g.url) {
          // Convert to single photo display
          item.setAttribute('data-gallery-type', 'photo');
          var baContainer = item.querySelector('.gallery_before-after');
          if (baContainer) {
            baContainer.innerHTML = '<img class="gallery_image" src="' + g.url + '" alt="' + (g.caption || '') + '" style="width:100%;aspect-ratio:4/3;object-fit:cover;" loading="lazy" referrerpolicy="no-referrer"/>';
          }
        }

        var captionEl = item.querySelector('.gallery_caption');
        if (captionEl && g.caption) captionEl.textContent = g.caption;
      } else {
        // Hide extra gallery items
        item.style.display = 'none';
      }
    });

    // If we have MORE gallery items than template slots, create new ones
    if (data.gallery.length > galleryItems.length && galleryList && galleryItems.length > 0) {
      for (var gi = galleryItems.length; gi < Math.min(data.gallery.length, 9); gi++) {
        var g = data.gallery[gi];
        var newItem = document.createElement('div');
        newItem.className = 'gallery_item';
        newItem.setAttribute('data-gallery-type', g.type || 'photo');

        if (g.type === 'before_after' && g.before && g.after) {
          newItem.innerHTML =
            '<div class="gallery_before-after">' +
            '<div class="gallery_before"><img class="gallery_image gallery_before-img" src="' + g.before + '" alt="Before" loading="lazy" referrerpolicy="no-referrer"/><span class="gallery_label">Before</span></div>' +
            '<div class="gallery_after"><img class="gallery_image gallery_after-img" src="' + g.after + '" alt="After" loading="lazy" referrerpolicy="no-referrer"/><span class="gallery_label">After</span></div>' +
            '<div class="gallery_divider"></div>' +
            '<div class="gallery_divider-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4L4 8L8 12" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 4L20 8L16 12" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
            '</div>' +
            '<div class="gallery_caption">' + (g.caption || '') + '</div>';
        } else {
          newItem.innerHTML =
            '<div class="gallery_before-after"><img class="gallery_image" src="' + (g.url || '') + '" alt="' + (g.caption || '') + '" style="width:100%;aspect-ratio:4/3;object-fit:cover;" loading="lazy" referrerpolicy="no-referrer"/></div>' +
            '<div class="gallery_caption">' + (g.caption || '') + '</div>';
        }
        galleryList.appendChild(newItem);
      }
    }
  }

  // ── 17. About / Our Story (NEW) ───────────────────────────────────────────
  // If data.about exists, replace the "Our Story" body text

  if (data.about) {
    // About page story paragraphs
    var storyParas = document.querySelectorAll('.about-story_content p, .home-value_header-para .body-text-18px');
    if (storyParas.length > 0) {
      var aboutParts = data.about.split('\n\n');
      storyParas.forEach(function (p, i) {
        if (aboutParts[i]) p.textContent = aboutParts[i];
      });
    }
  }

  // ── 18. Map embed (NEW) ───────────────────────────────────────────────────
  // If data.map_embed_url exists, inject a Google Maps iframe

  if (data.map_embed_url) {
    var mapContainers = document.querySelectorAll('.location_map, [class*="map-embed"], #map-container');
    mapContainers.forEach(function (container) {
      var iframe = document.createElement('iframe');
      iframe.src = data.map_embed_url;
      iframe.width = '100%';
      iframe.height = '300';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  }

  // ── 19. Global "Lumora" → clinic name replacement in all text nodes ────────
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
