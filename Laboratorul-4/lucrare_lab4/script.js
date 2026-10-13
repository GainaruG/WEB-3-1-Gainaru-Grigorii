'use strict';
const fructe = ['Măr', 'Pară', 'Banana', 'Portocală', 'Kiwi'];
console.log('Exercițiul 1 — lista de fructe:', fructe);
console.log('Primul fruct:', fructe[0]);
console.log('Ultimul fruct:', fructe[fructe.length - 1]);
console.log('Numărul de fructe:', fructe.length);
const orase = ['Chișinău', 'Bălți', 'Cahul'];
orase.push('Orhei');
orase.unshift('Soroca');
orase.pop();
orase.shift();
console.log('Exercițiul 2 — lista finală de orașe:', orase);
document.querySelector('#cities-result').textContent = orase.join(' · ');
const produse = ['Pâine', 'Lapte', 'Ouă'];
const shoppingList = document.querySelector('#shopping-list');
const shoppingCount = document.querySelector('#shopping-count');
const shoppingStatus = document.querySelector('#shopping-status');
const productInput = document.querySelector('#product-input');
const shoppingForm = document.querySelector('#shopping-form');
const removeFirstButton = document.querySelector('#remove-first-button');
const removeLastButton = document.querySelector('#remove-last-button');

function afiseazaProduse() {
  shoppingList.replaceChildren();
  shoppingCount.textContent = produse.length;
  removeFirstButton.disabled = produse.length === 0;
  removeLastButton.disabled = produse.length === 0;

  if (produse.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'Lista este goală!';
    shoppingList.append(emptyItem);
    return;
  }

  produse.forEach((produs, index) => {
    const item = document.createElement('li');
    item.className = 'shopping-item';
    const number = document.createElement('span');
    number.className = 'item-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('span');
    name.className = 'item-name';
    name.textContent = produs;
    item.append(number, name);
    shoppingList.append(item);
  });
}

shoppingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const produs = productInput.value.trim();
  if (!produs) {
    shoppingStatus.textContent = 'Scrie numele produsului înainte de a-l adăuga.';
    productInput.focus();
    return;
  }
  if (event.submitter?.value === 'start') {
    produse.unshift(produs);
    shoppingStatus.textContent = `„${produs}” a fost adăugat la începutul listei.`;
  } else {
    produse.push(produs);
    shoppingStatus.textContent = `„${produs}” a fost adăugat la sfârșitul listei.`;
  }
  productInput.value = '';
  afiseazaProduse();
  productInput.focus();
});

removeFirstButton.addEventListener('click', () => {
  if (produse.length === 0) return;
  const eliminat = produse.shift();
  shoppingStatus.textContent = `Primul produs, „${eliminat}”, a fost șters.`;
  afiseazaProduse();
});

removeLastButton.addEventListener('click', () => {
  if (produse.length === 0) return;
  const eliminat = produse.pop();
  shoppingStatus.textContent = `Ultimul produs, „${eliminat}”, a fost șters.`;
  afiseazaProduse();
});

afiseazaProduse();
const elevi = [
  { nume: 'Popescu Ana', varsta: 17, nota: 9 },
  { nume: 'Rusu Mihai', varsta: 18, nota: 8 },
  { nume: 'Ciobanu Maria', varsta: 17, nota: 10 }
];
const studentList = document.querySelector('#student-list');
const studentCount = document.querySelector('#student-count');
const catalogStatus = document.querySelector('#catalog-status');
const searchResult = document.querySelector('#search-result');
const deleteStatus = document.querySelector('#delete-status');

