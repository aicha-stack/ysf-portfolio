document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isTouch) {
    document.body.classList.add("touch-device");
  }

  /* =========================
     PANELS
  ========================= */
  const panelButtons = document.querySelectorAll("[data-panel]");
  const panels = document.querySelectorAll(".panel");
  const closePanelButtons = document.querySelectorAll(".close-panel");

  panelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.getAttribute("data-panel");
      const panel = document.getElementById(panelId);

      if (panel) {
        panel.classList.add("active");
        document.body.classList.add("no-scroll");
      }
    });
  });

  closePanelButtons.forEach((button) => {
    button.addEventListener("click", closeAllPanels);
  });

  panels.forEach((panel) => {
    panel.addEventListener("click", (event) => {
      if (event.target === panel) {
        closeAllPanels();
      }
    });
  });

  function closeAllPanels() {
    panels.forEach((panel) => {
      panel.classList.remove("active");
    });

    document.body.classList.remove("no-scroll");

    document.querySelectorAll(".panel video").forEach((video) => {
      video.pause();
    });
  }

  /* =========================
     IMAGE MODAL
  ========================= */
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeImageButton = document.querySelector(".close-image");
  const projectImages = document.querySelectorAll(".project-card img");

  if (imageModal && modalImage && closeImageButton) {
    projectImages.forEach((image) => {
      image.addEventListener("click", () => {
        imageModal.classList.add("active");
        modalImage.src = image.src;
        document.body.classList.add("no-scroll");
      });
    });

    closeImageButton.addEventListener("click", closeImageModal);

    imageModal.addEventListener("click", (event) => {
      if (event.target === imageModal) {
        closeImageModal();
      }
    });
  }

  function closeImageModal() {
    if (!imageModal || !modalImage) return;

    imageModal.classList.remove("active");
    modalImage.src = "";

    const activePanel = document.querySelector(".panel.active");

    if (!activePanel) {
      document.body.classList.remove("no-scroll");
    }
  }

  /* =========================
     FAQ BOT
  ========================= */
  const faqBotToggle = document.getElementById("faqBotToggle");
  const faqBotBox = document.getElementById("faqBotBox");
  const faqBotClose = document.getElementById("faqBotClose");
  const faqBotForm = document.getElementById("faqBotForm");
  const faqBotInput = document.getElementById("faqBotInput");
  const faqBotMessages = document.getElementById("faqBotMessages");

  const answers = [
    {
      keywords: [
        "service",
        "services",
        "what do you do",
        "travail",
        "خدمات",
        "شنو كتدير",
        "شنو الخدمات"
      ],
      answer:
        "Youssef offers graphic design, landing pages, YouTube thumbnails, e-commerce visuals, social media ads, video editing, short-form videos, AI visuals, voiceovers, audio mixing and mastering."
    },
    {
      keywords: [
        "video",
        "videos",
        "montage",
        "editing",
        "reels",
        "tiktok",
        "shorts",
        "promo"
      ],
      answer:
        "Yes, Youssef works on video editing, TikTok/Reels/Shorts content, promotional videos, cinematic color grading, VFX, sound design and viral scriptwriting."
    },
    {
      keywords: [
        "design",
        "graphic",
        "photoshop",
        "thumbnail",
        "poster",
        "landing page",
        "image",
        "images",
        "artwork"
      ],
      answer:
        "Youssef creates landing pages, YouTube thumbnails, e-commerce visuals, social media ads, posters, artworks, photo manipulation, retouching and color correction."
    },
    {
      keywords: [
        "ai",
        "ia",
        "artificial intelligence",
        "runway",
        "midjourney",
        "leonardo",
        "krea",
        "elevenlabs"
      ],
      answer:
        "Youssef uses AI tools such as Runway.ai, Leonardo.ai, Krea.ai, Midjourney and ElevenLabs to create modern visual and audio content faster."
    },
    {
      keywords: ["tools", "software", "outils", "logiciels", "programs"],
      answer:
        "His main tools are Adobe Photoshop, Adobe Premiere Pro, CapCut, FL Studio, Mixcraft, Runway.ai, Krea.ai, Leonardo.ai, Midjourney and ElevenLabs."
    },
    {
      keywords: [
        "experience",
        "years",
        "expérience",
        "ans",
        "chhal",
        "how many years"
      ],
      answer:
        "Youssef has 6 years of experience in graphic design and 6 years of experience in video production."
    },
    {
      keywords: [
        "tiktok",
        "followers",
        "likes",
        "social media",
        "results",
        "résultats"
      ],
      answer:
        "Youssef independently grew a TikTok channel to 32K+ followers and more than 2M+ likes."
    },
    {
      keywords: ["contact", "email", "phone", "whatsapp", "message", "call"],
      answer:
        "You can contact Youssef by email at youssefounissi48@gmail.com, by phone at +212 609-380837, or through WhatsApp."
    },
    {
      keywords: [
        "location",
        "where",
        "city",
        "agadir",
        "morocco",
        "maroc",
        "فين"
      ],
      answer:
        "Youssef is based in Agadir, Morocco, and can work remotely with brands, creators and artists."
    },
    {
      keywords: ["cv", "resume", "download", "télécharger"],
      answer:
        "You can download Youssef’s professional CV as PDF from the Download CV button, or open the CV panel for a quick overview."
    },
    {
      keywords: ["hello", "hi", "salam", "bonjour", "salut"],
      answer:
        "Hi! I’m Youssef’s portfolio assistant. Ask me about his services, skills, tools, videos, images, CV or contact information."
    }
  ];

  if (faqBotToggle && faqBotBox) {
    faqBotToggle.addEventListener("click", () => {
      faqBotBox.classList.toggle("open");
    });
  }

  if (faqBotClose && faqBotBox) {
    faqBotClose.addEventListener("click", () => {
      faqBotBox.classList.remove("open");
    });
  }

  if (faqBotForm && faqBotInput && faqBotMessages) {
    faqBotForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const question = faqBotInput.value.trim();

      if (!question) return;

      addFaqMessage(question, "user");
      faqBotInput.value = "";

      setTimeout(() => {
        const answer = getAnswer(question);
        addFaqMessage(answer, "bot");
      }, 400);
    });
  }

  function getAnswer(question) {
    const cleanQuestion = question.toLowerCase();

    const found = answers.find((item) =>
      item.keywords.some((keyword) =>
        cleanQuestion.includes(keyword.toLowerCase())
      )
    );

    if (found) {
      return found.answer;
    }

    return "I can answer questions about Youssef’s portfolio, services, images, videos, skills, tools, CV and contact information.";
  }

  function addFaqMessage(text, type) {
    if (!faqBotMessages) return;

    const message = document.createElement("div");
    message.className = `faq-message ${type}`;
    message.textContent = text;

    faqBotMessages.appendChild(message);
    faqBotMessages.scrollTop = faqBotMessages.scrollHeight;
  }

  /* =========================
     ESC CLOSE
  ========================= */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeImageModal();
      closeAllPanels();

      if (faqBotBox) {
        faqBotBox.classList.remove("open");
      }
    }
  });

  /* =========================
     HEADER SCROLL STATE
  ========================= */
  const siteHeader = document.getElementById("siteHeader");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main, section[id]");

  function updateHeader() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 40);
  }

  function updateActiveNav() {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) {
        current = section.id || current;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${current}`);
    });
  }

  window.addEventListener("scroll", () => {
    updateHeader();
    updateActiveNav();
  }, { passive: true });

  updateHeader();
  updateActiveNav();

  /* =========================
     SCROLL REVEAL
  ========================= */
  const revealItems = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* =========================
     STAT COUNTERS
  ========================= */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      const target = counter.getAttribute("data-count") || "0";
      const suffix = counter.getAttribute("data-suffix") || "";
      counter.textContent = `${target}${suffix}`;
    });
  }

  /* =========================
     CUSTOM CURSOR
  ========================= */
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (!isTouch && !reduceMotion && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!visible) {
        cursorDot.classList.add("visible");
        cursorRing.classList.add("visible");
        visible = true;
      }

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", moveCursor, { passive: true });
    animateRing();

    const hoverTargets = document.querySelectorAll(
      "a, button, .project-card, .choice-card, .floating-card, .tools-list span"
    );

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
      target.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
    });
  } else {
    document.body.classList.add("no-custom-cursor");
  }

  /* =========================
     MAGNETIC BUTTONS
  ========================= */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".magnetic:not(.tilt-card)").forEach((el) => {
      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* =========================
     FLOATING CARD PARALLAX
  ========================= */
  const floatingCards = document.querySelectorAll(".floating-card");
  const hero = document.querySelector(".hero");

  if (!isTouch && !reduceMotion && hero && floatingCards.length) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener(
      "mousemove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      },
      { passive: true }
    );

    hero.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      floatingCards.forEach((card) => {
        const depth = Number(card.getAttribute("data-depth")) || 0.04;
        const x = currentX * depth * 120;
        const y = currentY * depth * 90;
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      requestAnimationFrame(animateParallax);
    };

    animateParallax();
  }

  /* =========================
     PAGE LOADER
  ========================= */
  const pageLoader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      if (pageLoader) pageLoader.classList.add("done");
    }, reduceMotion ? 0 : 700);
  });

  // Safety fallback if load is delayed
  setTimeout(() => {
    document.body.classList.remove("is-loading");
    if (pageLoader) pageLoader.classList.add("done");
  }, 2500);

  if (reduceMotion) {
    document.body.classList.remove("is-loading");
    if (pageLoader) pageLoader.classList.add("done");
  }

  /* =========================
     SCROLL PROGRESS
  ========================= */
  const scrollProgress = document.getElementById("scrollProgress");

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    scrollProgress.style.width = `${value}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* =========================
     SPLIT TEXT
  ========================= */
  if (!reduceMotion) {
    document.querySelectorAll("[data-split]").forEach((line) => {
      const text = line.textContent || "";
      line.textContent = "";
      [...text].forEach((char, index) => {
        const span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--i", String(index));
        span.textContent = char === " " ? "\u00A0" : char;
        line.appendChild(span);
      });
    });
  }

  /* =========================
     BUTTON RIPPLE
  ========================= */
  document.querySelectorAll(".main-btn, .choice-card, .contact-links a").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      if (reduceMotion) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* =========================
     3D TILT + SPOTLIGHT
  ========================= */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 14;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
