const { chromium } = require('playwright')

// ─── Google Maps Scraper (existing, cleaned up) ──────────────────────────────

async function scrapeClinic(mapsUrl) {
  console.log('  [Maps] Scraping:', mapsUrl)

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(mapsUrl, { waitUntil: 'load', timeout: 60000 })
  await page.waitForSelector('h1', { timeout: 15000 })
  await page.waitForTimeout(3000)

  const data = await page.evaluate(() => {
    const name = document.querySelector('h1')?.textContent?.trim() || ''

    const phoneEl = document.querySelector('[data-tooltip="Copy phone number"]')
    const phone = phoneEl?.closest('[aria-label]')?.getAttribute('aria-label')
      ?.replace('Phone: ', '')?.trim() || ''

    const addressEl = document.querySelector('[data-tooltip="Copy address"]')
    const address = addressEl?.closest('[aria-label]')?.getAttribute('aria-label')
      ?.replace('Address: ', '')?.trim() || ''

    const ratingEl = document.querySelector('.fontDisplayLarge')
    const rating = ratingEl?.textContent?.trim() || ''

    const reviewCountEl = document.querySelector('button[aria-label*="review"]')
    const totalReviews = reviewCountEl?.getAttribute('aria-label')?.match(/\d+/)?.[0] || '0'

    const hoursEls = document.querySelectorAll('table.eK4R0e tr')
    const hours = {}
    hoursEls.forEach(row => {
      const day = row.querySelector('td.ylH6lf')?.textContent?.trim()
      const time = row.querySelector('td.mxowUb')?.textContent?.trim()
      if (day && time) hours[day] = time
    })

    const categoryEl = document.querySelector('button.DkEaL')
    const category = categoryEl?.textContent?.trim() || ''

    const photoEls = document.querySelectorAll('div.RZ66Rb img, button.Tub1ub img')
    const photos = [...photoEls]
      .map(img => img.src)
      .filter(src => src.startsWith('https') && !src.includes('avatar') && !src.includes('profile'))
      .slice(0, 10)

    const reviewEls = document.querySelectorAll('.jftiEf')
    const reviews = [...reviewEls]
      .slice(0, 5)
      .map(r => ({
        author: r.querySelector('.d4r55')?.textContent?.trim() || '',
        rating: r.querySelectorAll('span.hCCjke').length || 5,
        text: r.querySelector('.wiI7pd')?.textContent?.trim() || '',
        time: r.querySelector('.rsqaWe')?.textContent?.trim() || ''
      }))
      .filter(r => r.author && r.text)

    const websiteEl = document.querySelector('[data-tooltip="Open website"]')
    const website = websiteEl?.closest('[aria-label]')?.getAttribute('aria-label')
      ?.replace('Website: ', '')?.trim() || ''

    // Try to get the Google Maps embed URL from the current page URL
    const placeMatch = window.location.href.match(/place\/([^/]+)/)
    const mapQuery = placeMatch ? placeMatch[1].replace(/\+/g, ' ') : ''

    return {
      name, phone, address, rating, totalReviews: parseInt(totalReviews),
      hours, category, photos, reviews, website, hasWebsite: website.length > 0,
      mapQuery
    }
  })

  await browser.close()

  console.log('  [Maps] Got:', data.name, '| Phone:', data.phone || 'n/a', '| Website:', data.hasWebsite ? data.website : 'none')
  return data
}

// ─── Website Scraper (NEW) ───────────────────────────────────────────────────

