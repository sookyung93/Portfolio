'use strict';

loadSkills()
  .then((skills) => {
    displaySkills(skills);
  })
  .catch(console.log);

//navbar fix
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//when clisk the navbar menu, scroll to section & add btn-active class
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const preSelectedBtn = document.querySelector('.btn-active');
  if (preSelectedBtn) {
    preSelectedBtn.classList.remove('btn-active');
  }
  const target = event.target;
  const link = target.dataset.link;
  target.classList.add('btn-active');
  if (link == null) {
    return;
  }
  scrollToSection(link);
});

//Navbar toggle button for small screen
const navbarTogglBtn = document.querySelector('.navbar__toggle-btn');
navbarTogglBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('toggle__open');
});

//when click the 'contact' btn, scroll to contact section
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollToSection('#contact');
});

//when scrolling, make a home transparent
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeContainer = document.querySelector('.home__container');
document.addEventListener('scroll', () => {
  navbarMenu.classList.remove('toggle__open');
  const opacity = 1 - window.scrollY / homeHeight;
  homeContainer.style.opacity = opacity;
});

// show up arrow up button when scrolling down
const arrowupBtn = document.querySelector('.arrowup-btn');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowupBtn.classList.add('visible');
  } else {
    arrowupBtn.classList.remove('visible');
  }
});

// scroll to home when click the "arrow up" button
arrowupBtn.addEventListener('click', () => {
  scrollToSection('#home');
});

// filtering projects when click the button
const workBtnContainer = document.querySelector('.work__categories');
const workContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }

  const active = document.querySelector('.selected');
  active.classList.remove('selected');

  const target =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;

  target.classList.add('selected');

  workContainer.classList.add('animation-out');

  setTimeout(() => {
    projects.forEach((project) => {
      const language = project.dataset.language;
      if (filter === 'all' || filter === language) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    workContainer.classList.remove('animation-out');
  }, 300);
});

function loadSkills() {
  // 데이터를 받아와서, json 안에 있는 items 반환
  return fetch('data/skills.json') //
    .then((response) => response.json())
    .then((json) => json.skills);
}

function displaySkills(skills) {
  const container = document.querySelector('.skillset__left');
  container.innerHTML = skills
    .map((skills) => createSkillDescription(skills))
    .join('');
}

function createSkillDescription(skills) {
  return `
    <div class="skill">
        <div class="skill__description">
            <span>${skills.name}</span>
            <span>${skills.percentage}</span>
        </div>
        <div class="skill__bar">
        <div class="skill__value" style="width: ${parseInt(
          skills.percentage
        )}%"></div>
        </div>
    </div>
    `;
}

function scrollToSection(selector) {
  const scrollTo = document.querySelector(selector);
  if (selector === '#home' || selector === '#contact') {
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({
      top: scrollTo.offsetTop - navbarHeight,
      behavior: 'smooth',
    });
  }
}
