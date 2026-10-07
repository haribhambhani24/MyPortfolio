/**
 * Hari Bhambhani - Developer Portfolio Script
 * Handles typewriter mechanics, mobile navigation, cursor tracking,
 * scroll-reveal animations, copy-to-clipboard actions, and form handling.
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

  function typeEffect() {
    if (!typingElement) return;

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

  // --- 3. Navbar Sticky State & Scroll-to-Top Button ---
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Navbar shadow & darker blur on scroll
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Scroll to Top Button Visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- 4. ScrollSpy (Active Navigation Highlighting) ---
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

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

  window.addEventListener("scroll", updateActiveNav);

  // --- 5. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
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
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add("active"));
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

  // --- 7. Copy to Clipboard Functionality ---
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

        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast("Failed to copy text", "fa-solid fa-triangle-exclamation");
      }
    });
  });

  // --- 8. Interactive Quick Contact Form Handler ---
  const quickContactForm = document.getElementById("quickContactForm");

  if (quickContactForm) {
    quickContactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const senderName = document.getElementById("senderName")?.value || "Friend";
      const senderEmail = document.getElementById("senderEmail")?.value || "";
      const senderMessage = document.getElementById("senderMessage")?.value || "";

      if (!senderEmail || !senderMessage) {
        showToast("Please fill out all fields.", "fa-solid fa-circle-exclamation");
        return;
      }

      // Construct mailto link for direct sending
      const mailtoUrl = `mailto:haribhambhani24@gmail.com?subject=Inquiry from ${encodeURIComponent(senderName)}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\n${senderMessage}`)}`;

      showToast(`Thank you, ${senderName}! Opening your email client...`);

      setTimeout(() => {
        window.location.href = mailtoUrl;
        quickContactForm.reset();
      }, 800);
    });
  }
});