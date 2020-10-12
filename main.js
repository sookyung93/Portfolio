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
  console.log(skills);
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

loadSkills()
  .then((skills) => {
    displaySkills(skills);
  })
  .catch(console.log);