function afiseazaElevi() {
  studentList.replaceChildren();
  studentCount.textContent = elevi.length;

  if (elevi.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'Catalogul nu conține elevi.';
    studentList.append(emptyItem);
    return;
  }

  elevi.forEach((elev, index) => {
    const item = document.createElement('li');
    item.className = 'student-item';
    const indexBadge = document.createElement('span');
    indexBadge.className = 'student-index';
    indexBadge.textContent = String(index + 1).padStart(2, '0');
    const details = document.createElement('div');
    details.className = 'student-details';
    const name = document.createElement('strong');
    name.className = 'student-name';
    name.textContent = elev.nume;
    const metadata = document.createElement('span');
    metadata.className = 'student-metadata';
    metadata.textContent = `Vârsta: ${elev.varsta} · Nota: ${elev.nota}`;
    details.append(name, metadata);
    const grade = document.createElement('span');
    grade.className = 'grade-badge';
    grade.setAttribute('aria-label', `Nota ${elev.nota}`);
    grade.textContent = String(elev.nota);
    item.append(indexBadge, details, grade);
    studentList.append(item);
  });
}

function adaugaElev(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const nume = String(formData.get('name')).trim().replace(/\s+/g, ' ');
  const varsta = Number(formData.get('age'));
  const nota = Number(formData.get('grade'));
  const cheieNume = nume.toLocaleLowerCase('ro');

  if (!nume || !Number.isInteger(varsta) || varsta < 1 || varsta > 120 || !Number.isFinite(nota) || nota < 1 || nota > 10) {
    catalogStatus.textContent = 'Verifică numele, vârsta și nota (1–10), apoi încearcă din nou.';
    return;
  }
  if (elevi.find((elev) => elev.nume.toLocaleLowerCase('ro') === cheieNume)) {
    catalogStatus.textContent = 'Există deja un elev cu acest nume. Folosește un nume distinct.';
    return;
  }

  const elevNou = { nume, varsta, nota };
  elevi.push(elevNou);
  afiseazaElevi();
  catalogStatus.textContent = `${elevNou.nume} a fost adăugat în catalog.`;
  form.reset();
  document.querySelector('#student-name-input').focus();
}

document.querySelector('#add-student-form').addEventListener('submit', adaugaElev);

function cautaElev(event) {
  event.preventDefault();
  const searchName = document.querySelector('#search-student-input').value.trim().replace(/\s+/g, ' ');
  const cheieNume = searchName.toLocaleLowerCase('ro');
  const elevGasit = elevi.find((elev) => elev.nume.toLocaleLowerCase('ro') === cheieNume);
  searchResult.replaceChildren();

  if (!elevGasit) {
    searchResult.textContent = 'Elevul nu a fost găsit! Verifică numele și încearcă din nou.';
    searchResult.className = 'search-result search-result--error';
    return;
  }

  searchResult.className = 'search-result search-result--success';
  const heading = document.createElement('strong');
  heading.textContent = 'Elev găsit!';
  const name = document.createElement('span');
  name.textContent = `Nume: ${elevGasit.nume}`;
  const age = document.createElement('span');
  age.textContent = `Vârsta: ${elevGasit.varsta}`;
  const grade = document.createElement('span');
  grade.textContent = `Nota: ${elevGasit.nota}`;
  searchResult.append(heading, name, age, grade);
}

document.querySelector('#search-student-form').addEventListener('submit', cautaElev);

function stergeElev(event) {
  event.preventDefault();
  const input = document.querySelector('#delete-student-input');
  const numeCautat = input.value.trim().replace(/\s+/g, ' ');
  const cheieNume = numeCautat.toLocaleLowerCase('ro');
  const indexElev = elevi.findIndex((elev) => elev.nume.toLocaleLowerCase('ro') === cheieNume);

  if (indexElev === -1) {
    deleteStatus.textContent = 'Elevul nu a fost găsit; verifică numele introdus.';
    return;
  }

  const [elevSters] = elevi.splice(indexElev, 1);
  afiseazaElevi();
  deleteStatus.textContent = `${elevSters.nume} a fost șters din catalog.`;
  document.querySelector('#search-result').replaceChildren();
  input.value = '';
  input.focus();
}

document.querySelector('#delete-student-form').addEventListener('submit', stergeElev);
afiseazaElevi();
