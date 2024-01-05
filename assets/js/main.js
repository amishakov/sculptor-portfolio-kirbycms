//& Stylesheets
//& ------------------------------

import "flickity/css/flickity.css";
import "../scss/main.scss";

//& Librairies
//& ------------------------------

import Loadeer from "loadeer";
import { gsap } from "gsap";
import faderText from "./modules/faderText";
import Flickity from "flickity";
import Lenis from "@studio-freight/lenis";
import { isMobile } from "mobile-device-detect";

//? Lenis Scroll
//? -------------------------------

const lenis = new Lenis({
  lerp: 0.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//? Hover Fading Text Animation
//? -------------------------------

const aboutTextContainer = document.querySelector("#about__biography");
const projectTextContainer = document.querySelector("#project-description");

if (aboutTextContainer) {
  faderText("#about__biography");
}
if (projectTextContainer) {
  faderText("#project-description");
}

//? Lazy Loading
//? -------------------------------

const loadeer = new Loadeer();
loadeer.observe();

//? Floating Image Index
//? -------------------------------

if (document.querySelector("#home") && !isMobile) {
  const floatingContainer = document.querySelector("#floating-container");

  function moveCircle(e) {
    gsap.to(floatingContainer, 0.3, {
      css: {
        left: e.pageX,
        top: e.pageY,
      },
    });
  }

  window.addEventListener("mousemove", moveCircle);

  // Fetch and display floating image container
  const allProjects = document
    .getElementById("home__projects")
    .querySelectorAll("a");
  let floatingImg, floatingUrl;

  // Loop through all the projects and links
  Array.from(allProjects).forEach((project) => {
    // Actions on mouse over
    project.addEventListener("mouseover", () => {
      floatingContainer.style.opacity = "1";
      displayAndPreviewImage(project);
    });
    // Actions on mouse out
    project.addEventListener("mouseout", () => {
      floatingContainer.style.opacity = "0";
    });
  });

  function displayAndPreviewImage(project) {
    // Create the image tag only once
    if (!floatingContainer.hasChildNodes()) {
      floatingImg = document.createElement("img");
    }

    // Fetch attribute, set up the src and append image inside container
    floatingUrl = project.getAttribute("data-floating-url");
    floatingImg.src = floatingUrl;
    floatingImg.setAttribute("draggable", false);
    floatingContainer.appendChild(floatingImg);
  }
}

//? Flickity Slider Configuration
//? -------------------------------

const pageSliderConfig = {
  prevNextButtons: true,
  pageDots: false,
  cellAlign: "left",
  draggable: false,
  selectedAttraction: 0.2,
  friction: 0.8,
  wrapAround: true,
  adaptiveHeight: true,
  lazyLoad: true
};

if (document.querySelector(".carousel")) {
  var flkty = new Flickity(".carousel", pageSliderConfig);
  const carouselStatus = document.querySelector("#carousel-index");

  function updateStatus(flkty) {
    const slideNumber = flkty.selectedIndex + 1;
    carouselStatus.innerHTML = `<p> ${slideNumber}/${flkty.slides.length}</p>`;
  }

  updateStatus(flkty);
  flkty.on("select", () => updateStatus(flkty)); // Update index position
}

// Remove svg arrows from carousel buttons

const flktyButtons = document.querySelectorAll(".flickity-button");

Array.from(flktyButtons).forEach((fkltyButton) => {
  fkltyButton.innerHTML = "";
});

//? Color Theme Picker
//? -------------------------------

let myTheme, newTheme;

// Attribute color on first load
let navigationEntries = performance.getEntriesByType("navigation");
let lastTheme = sessionStorage.getItem("lastTheme");

if (
  lastTheme &&
  navigationEntries.length > 0 &&
  navigationEntries[0].type !== "reload"
) {
  myTheme = lastTheme;
  document.body.classList.add(myTheme);
} else {
  setThemeByDefault("theme-0");
}

// Change color on click
const switchColor = document.querySelector("#header__color-switch");

if (switchColor) {
  switchColor.addEventListener("click", () => {
    lastTheme = sessionStorage.getItem("lastTheme");
    document.body.classList.remove(lastTheme);
    createRandomTheme();
    document.body.classList.add(myTheme);
  });
}

function createRandomTheme() {
  do {
    newTheme = `theme-${Math.floor(Math.random() * 8)}`;
  } while (newTheme === lastTheme);
  myTheme = newTheme;
  // Store the new color as the current session color
  sessionStorage.setItem("lastTheme", myTheme);
}

function setThemeByDefault(themeByDefault) {
  document.body.classList.add(themeByDefault);
  sessionStorage.setItem("lastTheme", themeByDefault);
  document.body.classList.add(themeByDefault);
}

//? Adapt information text
//? -------------------------------

const infoHook = document.getElementById("info-hook");
const infoHookMobileContent = "infos";
const infoHookDesktopContent = "informations";

if (infoHook) {
  adaptInfoText(infoHook);
  onresize = () => {
    adaptInfoText(infoHook);
  };
}

function adaptInfoText(placeholder) {
  if (window.innerWidth <= 768) {
    placeholder.innerText = infoHookMobileContent;
  } else {
    placeholder.innerText = infoHookDesktopContent;
  }
}

//? Custom cursor
//? -------------------------------

if (!isMobile) {
  const carouselButtonsPrev = document.getElementsByClassName(
    "flickity-prev-next-button"
  )[0];
  const carouselButtonsNext = document.getElementsByClassName(
    "flickity-prev-next-button"
  )[1];

  const cursorContainer = document.createElement("div");
  cursorContainer.id = "cursor-container";

  function moveCursor(e) {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    cursorContainer.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }

  // Previous / Next button handler

  function revealCursor(button, text) {
    button.addEventListener("mouseover", () => {
      cursorContainer.innerText = text;
      document.body.append(cursorContainer);
    });

    button.addEventListener("mouseout", () => {
      cursorContainer.remove();
    });
  }

  if (document.querySelector(".flickity-slider") && window.innerWidth >= 1024) {
    revealCursor(carouselButtonsNext, "NEXT");
    revealCursor(carouselButtonsPrev, "PREV");
  }

  window.addEventListener("mousemove", moveCursor);
}
