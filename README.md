# Hari Bhambhani - Personal Portfolio

A fast, responsive, and accessible personal portfolio website built with modern HTML5, CSS3, and JavaScript. Designed to showcase my engineering coursework (Java, Data Structures & Algorithms, DBMS & SQL), coursework projects, hackathon achievements, and background as a 2nd-year Computer Engineering undergraduate at VESIT, Mumbai.

---

## 🌟 Live Demo
👉 **[View Portfolio](https://haribhambhani24.github.io/MyPortfolio/)**

---

## 💻 Tech Stack & Standards
- **Markup**: Semantic HTML5 with accessibility best practices (ARIA roles, keyboard skip links, native `<dialog>`)
- **Styling**: Vanilla CSS3 (Custom properties / theme tokens, Flexbox, CSS Grid, scroll-driven animations, backdrop blur)
- **Logic**: Modern Vanilla JavaScript (IntersectionObserver, Dialog API, throttled requestAnimationFrame, Clipboard API)
- **Typography & Icons**: Google Fonts (*Inter*, *Fira Code*), FontAwesome 6.5
- **Performance**: Zero external JavaScript frameworks, LCP image priority hints, zero Cumulative Layout Shift (CLS)

---

## 🚀 Key Features & UX Highlights

- **Dynamic Hero Section**:
  - Interactive typewriter effect cycling through core study domains (*OOP with Java*, *DSA*, *DBMS & SQL*).
  - Respects user accessibility preferences (`prefers-reduced-motion`).
  - Direct access to download/view resume (`Hari_Bhambhani_Resume.pdf`).

- **Academic & Personal Projects**:
  - *Personal Portfolio Website*: Built with HTML5, CSS3, and JavaScript.
  - *Attendance Tracker*: Upcoming coursework project automating attendance records and threshold alerts using Java and SQL.

- **Technical Skills**:
  - **Core Fundamentals**: Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Database Management (DBMS).
  - **Programming Languages**: Java (Core & OOP), SQL (Relational Queries).
  - **Web Basics**: HTML5, CSS3 & Flexbox.
  - **Developer Tools**: Git, GitHub, VS Code, Chrome DevTools.

- **Certifications & Hackathons (with In-Page Lightbox Modal)**:
  - *Hack-AI-Thon 4.0* (Certificate of Achievement, AI-CoLegion VESIT).
  - *SYRUS Hackathon (MARCH 2026)* (Certificate of Participation, CodeCell++ VESIT).
  - **Native Lightbox Modal (`<dialog>`)**: Clicking any certificate opens an in-page preview with verified credentials, light-dismiss (clicking outside or pressing <kbd>Esc</kbd>), and direct link to view full-resolution files.

- **Interactive Quick Connect**:
  - **Tactile Copy Feedback**: One-click copy for Phone and Email with immediate icon morphing (emerald checkmark), tooltip confirmation, and floating toast notifications.
  - **Contact Form**: Direct `mailto:` message builder with live character counter (`0 / 500`) and field validation.

- **Smooth Navigation & UX Polish**:
  - **Reading Scroll Progress Bar**: A sleek top gradient indicator driven by scroll timeline.
  - **Accessible Keyboard Navigation**: "Skip to main content" link and distinct `:focus-visible` focus rings.
  - **Floating Scroll-To-Top**: Smooth scrolling return button when navigating long pages.

---

## 📁 Repository Structure
```
MyPortfolio/
├── .gitignore                                  # Git ignore rules for OS & editor artifacts
├── README.md                                   # Project documentation & overview
├── index.html                                  # Semantic HTML5 document & modal dialog
├── script.js                                   # Interactions, modal handling & UX logic
├── style.css                                   # Design system tokens, animations & responsive styling
└── src/
    ├── Formal_pic.png                          # Profile photo
    ├── Hari_Bhambhani_Resume.pdf               # Resume document
    ├── Hack-AI-Thon 4.0 (AI-CoLegion) Certificate.png   # Certificate image
    └── SYRUS-CodeCell VESIT Certificate.png    # Certificate image
```

---

## 🛠️ Local Development
To run this project locally:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/haribhambhani24/MyPortfolio.git
   ```
2. Navigate into the project directory:
   ```bash
   cd MyPortfolio
   ```
3. Open `index.html` in your favorite web browser, or launch using VS Code's **Live Server** extension.

---

## 📬 Contact
- **Email**: [haribhambhani24@gmail.com](mailto:haribhambhani24@gmail.com)
- **LinkedIn**: [in/hari-bhambhani](https://www.linkedin.com/in/hari-bhambhani)
- **GitHub**: [@haribhambhani24](https://github.com/haribhambhani24)
