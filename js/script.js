const buttons = document.querySelectorAll("button");
const dividers = document.querySelectorAll(".divider");
const cover = document.querySelector(".cover-container");
const navbarAssistance = document.getElementById("navbar-assistance");
const awning = document.querySelector(".awning");
const navbar = document.getElementById("navbar");
const coverContainer = document.querySelector(".cover-container");
const corner = document.querySelector(".cover .corner");
const navbarNav = document.querySelector(".navbar-nav");
const h2Headings = document.querySelectorAll("h2");

function toggleStyle(element, property, value1, value2) {
  element.style[property] =
    element.style[property] === value1 ? value2 : value1;
}

function toggleMobileNavbarDropdown() {
  ["navbar-nav", "navbar"].forEach((cn) =>
    document.querySelector(`.${cn}`).classList.toggle("show")
  );
}

function toggleNavbar() {
  toggleStyle(navbar, "top", "-6em", "0px");
  toggleStyle(awning, "top", "0px", "-6em");
  toggleStyle(navbarAssistance, "right", "-25vw", "1em");
  setTimeout(handleScroll, 160);
}

function isElementInViewport(el) {
  const { top, bottom } = el.getBoundingClientRect();
  return (
    top >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function handleScroll() {
  [buttons, dividers, h2Headings].forEach((elements) =>
    elements.forEach((element) =>
      element.classList.toggle("visible", isElementInViewport(element))
    )
  );
  const coverContainerHeight = coverContainer.offsetHeight;
  coverContainer.style.left =
    window.scrollY > coverContainer.offsetTop + coverContainerHeight / 3
      ? "-100vw"
      : "0";
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  corner.style.filter = `blur(${Math.min(4, scrollPos / 50)}px)`;
}

let throttleTimeout;
function scrollThrottle() {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      handleScroll();
      throttleTimeout = null;
    }, 150);
  }
}

window.addEventListener("scroll", scrollThrottle);

document.addEventListener("keydown", (event) => {
  const { key, ctrlKey, metaKey } = event;
  if (key === "n" || key === "t") toggleNavbar();
  else if (key === "u") window.location.href = "#top";
  else if (key === "g" && (ctrlKey || metaKey))
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

(function () {
  setTimeout(() => {
    cover.style.left = "0px";
    navbarAssistance.style.right = "1em";
    navbar.style.top = "-6em";
    awning.style.top = "0px";
    handleScroll();
  }, 50);
})();
