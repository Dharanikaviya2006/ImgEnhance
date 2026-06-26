document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // MOBILE MENU TOGGLE
  // ==========================

  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================
  // IMAGE FALLBACKS
  // ==========================
  const glow = document.body;

  let mouseTimeout;
  document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      glow.style.setProperty('--x', `${e.clientX}px`);
      glow.style.setProperty('--y', `${e.clientY}px`);
    }, 16);
  }, { passive: true });

  function createPlaceholder(role, scene = 'portrait') {
    const isAfter = role === 'after';

    const sceneConfig = {
      portrait: {
        titleBefore: 'Low-light Portrait',
        titleAfter: 'Enhanced Portrait',
        subtitleBefore: 'Soft facial detail and uneven contrast',
        subtitleAfter: 'Clear texture with balanced skin tones',
        backgroundBefore: '#171313',
        backgroundAfter: '#281100',
        glowBefore: '#5A4A46',
        glowAfter: '#F8A145',
        accentBefore: '#403733',
        accentAfter: '#F07900',
        shapeOne: "<circle cx='260' cy='220' r='92' fill='currentColor' fill-opacity='0.75' />",
        shapeTwo: "<rect x='400' y='170' width='170' height='220' rx='84' fill='currentColor' fill-opacity='0.45' />",
      },
      product: {
        titleBefore: 'Flat Product Shot',
        titleAfter: 'Studio Product Shot',
        subtitleBefore: 'Muted edges and weak material depth',
        subtitleAfter: 'Sharper form with cleaner highlights',
        backgroundBefore: '#141516',
        backgroundAfter: '#201103',
        glowBefore: '#53606A',
        glowAfter: '#F2A23B',
        accentBefore: '#3A454D',
        accentAfter: '#E97700',
        shapeOne: "<rect x='208' y='190' width='190' height='190' rx='30' fill='currentColor' fill-opacity='0.82' />",
        shapeTwo: "<rect x='438' y='218' width='112' height='134' rx='26' fill='currentColor' fill-opacity='0.48' />",
      },
      city: {
        titleBefore: 'Noisy Night Capture',
        titleAfter: 'Refined Night Capture',
        subtitleBefore: 'Blooming lights and visible grain',
        subtitleAfter: 'Cleaner skyline with controlled glow',
        backgroundBefore: '#10141B',
        backgroundAfter: '#1D1207',
        glowBefore: '#526274',
        glowAfter: '#FFB04A',
        accentBefore: '#34485C',
        accentAfter: '#F07F10',
        shapeOne:
          "<rect x='128' y='234' width='70' height='168' rx='16' fill='currentColor' fill-opacity='0.74' /><rect x='222' y='196' width='88' height='206' rx='18' fill='currentColor' fill-opacity='0.84' /><rect x='334' y='154' width='98' height='248' rx='18' fill='currentColor' fill-opacity='0.72' /><rect x='460' y='212' width='78' height='190' rx='18' fill='currentColor' fill-opacity='0.8' /><rect x='564' y='180' width='110' height='222' rx='18' fill='currentColor' fill-opacity='0.68' />",
        shapeTwo: "<circle cx='600' cy='160' r='48' fill='white' fill-opacity='0.12' />",
      },
      landscape: {
        titleBefore: 'Washed Landscape',
        titleAfter: 'Recovered Landscape',
        subtitleBefore: 'Flat horizon and reduced local contrast',
        subtitleAfter: 'Deeper layers with richer tonal range',
        backgroundBefore: '#151917',
        backgroundAfter: '#201406',
        glowBefore: '#60715E',
        glowAfter: '#F7B355',
        accentBefore: '#425342',
        accentAfter: '#E88514',
        shapeOne:
          "<path d='M0 390L170 250L320 338L470 242L640 326L800 238V600H0Z' fill='currentColor' fill-opacity='0.66' />",
        shapeTwo:
          "<path d='M0 470L138 384L278 436L420 352L585 424L800 328V600H0Z' fill='#0E0E0E' fill-opacity='0.9' />",
      },
    };

    const currentScene = sceneConfig[scene] || sceneConfig.portrait;

    const title = isAfter ? currentScene.titleAfter : currentScene.titleBefore;
    const subtitle = isAfter ? currentScene.subtitleAfter : currentScene.subtitleBefore;
    const score = isAfter ? '98%' : '63%';

    const background = isAfter ? currentScene.backgroundAfter : currentScene.backgroundBefore;
    const glowColor = isAfter ? currentScene.glowAfter : currentScene.glowBefore;
    const accent = isAfter ? currentScene.accentAfter : currentScene.accentBefore;

    const blurFilter = isAfter
      ? ''
      : "<filter id='soft'><feGaussianBlur stdDeviation='7' /></filter>";
    const blurStart = isAfter ? '' : "<g filter='url(#soft)'>";
    const blurEnd = isAfter ? '' : '</g>';

    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
        <defs>
          <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='${background}' />
            <stop offset='100%' stop-color='#050505' />
          </linearGradient>
          <linearGradient id='panel' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='#FFFFFF' stop-opacity='0.12' />
            <stop offset='100%' stop-color='#FFFFFF' stop-opacity='0.02' />
          </linearGradient>
          ${blurFilter}
        </defs>

        <rect width='800' height='600' fill='url(#bg)' />
        <circle cx='605' cy='170' r='92' fill='${glowColor}' fill-opacity='0.45' />
        <rect x='48' y='48' width='704' height='504' rx='34' fill='url(#panel)' stroke='#FFFFFF' stroke-opacity='0.1' />

        ${blurStart}
        <path d='M0 425L170 260L325 360L520 210L800 430V600H0Z' fill='${accent}' fill-opacity='0.55' />
        <path d='M0 500L170 360L352 418L520 312L800 470V600H0Z' fill='#111111' />
        <g style='color:${isAfter ? accent : '#262626'};'>
          ${currentScene.shapeOne}
          ${currentScene.shapeTwo}
        </g>
        ${blurEnd}

        <rect x='88' y='92' width='150' height='32' rx='16' fill='#FFFFFF' fill-opacity='0.12' />
        <text x='112' y='114' fill='white' font-size='19' font-family='Source Sans Pro, sans-serif'>${
          isAfter ? 'OPTIMIZED OUTPUT READY' : 'RAW INPUT'
        }</text>
        <text x='88' y='168' fill='white' font-size='42' font-family='Source Sans Pro, sans-serif'>${title}</text>
        <text x='88' y='208' fill='#E0E0E0' font-size='24' font-family='Source Sans Pro, sans-serif'>${subtitle}</text>
        <text x='88' y='500' fill='${isAfter ? '#F8A145' : '#B7B7B7'}' font-size='56' font-family='Source Sans Pro, sans-serif'>${score}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const placeholderImages = {
    portrait: {
      before: createPlaceholder('before', 'portrait'),
      after: createPlaceholder('after', 'portrait'),
    },
    product: {
      before: createPlaceholder('before', 'product'),
      after: createPlaceholder('after', 'product'),
    },
    city: {
      before: createPlaceholder('before', 'city'),
      after: createPlaceholder('after', 'city'),
    },
    landscape: {
      before: createPlaceholder('before', 'landscape'),
      after: createPlaceholder('after', 'landscape'),
    },
  };

  document.querySelectorAll('img[data-role]').forEach((image) => {
    const role = image.dataset.role === 'after' ? 'after' : 'before';
    const scene = image.dataset.scene || 'portrait';

    const fallback = () => {
      if (image.dataset.fallbackApplied === 'true') return;
      image.dataset.fallbackApplied = 'true';
      image.onerror = null;
      image.src = placeholderImages[scene]?.[role] || placeholderImages.portrait[role];
    };

    image.addEventListener('error', () => {
      console.error('Failed to load image:', image.src);
      fallback();
    }, { once: true });

    // Apply fallback for missing/invalid src
    if (!image.getAttribute('src')) fallback();
    if (image.complete && image.naturalWidth === 0) fallback();
  });

  // ==========================
  // DEMO COMPARISON (tabs + thumbnails)
  // ==========================

  const demoData = {
    portrait: {
      before: 'portraitbefore.jpg',
      after: 'portraitafter.jpg',
    },
    landscape: {
      before: 'Landscapebefore.jpg',
      after: 'landscapeafter.jpg',
    },
    oldphoto: {
      before: 'oldbefore.jpg',
      after: 'oldafter.jpg',
    },
    product: {
      before: 'productbefore.jpg',
      after: 'Productafter.jpg',
    },
    nature: {
      before: 'before.jpg',
      after: 'after.jpg',
    },
  };

  const activeComparison = document.querySelector(
    '.comparison-container.he5-comparison[data-workspace]'
  );
  const studioTabs = Array.from(document.querySelectorAll('.studio-tab[data-scene-tab]'));
  const studioPresets = Array.from(document.querySelectorAll('.preset-card[data-preset]'));
  const mobileComparisonQuery = window.matchMedia('(max-width: 768px)');
  const isMobileComparison = () => mobileComparisonQuery.matches;

  function syncMobilePresetImages() {
    studioPresets.forEach((btn) => {
      const img = btn.querySelector('img');
      if (!img) return;

      if (isMobileComparison()) {
        const currentSrc = img.getAttribute('src');
        if (currentSrc) img.dataset.mobileSrc = currentSrc;
        img.removeAttribute('src');
        img.removeAttribute('srcset');
        img.setAttribute('loading', 'lazy');
        return;
      }

      if (img.dataset.mobileSrc && !img.getAttribute('src')) {
        img.setAttribute('src', img.dataset.mobileSrc);
      }
    });
  }

  syncMobilePresetImages();
  mobileComparisonQuery.addEventListener('change', syncMobilePresetImages);

  const SCENE_KEYS = ['portrait', 'landscape', 'oldphoto', 'product', 'nature'];

  function topTabKeyFromScene(sceneKey) {
    // HTML uses: portrait, landscape, city, product
    if (sceneKey === 'oldphoto') return 'city';
    return sceneKey;
  }

  function sceneFromTopTabDatasetSceneKey(sceneTabKey) {
    // HTML uses city -> Old Photo
    if (sceneTabKey === 'city') return 'oldphoto';
    return sceneTabKey;
  }

  function sceneFromThumbnailPreset(presetKey) {
    // HTML uses city -> Old Photo
    if (presetKey === 'city') return 'oldphoto';
    if (presetKey === 'portrait') return 'portrait';
    if (presetKey === 'landscape') return 'landscape';
    if (presetKey === 'product') return 'product';
    if (presetKey === 'nature') return 'nature';
    return 'portrait';
  }

  if (activeComparison && studioTabs.length && studioPresets.length) {
    const afterImg = activeComparison.querySelector('img[data-workspace-after]');
    const beforeWrap = activeComparison.querySelector('.before-image-wrapper[data-workspace-before]');
    const beforeImg = activeComparison.querySelector('img[data-workspace-before-img]');
    const range = activeComparison.querySelector('.comparison-range');
    

    let startX;
let startY;

range.addEventListener("touchstart",(e)=>{
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
},{passive:true});

range.addEventListener("touchmove",(e)=>{
    const dx=Math.abs(e.touches[0].clientX-startX);
    const dy=Math.abs(e.touches[0].clientY-startY);

    if(dy>dx){
        return;   // Allow normal page scrolling
    }

    // Slider update code here
});

    if (afterImg && beforeImg) {
      // Ensure slider exists before we try to preserve it
      const preserveSliderValue = () => (range ? Number(range.value) : 50);

      let currentScene = 'portrait';

      function setTabAndThumbnailActive(sceneKey) {
        // Top tabs
        studioTabs.forEach((t) => {
          const tabKey = t.dataset.sceneTab;
          const expectedTabKey = topTabKeyFromScene(sceneKey);
          t.classList.toggle('is-active', tabKey === expectedTabKey);
        });

        // Thumbnails
        studioPresets.forEach((btn) => {
          const presetKey = btn.dataset.preset;
          const btnScene = sceneFromThumbnailPreset(presetKey);
          btn.classList.toggle('is-selected', btnScene === sceneKey);
          btn.setAttribute('aria-selected', btnScene === sceneKey ? 'true' : 'false');
        });
      }

      function setSceneImages(sceneKey) {
        const preset = demoData[sceneKey] || demoData.portrait;

        // Mobile dynamic height switching (CSS driven by data attribute)
        if (activeComparison && isMobileComparison()) {
          activeComparison.dataset.mobileScene = sceneKey;
        }

        // Preserve divider position without recreating slider
        if (range) {
          const next = preserveSliderValue();
          range.value = next;
          range.dispatchEvent(new Event('input', { bubbles: true }));
        }


        // Fade out current images
        beforeImg.style.transition = 'opacity 300ms ease';
        afterImg.style.transition = 'opacity 300ms ease';
        beforeImg.style.opacity = '0';
        afterImg.style.opacity = '0';

        // Swap sources after a tick to allow transition to apply
        window.setTimeout(() => {
          beforeImg.onerror = () => {
            console.error('Failed to load image:', beforeImg.src);
          };
          afterImg.onerror = () => {
            console.error('Failed to load image:', afterImg.src);
          };

          beforeImg.src = preset.before;
          afterImg.src = preset.after;

          // Keep data-scene in sync for fallback logic
          beforeImg.dataset.scene = sceneKey;
          beforeImg.setAttribute('data-scene', sceneKey);
          afterImg.dataset.scene = sceneKey;
          afterImg.setAttribute('data-scene', sceneKey);
          if (beforeWrap) beforeWrap.dataset.scene = sceneKey;
        }, 0);

        // Fade back in
        window.setTimeout(() => {
          beforeImg.style.opacity = '1';
          afterImg.style.opacity = '1';
        }, 300);
      }

      async function applyDemoScene(sceneKey) {
        const safeKey = SCENE_KEYS.includes(sceneKey) ? sceneKey : 'portrait';
        currentScene = safeKey;

        setTabAndThumbnailActive(safeKey);
        setSceneImages(safeKey);

        if (isMobileComparison()) return;

        // Preload (helps desktop performance and avoids brief blank)
        const preset = demoData[safeKey];
        const preload = (src) => new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => {
            console.error('Failed to load image:', src);
            resolve(false);
          };
          img.src = src;
        });
        await Promise.all([preload(preset.before), preload(preset.after)]);
      }

      // Wire top tabs
      studioTabs.forEach((tab) => {
        tab.addEventListener('click', async () => {
          const sceneKey = sceneFromTopTabDatasetSceneKey(tab.dataset.sceneTab);
          await applyDemoScene(sceneKey);
        });
      });

      // Wire thumbnails
      studioPresets.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const sceneKey = sceneFromThumbnailPreset(btn.dataset.preset);
          await applyDemoScene(sceneKey);
        });
      });

      // Default active scene = Portrait
      applyDemoScene('portrait').then(() => {
        // Ensure correct mobile height on load
        if (activeComparison && isMobileComparison()) {
          activeComparison.dataset.mobileScene = 'portrait';
        }
      });

    }
  }

  // ==========================
  // FAQ ACCORDION (HE5)
  // ==========================
  (function initFaqAccordion() {
    const faqRoot = document.getElementById('faq');
    if (!faqRoot) return;

    const items = Array.from(faqRoot.querySelectorAll('.faq-item'));
    if (!items.length) return;

    const closeAll = () => {
      items.forEach((item) => {
        const btn = item.querySelector('.faq-question');
        const ans = item.querySelector('.faq-answer');
        item.classList.remove('active');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (ans) ans.setAttribute('aria-hidden', 'true');
      });
    };

    items.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      const ans = item.querySelector('.faq-answer');
      if (!btn || !ans) return;

      if (!btn.id) btn.id = `faq-q-${Math.random().toString(16).slice(2)}`;
      if (!ans.id) ans.id = `faq-a-${Math.random().toString(16).slice(2)}`;

      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-controls', ans.id);
      btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      ans.setAttribute('role', 'region');
      ans.setAttribute('aria-hidden', item.classList.contains('active') ? 'false' : 'true');

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        if (isOpen) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          ans.setAttribute('aria-hidden', 'true');
          return;
        }

        closeAll();
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        ans.setAttribute('aria-hidden', 'false');
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    const activeItems = items.filter((i) => i.classList.contains('active'));
    if (activeItems.length > 1) {
      closeAll();
      activeItems[0].classList.add('active');
    }
  })();

  // ==========================
  // BEFORE / AFTER SLIDER
  // (Keep existing slider window; switching only updates image src)
  // ==========================

  document.querySelectorAll('.comparison-container').forEach((comparisonContainer) => {
    const slider = comparisonContainer.querySelector('.comparison-range');
    const beforeImage = comparisonContainer.querySelector('.before-image-wrapper');
    const comparisonDivider = comparisonContainer.querySelector('.comparison-divider');

    if (!slider || !beforeImage || !comparisonDivider) return;

    let isDragging = false;
    let resizeObserver;
    let dragStartX = 0;
    let dragStartY = 0;

    const updateComparison = (value) => {
      const safeValue = Math.min(100, Math.max(0, Number(value)));
      beforeImage.style.clipPath = `inset(0 ${100 - safeValue}% 0 0)`;
      comparisonDivider.style.left = safeValue + '%';
      slider.value = safeValue;
    };

    const setSliderFromPosition = (clientX) => {
      const rect = comparisonContainer.getBoundingClientRect();
      const percentage = ((clientX - rect.left) / rect.width) * 100;
      updateComparison(percentage);
    };

    const stopDragging = () => {
      isDragging = false;
      comparisonContainer.classList.remove('dragging');
    };

    updateComparison(slider.value);

    slider.addEventListener('input', () => {
      updateComparison(slider.value);
    });

    comparisonContainer.addEventListener('pointerdown', (event) => {
      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      comparisonContainer.classList.add('dragging');
      comparisonContainer.setPointerCapture(event.pointerId);
      setSliderFromPosition(event.clientX);
    });

    const handlePointermove = (event) => {
      if (!isDragging) return;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;

      if (isMobile && event.pointerType === 'touch' && Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }

      if (isMobile && event.pointerType === 'touch') {
        event.preventDefault();
      } else if (event.pointerType !== 'touch') {
        event.preventDefault();
      }

      const rect = comparisonContainer.getBoundingClientRect();
      let percentage = ((event.clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      updateComparison(percentage);
    };

    comparisonContainer.addEventListener('pointerup', stopDragging);
    comparisonContainer.addEventListener('pointercancel', stopDragging);

    // Use ResizeObserver instead of window resize for better performance
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        updateComparison(slider.value);
      });
      resizeObserver.observe(comparisonContainer);
    } else {
      window.addEventListener('resize', () => {
        updateComparison(slider.value);
      });
    }

    window.addEventListener('pointermove', handlePointermove);
  });

  // ==========================
  // STATS INDICATOR: animate only once (premium)
  // ==========================
  const statsRoot = document.getElementById('real-performance-impact');
  if (statsRoot) {
    const onceAnimate = () => {
      if (!statsRoot.classList.contains('is-animated')) {
        statsRoot.classList.add('is-animated');
      }
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            onceAnimate();
            obs.disconnect();
          }
        });
      }, { threshold: 0.15 });
      obs.observe(statsRoot);
    } else {
      onceAnimate();
    }
  }

  // ==========================
  // Optimization Results slider
  // ==========================
  const sliderRoot = document.querySelector('[data-slider]');
  if (sliderRoot) {
    const slides = Array.from(sliderRoot.querySelectorAll('.he5-optimization-showcase__slide'));
    let idx = slides.findIndex((s) => s.classList.contains('is-active'));
    if (idx < 0) idx = 0;

    const setActive = (nextIndex) => {
      slides.forEach((s, i) => {
        if (i === nextIndex) s.classList.add('is-active');
        else s.classList.remove('is-active');
      });
    };

    let timer = null;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => {
        idx = (idx + 1) % slides.length;
        setActive(idx);
      }, 5000);
    };

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    sliderRoot.addEventListener('mouseenter', stop);
    sliderRoot.addEventListener('mouseleave', start);
    start();
  }

  // ==========================
  // COUNTER ANIMATION
  // ==========================
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter) => {
    if (!counter || !counter.dataset.target) return;
    
    const target = Number(counter.dataset.target);
    if (isNaN(target)) return;
    
    let count = 0;
    let animationId;

    const updateCounter = () => {
      const increment = Math.ceil(target / 100);

      if (count < target) {
        count += increment;
        if (count > target) count = target;
        counter.textContent = count;
        animationId = setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });

  // ==========================
  // FADE-IN ANIMATION
  // ==========================
  const fadeItems = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeItems.forEach((item) => revealObserver.observe(item));
  } else {
    fadeItems.forEach((item) => item.classList.add('visible'));
  }

  // ==========================
  // CONTACT FORM
  // ==========================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message Sent Successfully!');
      contactForm.reset();
    });
  }

  // ==========================
  // SMOOTH SCROLL (guarded; never blocks when target missing)
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      // Active navigation (used to add/remove class only; keeps existing design intact)
      const isFeaturesNav = link && link.getAttribute && link.getAttribute('data-nav') === 'features';
      if (isFeaturesNav) {
        document.querySelectorAll('.nav-links a[data-nav="features"]').forEach((a) => a.classList.add('is-active'));
      } else {
        document.querySelectorAll('.nav-links a[data-nav="features"]').forEach((a) => a.classList.remove('is-active'));
      }

      const targetSelector = link.getAttribute('href');
      if (!targetSelector || targetSelector === '#') return;

      const target = document.querySelector(targetSelector);
      if (!target) return; // do not preventDefault() if we can't navigate/scroll

      e.preventDefault();

      // If mobile menu is open, close it before navigating.
      const menuBtn = document.getElementById('menuBtn');
      const navLinks = document.querySelector('.nav-links');
      if (menuBtn && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }

      // Ensure fixed-header offset doesn't leave content hidden.
      // (CSS scroll-margin-top handles positioning, but this guarantees correct hash target for edge cases.)
      if (isFeaturesNav) {
        const realImpact = document.getElementById('real-performance-impact');
        if (realImpact) realImpact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const header = document.querySelector('header');
      const headerOffset = header ? header.offsetHeight + 12 : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    });
  });

  // ==========================
  // CURRENT YEAR IN FOOTER
  // ==========================
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    const year = new Date().getFullYear();
    copyright.innerHTML = `&copy; ${year} All Rights Reserved.`;
  }

  // ==========================
  // MOBILE ACCORDION FUNCTIONALITY
  // ==========================
  const accordionItems = document.querySelectorAll('.accordion-item');
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      
      const currentItem = header.closest('.accordion-item');
      if (!currentItem) return;

      const isCurrentActive = currentItem.classList.contains('active');

      // Close all accordion items
      accordionItems.forEach((item) => {
        item.classList.remove('active');
        const itemHeader = item.querySelector('.accordion-header');
        if (itemHeader) {
          itemHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Open clicked item if it wasn't already open
      if (!isCurrentActive) {
        currentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  console.log('Image Optimization Website Loaded Successfully');
});
