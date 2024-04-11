// ------------------ General functions: ------------------

function adjustScroll(destSection, dif) {
  let section = document.getElementById(destSection);
  let offset = dif; // go x px more
  window.scrollTo({
      top: section.offsetTop - offset,
      behavior: 'smooth'
  });
}

// expand accordion like 

function expandSegment(){
  const seg = document.getElementById("expand-segment")
   seg.classList.toggle('expanded')
   seg.classList.toggle('collapsed')
}


// ------------------ Stick Navigation ------------------

window.onscroll = function() {stickNavbar(), stickProjectsNavbar()};

const header = document.getElementById("myHeader");
const sticky = header.offsetTop;

function stickNavbar() {
  if (window.scrollY > sticky + 15) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


// Projects Navbar:
const projectsNavbar = document.getElementById("projectsNav");
const projectsDropdown = document.getElementById("header-dropdown");
const afterProjects = document.getElementById('endOfProjects');
const stickyProjects = projectsNavbar.offsetTop;
const noMoreSticky = afterProjects.offsetTop;

function stickProjectsNavbar(){
  if (window.scrollY > stickyProjects && window.scrollY < noMoreSticky - 600) {
    projectsNavbar.classList.add("stickyNav");
    projectsDropdown.classList.add("hide");
  } else {
    projectsNavbar.classList.remove("stickyNav");
    projectsDropdown.classList.remove("hide")
  }
}

// ------------------ language toggle ------------------
// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      //element.textContent = langData[key];
      // Replace "\n" with "<br>" for line breaks
      const contentWithLineBreaks = langData[key].replace(/\n/g, '<br>');
      // Use innerHTML instead of textContent
      element.innerHTML = contentWithLineBreaks;
  });
}
/*
// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang);
  location.reload();
  console.log("setLanguagePreference");
}*/

// Function to fetch language data
async function fetchLanguageData(lang) {
  let response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to change language
async function changeLanguage(lang) {
  const langData = await fetchLanguageData(lang);
  updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
  const userPreferredLanguage = localStorage.getItem('language') || 'deu';
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
});



// ------------------ Animate Skillbars ------------------

function addFill(bar){
  bar.classList.add('fill');
}

function removeFill(bar){
  bar.classList.remove('fill');
}