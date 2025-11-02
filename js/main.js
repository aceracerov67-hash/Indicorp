
// main.js — menu toggle behaviour with accessibility + outside click + escape key + close on link click

(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const headerList = document.getElementById("primary-navigation");
  const body = document.body;

  if (!menuToggle || !headerList) return;

  function openMenu() {
    menuToggle.classList.add("active");
    headerList.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    // optionally prevent body scroll when menu open on small screens
    if (window.matchMedia("(max-width: 768px)").matches) {
      body.style.overflow = "hidden";
    }
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    headerList.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    body.style.overflow = "";
  }

  menuToggle.addEventListener("click", (e) => {
    const expanded = menuToggle.classList.toggle("active");
    headerList.classList.toggle("active");
    const isOpen = menuToggle.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    if (isOpen && window.matchMedia("(max-width: 768px)").matches) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // close when link clicked (use event delegation)
  headerList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches(".header-link")) {
      // close only on small screens where overlay is used
      if (window.matchMedia("(max-width: 768px)").matches) {
        closeMenu();
      }
    }
  });

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // click outside to close (only when menu is open)
  document.addEventListener("click", (e) => {
    const isClickInsideNav = headerList.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInsideNav && headerList.classList.contains("active")) {
      closeMenu();
    }
  });

  // Optional: close menu when resizing up (so state doesn't persist)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      // ensure menu closed on desktop
      closeMenu();
    }
  });
})();





// COUNT-UP ANIMATION
const counters = document.querySelectorAll(".counter");
const speed = 120; // tezlik (kichik bo‘lsa, tezroq)

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target >= 1000 ? (target / 1000) + "K" : target + "+";
      }
    };
    updateCount();
  });
};

// Scrollga chiqqanda ishga tushadi
const section = document.querySelector(".about");
let started = false;

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop - window.innerHeight + 100;
  if (window.scrollY > sectionTop && !started) {
    animateCounters();
    started = true;
  }
});
