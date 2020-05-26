let persons = null;
let inputSearch = null;
let btnSearch = null;
let countMale = null;
let countFemale = null;
let sumAges = null;
let averageAges = null;
let divPersons = null;
let totalFilterPersons = null;

window.addEventListener("load", async () => {
  const $ = document.querySelector.bind(document);
  getPersons();
  inputSearch = $("#inputSearch");
  btnSearch = $("#btnSearch");
  countMale = $("#countMale");
  countFemale = $("#countFemale");
  sumAges = $("#sumAges");
  averageAges = $("#averageAges");
  divPersons = $("#divPersons");
  totalFilterPersons = $("#totalFilterPersons");

  inputSearch.addEventListener("keyup", keyUp);
  btnSearch.addEventListener("click", search);
});

function keyUp(event) {
  if (btnSearch.hasAttribute("disabled")) {
    btnSearch.removeAttribute("disabled");
  }

  if (event.key == "Enter") {
    search();
  }
}

function search() {
  const searchValue = inputSearch.value.toLowerCase();
  const personsFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue)
  );
  render(personsFilter);
  renderStatistics(personsFilter);
}

function render(personsFilter) {
  let html = "";
  let countMaleLocal = 0;
  let countFemaleLocal = 0;
  personsFilter.forEach((person) => {
    if (person.gender == "female") {
      countFemaleLocal++;
    } else {
      countMaleLocal++;
    }

    html += `
            <div class='col s3 person'>
                <div class='center'>
                     <img class='img-round'  src='${person.picture.medium}'>
                </div>
                <p class='teal-text center'>${person.name}, ${person.age} Anos</p>
            </div>`;
  });

  divPersons.innerHTML = html;

  countMale.innerHTML = countMaleLocal;
  countFemale.innerHTML = countFemaleLocal;
}

function renderStatistics(personsFilter) {
  const totalAges = personsFilter.reduce(
    (accumulator, current) => accumulator + current.age,
    0
  );

  sumAges.innerHTML = totalAges;
  averageAges.innerHTML = (totalAges / personsFilter.length).toFixed(2);
  totalFilterPersons.innerHTML = `<h3 class='teal-text'>${personsFilter.length} pessoa(s) encontrada(s)</h3>`;
}

async function getPersons() {
  const result = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await result.json();
  console.log(json);
  persons = json.results.map((person) => {
    return {
      name: `${person.name.first} ${person.name.last}`,
      picture: person.picture,
      age: person.dob.age,
      gender: person.gender,
    };
  });
}