async function scrapeWebsite(websiteUrl) {
  // Normalize URL
  if (!websiteUrl.startsWith('http')) websiteUrl = 'https://' + websiteUrl

  console.log('  [Website] Scraping:', websiteUrl)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  })
  const page = await context.newPage()
  page.on('console', msg => console.log('    [Browser Console]', msg.text()))

  const result = {
    services: [],
    doctors: [],
    gallery: [],       // { type: 'before_after'|'photo', before?, after?, url?, caption? }
    testimonials: [],
    about: '',
    social: {},
    mapEmbedUrl: ''
  }

  try {
    await page.goto(websiteUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(2000)

    const baseUrl = new URL(websiteUrl).origin

    // Extract everything from the page
    const pageData = await page.evaluate((baseUrl) => {
      const data = {
        services: [],
        doctors: [],
        gallery: [],
        testimonials: [],
        about: '',
        social: {},
        mapEmbedUrl: '',
        stats: {
          years: '',
          patients: '',
          rating: '',
          awards: ''
        }
      }

      // ── Helper: resolve relative URLs ──
      function resolveUrl(src) {
        if (!src) return ''
        if (src.startsWith('http')) return src
        if (src.startsWith('//')) return 'https:' + src
        if (src.startsWith('/')) return baseUrl + src
        return baseUrl + '/' + src
      }

      // ── Helper: find sections by heading text ──
      function findSectionByHeading(keywords) {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .section-title, .heading, [class*="title"]')
        for (const h of headings) {
          const text = h.textContent?.toLowerCase()?.trim() || ''
          
          let matches = false
          for (const kw of keywords) {
            if (text.includes(kw)) {
              if (kw === 'dentist' && text.includes('dentistry')) continue
              if (kw === 'expert' && text.includes('expertise')) continue
              matches = true
              break
            }
          }

          if (matches) {
            if (keywords.includes('about')) {
              if (text.includes('faq') || text.includes('question') || text.includes('services') || text.includes('treatment') || text.includes('testimonials')) {
                continue
              }
            }

            console.log('  [Scraper Heading] Matched heading: "' + h.textContent?.trim() + '" for keywords: ' + JSON.stringify(keywords))
            let parent = h.parentElement
            while (parent && parent.tagName !== 'BODY') {
              const className = parent.className?.toLowerCase() || ''
              const isChild = className.includes('widget') ||
                              className.includes('column') ||
                              className.includes('child') ||
                              className.includes('title')
                              
              const isContainer = (parent.tagName === 'SECTION' ||
                                  className.includes('section') ||
                                  className.includes('e-con') ||
                                  className.includes('row') ||
                                  className.includes('grid') ||
                                  (className.includes('container') && !className.includes('widget-container') && !className.includes('title-container'))) && !isChild
              
              if (isContainer) {
                const descendants = parent.querySelectorAll('p, li, a, img, h1, h2, h3, h4, h5, h6, .elementor-icon-list-item')
                if (descendants.length > 2) {
                  return parent
                }
              }
              parent = parent.parentElement
            }
            const fallback = h.closest('section') || h.closest('[class*="section"]') || h.parentElement?.parentElement
            return fallback
          }
        }
        return null
      }

      // ── Helper: get section by ID or heading ──
      function getSectionByIdOrHeading(idKeywords, headingKeywords) {
        for (const kw of idKeywords) {
          const el = document.getElementById(kw) || 
                     document.querySelector('div[id*="' + kw + '"], section[id*="' + kw + '"], ul[id*="' + kw + '"], [class*="' + kw + '-section"]')
          if (el) {
            console.log('  [Scraper Section] Found section by ID/Class match: #' + el.id + ' .' + el.className.split(' ').join('.'))
            return el
          }
        }
        return findSectionByHeading(headingKeywords)
      }

      // ── Helper: extract card items (double-layer check) ──
      function extractCardsFromSection(section, excludeKeywords) {
        if (!section) return []
        const seenNames = new Set()
        const items = []
        
        // Layer 1: Heading-driven card extraction (gridded cards with titles)
        const headings = section.querySelectorAll('h2, h3, h4, h5, h6, .elementor-heading-title, [class*="title"], [class*="heading"]')
        headings.forEach(h => {
          let name = h.textContent?.trim()
          if (!name || name.length <= 2 || name.length > 80) return
          
          const nameLower = name.toLowerCase()
          const isExcluded = excludeKeywords.some(ex => nameLower.includes(ex))
          if (isExcluded) return
          
          let wrapper = h.parentElement
          while (wrapper && wrapper !== section) {
            const className = wrapper.className?.toLowerCase() || ''
            const isCard = className.includes('card') || 
                           className.includes('item') || 
                           className.includes('col') || 
                           className.includes('e-con') || 
                           wrapper.tagName === 'LI'
            if (isCard) break
            wrapper = wrapper.parentElement
          }
          if (!wrapper) wrapper = h.parentElement
          
          const descEl = wrapper.querySelector('p, .description, [class*="desc"], [class*="text"]')
          const imgEl = wrapper.querySelector('img')
          let description = descEl?.textContent?.trim() || ''
          if (description === name) description = ''
          
          // Skip if name is a sentence (ends with a dot, or is too long with no description)
          if (!description && (name.length > 40 || name.endsWith('.') || name.split(' ').length > 6)) return
          
          if (!seenNames.has(nameLower)) {
            seenNames.add(nameLower)
            items.push({
              name: name,
              description: description.slice(0, 300),
              image: resolveUrl(imgEl?.src || imgEl?.getAttribute('data-src') || '')
            })
          }
        })
        
        // Layer 2: Fallback selector-driven extraction (for list items/bullets)
        if (items.length === 0) {
          const cards = section.querySelectorAll(
            '[class*="service-item"], [class*="service-card"], [class*="service"] > *, [class*="card"], [class*="item"], [class*="col"], li, .grid > *, .row > div'
          )
          cards.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, h5, h6, .title, [class*="title"], [class*="heading"]')
            const descEl = card.querySelector('p, .description, [class*="desc"], [class*="text"]')
            const imgEl = card.querySelector('img')
            
            let name = titleEl?.textContent?.trim()
            let description = descEl?.textContent?.trim()?.slice(0, 300) || ''
            
            if (!name) {
              const textEl = card.querySelector('.elementor-icon-list-text, [class*="text"], span, a')
              const text = (textEl?.textContent || card.textContent)?.trim()
              if (text && text.length > 3 && text.length < 200) {
                const parts = text.split(/[-–—:|]/)
                if (parts.length > 1) {
                  name = parts[0].trim()
                  description = parts.slice(1).join('-').trim().slice(0, 300)
                } else {
                  name = text
                }
              }
            }
            
            if (name) {
              name = name.replace(/\s+/g, ' ').trim()
              const nameLower = name.toLowerCase()
              const isExcluded = excludeKeywords.some(ex => nameLower.includes(ex))
              
              if (name.length > 2 && name.length < 80 && !isExcluded && !seenNames.has(nameLower)) {
                seenNames.add(nameLower)
                items.push({
                  name: name,
                  description: description,
                  image: resolveUrl(imgEl?.src || imgEl?.getAttribute('data-src') || '')
                })
              }
            }
          })
        }
        
        return items
      }

      // ── 1. SERVICES ──
      const svcSection = getSectionByIdOrHeading(['services', 'treatment', 'procedure'], ['service', 'treatment', 'what we offer', 'specialit', 'procedure'])
      if (svcSection) {
        const excludeList = ['home', 'about', 'services', 'testimonials', 'contact', 'appointment', 'book', 'schedule', 'gallery', 'blog', 'privacy', 'terms', 'careers', 'team', 'doctors', 'faq', 'faqs', 'map', 'location', 'read more', 'learn more', 'view more', 'submit', 'send', 'solution', 'problem']
        const cards = extractCardsFromSection(svcSection, excludeList)
        console.log('  [Services] Extracted cards count: ' + cards.length)
        cards.forEach((c, index) => {
          console.log('    [Service #' + index + '] ADDED: "' + c.name + '"')
          data.services.push({
            name: c.name,
            description: c.description,
            image: c.image,
            tags: []
          })
        })
      }

      // ── 2. DOCTORS / TEAM ──
      const teamSection = getSectionByIdOrHeading(['team', 'doctor', 'staff', 'expert'], ['team', 'doctor', 'specialist', 'dentist', 'our expert', 'meet our', 'staff', 'physician'])
      if (teamSection) {
        console.log('  [Doctors] Section found!')
        const candidates = extractCardsFromSection(teamSection, ['team', 'expert', 'our team', 'meet our', 'specialist', 'dentist'])
        candidates.forEach((c, index) => {
          const nameLower = c.name.toLowerCase()
          
          // Exclude names containing obvious non-person keywords
          const hasNonPersonWord = [
            'technology', 'scanning', 'scan', 'visit', 'crown', 'canal', 'microscope',
            'imaging', 'cbct', 'stories', 'story', 'procedures', 'procedure', 'implants',
            'implant', 'tour', 'virtual', 'services', 'service', 'blog', 'recent', 'dentistry',
            'orthodontic', 'treatment', 'whitening', 'cleanup', 'clean', 'braces', 'aligner',
            'invisalign', 'denture', 'extraction', 'hygiene', 'therapy', 'fillings', 'laser',
            'cosmetic', 'restoration', 'preventive', 'pediatric', 'about', 'welcome', 'specialist',
            'excellence', 'care', 'studio', 'center', 'clinic', 'hospital'
          ].some(w => nameLower.includes(w))

          const words = nameLower.split(/\s+/)
          const hasForbiddenWord = words.some(w => [
            'and', 'the', 'of', 'our', 'to', 'for', 'with', 'in', 'at', 'by', 'on', 'from',
            'why', 'we', 'are', 'you', 'your', 'us', 'my', 'their', 'he', 'she', 'it', 'they',
            'better', 'experience', 'comfort', 'patient', 'patients', 'reason', 'reasons',
            'standard', 'standards', 'safety', 'beautiful', 'success', 'rate', 'rates',
            'result', 'results', 'record', 'records', 'transparency', 'honest', 'counsel',
            'procedures', 'fixing', 'braces', 'visit', 'scanning', 'crowns', 'implants',
            'technology', 'appointment', 'contact', 'schedule', 'learn', 'more', 'read', 'view',
            'specialist', 'specialists', 'dentist', 'dentists', 'doctor', 'doctors', 'staff',
            'expert', 'experts', 'excellence', 'care', 'studio', 'center', 'clinic', 'hospital'
          ].includes(w))

          const hasDigits = /\d/.test(c.name)

          const hasLowercaseStart = c.name.split(/\s+/).some(w => {
            if (w.length <= 2) return false
            if (['von', 'van', 'der', 'del', 'dos', 'das', 'den'].includes(w.toLowerCase())) return false
            return /^[a-z]/.test(w)
          })

          const isDoctor = (nameLower.startsWith('dr') || nameLower.includes('dentist') || nameLower.includes('surgeon') || (c.name.split(' ').length >= 2 && c.name.length < 40)) && 
                           !hasNonPersonWord && !hasForbiddenWord && !hasDigits && !hasLowercaseStart
          const isNotBtn = !['book', 'appointment', 'contact', 'schedule', 'more', 'read', 'learn'].some(w => nameLower.includes(w))
          
          if (isDoctor && isNotBtn) {
            console.log('    [Doctor #' + index + '] ADDED: "' + c.name + '"')
            data.doctors.push({
              name: c.name,
              role: c.description || 'Dental Specialist',
              photo: c.image
            })
          }
        })
      }

      // Fallback doctors: scan entire page text for "Dr. [Name]" patterns if none found in team section
      if (data.doctors.length === 0) {
        const textContent = document.body.textContent || ''
        const matches = textContent.match(/Dr\.\s*[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*){1,2}/g) || []
        const seenNames = new Set()
        matches.forEach(m => {
          const name = m.replace(/\s+/g, ' ').trim()
          const nameLower = name.toLowerCase()
          const nameNormalized = nameLower.replace(/[^a-z]/g, '')
          
          const nameWords = name.replace(/^Dr\.\s*/i, '').split(/\s+/)
          const hasInvalidWord = nameWords.some(w => [
            'Everything', 'Follow', 'We', 'Our', 'The', 'If', 'You', 'In', 'On', 'At', 'By', 'To', 'This', 'That', 'It', 'They', 'He', 'She', 'So', 'Thus', 'Because', 'For', 'And', 'But', 'Or', 'Please', 'All', 'Get', 'Book', 'Contact', 'Welcome', 'Read', 'More', 'View', 'Learn', 'Best', 'Dental', 'Clinic', 'Hospital', 'Care', 'Expert', 'Specialist', 'Dentist', 'Co', 'Inc', 'Ltd', 'Corp', 'Group'
          ].includes(w))

          const hasDigits = /\d/.test(name)

          if (!seenNames.has(nameNormalized) && name.length < 40 && !hasInvalidWord && !hasDigits && !nameLower.includes('clinic') && !nameLower.includes('hospital') && !nameLower.includes('dental')) {
            seenNames.add(nameNormalized)
            console.log('    [Doctors Fallback] Found name: "' + name + '"')
            
            // Try to find the closest image near where this name is mentioned
            let photo = ''
            const allElements = document.querySelectorAll('*')
            for (let i = 0; i < allElements.length; i++) {
              if (allElements[i].textContent?.includes(name)) {
                const img = allElements[i].querySelector('img')
                if (img) {
                  photo = resolveUrl(img.src || img.getAttribute('data-src') || '')
                  break
                }
              }
            }
            
            data.doctors.push({
              name: name,
              role: 'Dental Specialist',
              photo: photo
            })
          }
        })
      }

      // ── 3. GALLERY / BEFORE-AFTER ──
      const gallerySection = getSectionByIdOrHeading(['gallery', 'transformation', 'portfolio', 'result'], ['gallery', 'before', 'after', 'transformation', 'result', 'case', 'portfolio', 'work', 'smile'])
      if (gallerySection) {
        const images = gallerySection.querySelectorAll('img')
        const imgUrls = []
        images.forEach(img => {
          const src = resolveUrl(img.src || img.getAttribute('data-src') || '')
          if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('arrow')) {
            imgUrls.push({ url: src, alt: img.alt || '' })
          }
        })

        const headingText = gallerySection.querySelector('h1,h2,h3,h4')?.textContent?.toLowerCase() || ''
        const isBeforeAfter = headingText.includes('before') || headingText.includes('after') || headingText.includes('transformation')

        if (isBeforeAfter && imgUrls.length >= 2) {
          for (let i = 0; i < imgUrls.length - 1; i += 2) {
            data.gallery.push({
              type: 'before_after',
              before: imgUrls[i].url,
              after: imgUrls[i + 1].url,
              caption: imgUrls[i].alt || imgUrls[i + 1].alt || 'Transformation'
            })
          }
        } else {
          imgUrls.forEach(img => {
            data.gallery.push({
              type: 'photo',
              url: img.url,
              caption: img.alt || ''
            })
          })
        }
      }

      // Fallback gallery images if empty
      if (data.gallery.length === 0) {
        const allImgs = document.querySelectorAll('img')
        const seenUrls = new Set()
        allImgs.forEach(img => {
          const src = resolveUrl(img.src || img.getAttribute('data-src') || '')
          if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('arrow') && !src.includes('banner') && !src.includes('header')) {
            if (img.width > 200 || img.height > 200 || img.alt) {
              const urlLower = src.toLowerCase()
              if (!seenUrls.has(urlLower) && (urlLower.includes('gallery') || urlLower.includes('upload') || urlLower.includes('dental') || urlLower.includes('clinic') || urlLower.includes('treatment') || urlLower.includes('before') || urlLower.includes('after'))) {
                seenUrls.add(urlLower)
                data.gallery.push({
                  type: 'photo',
                  url: src,
                  caption: img.alt || ''
                })
              }
            }
          }
        })
      }

      // ── 4. TESTIMONIALS ──
      const testiSection = getSectionByIdOrHeading(['testimonial', 'review', 'feedback'], ['testimonial', 'review', 'patient say', 'feedback', 'what our', 'happy patient'])
      if (testiSection) {
        console.log('  [Testimonials] Section found!')
        const candidates = extractCardsFromSection(testiSection, ['testimonials', 'reviews', 'what our', 'happy patient', 'transformations', 'satisf', 'read', 'our process', 'solutions'])
        candidates.forEach(c => {
          if (c.description && c.description.length > 20) {
            data.testimonials.push({
              name: c.name || 'Patient',
              role: '',
              photo: c.image || '',
              quote: c.description
            })
          }
        })
      }

      // ── 5. STATS ──
      const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span, div, p')
      allTextElements.forEach(el => {
        const text = el.textContent?.trim() || ''
        if (/^\d+(\.\d+)?\s*(\+|★|years)?$/i.test(text) && text.length > 0 && text.length < 10) {
          let labelText = ''
          
          let sibling = el.nextElementSibling
          if (sibling) labelText += ' ' + sibling.textContent
          
          let prevSibling = el.previousElementSibling
          if (prevSibling) labelText += ' ' + prevSibling.textContent
          
          let parent = el.parentElement
          if (parent) labelText += ' ' + parent.textContent
          
          labelText = labelText.toLowerCase()
          
          if (labelText.includes('patient') || labelText.includes('happy patient') || labelText.includes('satisfied')) {
            if (!data.stats.patients) data.stats.patients = text
          } else if (labelText.includes('year') || labelText.includes('experience') || labelText.includes('establish') || labelText.includes('legacy')) {
            if (!data.stats.years) data.stats.years = text
          } else if (labelText.includes('award') || labelText.includes('certif') || labelText.includes('recogni')) {
            if (!data.stats.awards) data.stats.awards = text
          } else if (labelText.includes('rating') || labelText.includes('star') || labelText.includes('google rating')) {
            if (!data.stats.rating) data.stats.rating = text
          }
        }
      })

      // ── 6. ABOUT / OUR STORY ──
      const aboutSection = findSectionByHeading(['about', 'our story', 'who we are', 'our journey', 'our mission', 'welcome'])
      if (aboutSection) {
        const paras = aboutSection.querySelectorAll('p')
        const texts = []
        paras.forEach(p => {
          const t = p.textContent?.trim()
          if (t && t.length > 40) texts.push(t)
        })
        data.about = texts.slice(0, 3).join('\n\n')
      }

      // ── 7. SOCIAL LINKS ──
      const allLinks = document.querySelectorAll('a[href]')
      allLinks.forEach(a => {
        const href = a.href || ''
        if (href.includes('facebook.com') && !data.social.facebook) data.social.facebook = href
        if (href.includes('instagram.com') && !data.social.instagram) data.social.instagram = href
        if ((href.includes('twitter.com') || href.includes('x.com')) && !data.social.twitter) data.social.twitter = href
        if (href.includes('linkedin.com') && !data.social.linkedin) data.social.linkedin = href
        if (href.includes('youtube.com') && !data.social.youtube) data.social.youtube = href
      })

      // ── 8. MAP EMBED ──
      const mapIframe = document.querySelector('iframe[src*="google.com/maps"], iframe[src*="maps.google"]')
      if (mapIframe) {
        data.mapEmbedUrl = mapIframe.src || ''
      }

      return data
    }, baseUrl)

    Object.assign(result, pageData)

    // Try to find subpages (about, services, team, gallery) and scrape them too
    const subpageLinks = await page.evaluate((baseUrl) => {
      const links = {}
      const allAnchors = document.querySelectorAll('a[href]')
      allAnchors.forEach(a => {
        const href = a.href || ''
        const text = a.textContent?.toLowerCase()?.trim() || ''
        if (href.startsWith(baseUrl) || href.startsWith('/')) {
          if ((text.includes('about') || href.includes('/about')) && !links.about) links.about = href
          if ((text.includes('service') || text.includes('treatment') || href.includes('/service') || href.includes('/treatment')) && !links.services) links.services = href
          if ((text.includes('team') || text.includes('doctor') || href.includes('/team') || href.includes('/doctor')) && !links.team) links.team = href
          if ((text.includes('gallery') || text.includes('before') || href.includes('/gallery') || href.includes('/before')) && !links.gallery) links.gallery = href
          if ((text.includes('testimonial') || text.includes('review') || href.includes('/testimonial') || href.includes('/review')) && !links.testimonials) links.testimonials = href
        }
      })
      return links
    }, baseUrl)

    // Scrape subpages for data we didn't find on the homepage
    for (const [type, url] of Object.entries(subpageLinks)) {
      if (!url) continue

      // Skip if we already have enough data for this type
      if (type === 'about' && result.about) continue
      if (type === 'services' && result.services.length >= 2) continue
      if (type === 'team' && result.doctors.length >= 1) continue
      if (type === 'gallery' && result.gallery.length >= 1) continue
      if (type === 'testimonials' && result.testimonials.length >= 1) continue

      try {
        console.log('  [Website] Checking subpage:', type, url)
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await page.waitForTimeout(1500)

        const subData = await page.evaluate((baseUrl) => {
          const data = { services: [], doctors: [], gallery: [], testimonials: [], about: '' }

          function resolveUrl(src) {
            if (!src) return ''
            if (src.startsWith('http')) return src
            if (src.startsWith('//')) return 'https:' + src
            if (src.startsWith('/')) return baseUrl + src
            return baseUrl + '/' + src
          }

          // Services
          const svcCards = document.querySelectorAll('[class*="service"], [class*="treatment"], [class*="card"]')
          const seenSvc = new Set()
          svcCards.forEach(card => {
            const titleEl = card.querySelector('h2, h3, h4, h5, .title, [class*="title"]')
            const descEl = card.querySelector('p, [class*="desc"]')
            const imgEl = card.querySelector('img')
            const name = titleEl?.textContent?.trim()
            if (name && name.length > 2 && name.length < 100 && !seenSvc.has(name)) {
              seenSvc.add(name)
              data.services.push({
                name,
                description: descEl?.textContent?.trim()?.slice(0, 300) || '',
                image: resolveUrl(imgEl?.src || ''),
                tags: []
              })
            }
          })

          // Doctors
          const docCards = document.querySelectorAll('[class*="team"], [class*="doctor"], [class*="member"], [class*="card"]')
          const seenDoc = new Set()
          docCards.forEach(card => {
            const nameEl = card.querySelector('h2, h3, h4, h5, [class*="name"]')
            const roleEl = card.querySelector('p, [class*="role"], [class*="designation"], [class*="special"]')
            const imgEl = card.querySelector('img')
            const name = nameEl?.textContent?.trim()
            if (name && name.length > 3 && name.length < 80 && !seenDoc.has(name)) {
              const nameLower = name.toLowerCase()
              const hasNonPersonWord = [
                'technology', 'scanning', 'scan', 'visit', 'crown', 'canal', 'microscope',
                'imaging', 'cbct', 'stories', 'story', 'procedures', 'procedure', 'implants',
                'implant', 'tour', 'virtual', 'services', 'service', 'blog', 'recent', 'dentistry',
                'orthodontic', 'treatment', 'whitening', 'cleanup', 'clean', 'braces', 'aligner',
                'invisalign', 'denture', 'extraction', 'hygiene', 'therapy', 'fillings', 'laser',
                'cosmetic', 'restoration', 'preventive', 'pediatric', 'about', 'welcome', 'specialist',
                'excellence', 'care', 'studio', 'center', 'clinic', 'hospital'
              ].some(w => nameLower.includes(w))

              const isDoc = (nameLower.startsWith('dr') || nameLower.includes('dentist') || nameLower.includes('surgeon') || (name.split(' ').length >= 2 && name.length < 40)) && !hasNonPersonWord

              if (isDoc) {
                seenDoc.add(name)
                data.doctors.push({
                  name,
                  role: roleEl?.textContent?.trim()?.slice(0, 100) || '',
                  photo: resolveUrl(imgEl?.src || '')
                })
              }
            }
          })

          // Gallery images
          const galleryImgs = document.querySelectorAll('[class*="gallery"] img, [class*="portfolio"] img, [class*="before"] img, [class*="after"] img, .lightbox img')
          galleryImgs.forEach(img => {
            const src = resolveUrl(img.src || img.getAttribute('data-src') || '')
            if (src && !src.includes('icon') && !src.includes('logo')) {
              data.gallery.push({ type: 'photo', url: src, caption: img.alt || '' })
            }
          })

          // Testimonials
          const testiCards = document.querySelectorAll('[class*="testimonial"], [class*="review"], blockquote')
          const seenT = new Set()
          testiCards.forEach(card => {
            const quoteEl = card.querySelector('p, [class*="quote"], [class*="text"]')
            const nameEl = card.querySelector('[class*="name"], [class*="author"], h4, h5, cite, strong')
            const quote = quoteEl?.textContent?.trim()
            if (quote && quote.length > 20 && !seenT.has(quote.slice(0, 50))) {
              seenT.add(quote.slice(0, 50))
              data.testimonials.push({
                name: nameEl?.textContent?.trim() || 'Patient',
                role: '', photo: '',
                quote: quote.slice(0, 500)
              })
            }
          })

          // About
          const paras = document.querySelectorAll('p')
          const texts = []
          paras.forEach(p => {
            const t = p.textContent?.trim()
            if (t && t.length > 60) texts.push(t)
          })
          data.about = texts.slice(0, 3).join('\n\n')

          return data
        }, baseUrl)

        // Merge subpage data into result (only if we got more)
        if (type === 'services' && subData.services.length > result.services.length) result.services = subData.services
        if (type === 'team' && subData.doctors.length > result.doctors.length) result.doctors = subData.doctors
        if (type === 'gallery' && subData.gallery.length > result.gallery.length) result.gallery = subData.gallery
        if (type === 'testimonials' && subData.testimonials.length > result.testimonials.length) result.testimonials = subData.testimonials
        if (type === 'about' && subData.about.length > result.about.length) result.about = subData.about
      } catch (e) {
        console.log('  [Website] Subpage failed:', type, e.message)
      }
    }
  } catch (err) {
    console.log('  [Website] Failed to scrape:', err.message)
  }

  await browser.close()

  console.log('  [Website] Got:', result.services.length, 'services,', result.doctors.length, 'doctors,',
    result.gallery.length, 'gallery,', result.testimonials.length, 'testimonials')
  return result
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateSlug(name, city) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').trim()
  const cleanCity = city.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `${cleanName}-${cleanCity}`
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

if (require.main === module) {
  const url = process.argv[2]
  const mode = process.argv[3] || 'maps' // 'maps' or 'website'
  if (!url) {
    console.log('Usage: node scraper.js "URL" [maps|website]')
    process.exit(1)
  }
  const fn = mode === 'website' ? scrapeWebsite : scrapeClinic
  fn(url)
    .then(data => {
      console.log('\n--- SCRAPED DATA ---')
      console.log(JSON.stringify(data, null, 2))
    })
    .catch(err => console.error('Error:', err.message))
}

module.exports = { scrapeClinic, scrapeWebsite, generateSlug }
