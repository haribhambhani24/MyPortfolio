/**
 * Hari Bhambhani - Developer Portfolio Script
 * Handles typewriter mechanics, mobile navigation, accessible certificate lightbox,
 * scroll progress indicators, scroll-reveal animations, tactile copy feedback, and form UX.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Dynamic Typewriter Effect ---
  const words = [
    "OOP with Java.",
    "DSA.",
    "DBMS & SQL."
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typingText");

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeEffect() {
    if (!typingElement) return;

    if (prefersReducedMotion) {
      typingElement.textContent = words[0];
      return;
    }

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 35 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 450; // Pause before starting next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // --- 2. Mobile Navigation Drawer & Hamburger Toggle ---
  const navToggle = document.getElementById("navToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMobileNav() {
    if (!navToggle || !mobileNavDrawer) return;
    const isOpen = navToggle.classList.toggle("open");
    mobileNavDrawer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileNavDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMobileNav() {
    if (!navToggle || !mobileNavDrawer) return;
    navToggle.classList.remove("open");
    mobileNavDrawer.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileNavDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileNav);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Close mobile drawer when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileNavDrawer &&
      mobileNavDrawer.classList.contains("open") &&
      !mobileNavDrawer.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // --- 3. Navbar Sticky State, Scroll Progress, & Scroll-to-Top Button ---
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Feature detection for native CSS scroll timeline
  const hasNativeScrollTimeline = window.CSS && CSS.supports && CSS.supports("animation-timeline", "scroll()");

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Throttled scroll listener using requestAnimationFrame for smooth 60/120fps UX
  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Navbar shadow & blur
          if (navbar) {
            navbar.classList.toggle("scrolled", scrollY > 30);
          }

          // Scroll to top button visibility
          if (scrollTopBtn) {
            scrollTopBtn.classList.toggle("visible", scrollY > 350);
          }

          // Active nav highlight
          updateActiveNav();

          // Scroll progress fallback for browsers without CSS animation-timeline (e.g. Firefox)
          if (!hasNativeScrollTimeline && scrollProgressBar) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? scrollY / scrollable : 0;
            scrollProgressBar.style.transform = `scaleX(${progress})`;
          }

          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  // Initial call on load
  updateActiveNav();

  // --- 4. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported or reduced motion requested
    revealElements.forEach((el) => el.classList.add("active"));
  }

  // --- 5. Accessible Certificate Lightbox Modal (<dialog>) ---
  const certModal = document.getElementById("certModal");
  const certModalImg = document.getElementById("certModalImg");
  const certModalTitle = document.getElementById("certModalTitle");
  const certModalIssuer = document.getElementById("certModalIssuer");
  const certModalClose = document.getElementById("certModalClose");
  const certModalOpenNewTab = document.getElementById("certModalOpenNewTab");
  const certTriggers = document.querySelectorAll(".cert-modal-trigger");

  if (certModal && typeof certModal.showModal === "function") {
    certTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        // Let ctrl+click, command+click, or middle click open the image URL normally in new tab
        if (e.ctrlKey || e.metaKey || e.button === 1) return;

        e.preventDefault();
        const certSrc = trigger.getAttribute("data-cert-src") || trigger.getAttribute("href");
        const certTitle = trigger.getAttribute("data-cert-title") || "Certificate Preview";
        const certIssuer = trigger.getAttribute("data-cert-issuer") || "";

        if (certModalImg) {
          certModalImg.src = certSrc;
          certModalImg.alt = `${certTitle} Certificate`;
        }
        if (certModalTitle) certModalTitle.textContent = certTitle;
        if (certModalIssuer) certModalIssuer.textContent = certIssuer;
        if (certModalOpenNewTab) certModalOpenNewTab.href = certSrc;

        certModal.showModal();
        document.body.style.overflow = "hidden";
      });
    });

    function closeCertModal() {
      if (certModal.open) {
        certModal.close();
        document.body.style.overflow = "";
      }
    }

    if (certModalClose) {
      certModalClose.addEventListener("click", closeCertModal);
    }

    certModal.addEventListener("close", () => {
      document.body.style.overflow = "";
    });

    // Fallback light-dismiss for browsers without closedby="any" support
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      certModal.addEventListener("click", (event) => {
        if (event.target !== certModal) return;
        const rect = certModal.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isDialogContent) {
          closeCertModal();
        }
      });
    }
  }

  // --- 6. Toast Notification Utility ---
  const toastContainer = document.getElementById("toastContainer");

  function showToast(message, icon = "fa-solid fa-check-circle") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3200);
  }

  // --- 7. Copy to Clipboard with Tactile Feedback ---
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute("data-copy");

      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback method
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }

        // Tactile micro-interaction: turn icon into checkmark and glow green
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        btn.classList.add("copied");
        btn.setAttribute("title", "Copied!");

        showToast(`Copied to clipboard: ${textToCopy}`);

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("copied");
          btn.setAttribute("title", "Copy to clipboard");
        }, 2000);
      } catch (err) {
        showToast("Failed to copy text", "fa-solid fa-triangle-exclamation");
      }
    });
  });

  // --- 8. Form Character Counter & Interactive Submission ---
  const quickContactForm = document.getElementById("quickContactForm");
  const senderMessage = document.getElementById("senderMessage");
  const charCounter = document.getElementById("charCounter");
  const submitBtn = document.getElementById("submitBtn");

  if (senderMessage && charCounter) {
    const maxLength = parseInt(senderMessage.getAttribute("maxlength") || "500", 10);

    senderMessage.addEventListener("input", () => {
      const currentLength = senderMessage.value.length;
      charCounter.textContent = `${currentLength} / ${maxLength}`;

      if (currentLength >= maxLength * 0.95) {
        charCounter.className = "char-counter limit-reached";
      } else if (currentLength >= maxLength * 0.8) {
        charCounter.className = "char-counter limit-near";
      } else {
        charCounter.className = "char-counter";
      }
    });
  }

  if (quickContactForm) {
    quickContactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const senderName = document.getElementById("senderName")?.value.trim() || "Friend";
      const senderEmail = document.getElementById("senderEmail")?.value.trim() || "";
      const senderMessageVal = document.getElementById("senderMessage")?.value.trim() || "";

      if (!senderEmail || !senderMessageVal) {
        showToast("Please fill out all fields.", "fa-solid fa-circle-exclamation");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Opening email client...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      }

      const mailtoUrl = `mailto:haribhambhani24@gmail.com?subject=Inquiry from ${encodeURIComponent(senderName)}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\n${senderMessageVal}`)}`;

      showToast(`Thank you, ${senderName}! Opening your email client...`);

      setTimeout(() => {
        window.location.href = mailtoUrl;
        quickContactForm.reset();
        if (charCounter) charCounter.textContent = "0 / 500";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        }
      }, 700);
    });
  }
});