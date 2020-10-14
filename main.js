'use strict';

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
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

loadSkills()
  .then((skills) => {
    displaySkills(skills);
  })
  .catch(console.log);

//navbar fix
const navbar = document.querySelector('#navbar');
const narbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > narbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//when clisk the navbar menu, scroll to section
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollToSection(link);
});

//when click the 'contact' btn, scroll to contact section
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollToSection('#contact');
});
