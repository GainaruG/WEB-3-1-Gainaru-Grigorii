
  let students = [
    { id: 1, name: "Ana Popescu",    group: "SI-231", age: 19, specialty: "Securitate informațională", avatar: "👩‍💻" },
    { id: 2, name: "Mihai Rusu",     group: "SI-231", age: 20, specialty: "Securitate informațională", avatar: "👨‍💻" },
    { id: 3, name: "Irina Ciobanu",  group: "PR-232", age: 18, specialty: "Programare",                avatar: "👩‍🎓" },
    { id: 4, name: "Andrei Munteanu",group: "PR-232", age: 21, specialty: "Programare",                avatar: "👨‍🎓" },
    { id: 5, name: "Elena Cojocaru", group: "RC-233", age: 22, specialty: "Rețele de calculatoare",    avatar: "🧑‍🔬" }
  ];
  let nextId = Math.max(...students.map(s => s.id)) + 1;

  const list = document.getElementById("list");
  const countEl = document.getElementById("count");

  function render() {
    list.innerHTML = "";
    countEl.textContent = students.length;
    if (students.length === 0) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "Nu există studenți în listă. Adaugă un student folosind formularul.";
      list.appendChild(p);
      return;
    }
    students.forEach(s => {
      const card = document.createElement("article");
      card.className = "student";
      card.innerHTML = `
        <div class="head">
          <div class="avatar"></div>
          <div><div class="name"></div><div class="group-name"></div></div>
        </div>
        <div class="row"><span class="k">Vârsta</span><span class="v age"></span></div>
        <div class="row"><span class="k">Specialitatea</span><span class="v spec"></span></div>
        <div class="row"><span class="k">Statut</span><span class="v"><span class="badge">Înmatriculat</span></span></div>
        <button class="del" type="button">Șterge</button>`;
     
      card.querySelector(".avatar").textContent = s.avatar;
      card.querySelector(".name").textContent = s.name;
      card.querySelector(".group-name").textContent = "Grupa: " + s.group;
      card.querySelector(".age").textContent = s.age + " ani";
      card.querySelector(".spec").textContent = s.specialty;
      card.querySelector(".del").addEventListener("click", () => deleteStudent(s.id));
      list.appendChild(card);
    });
  }

  
  function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    render();
  }

  
  const form = document.getElementById("studentForm");
  const errorEl = document.getElementById("formError");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const group = form.group.value.trim();
    const specialty = form.specialty.value.trim();
    const ageRaw = form.age.value.trim();
    const age = Number(ageRaw);
    const avatar = form.avatar.value;

    if (!name || !group || !specialty || !ageRaw) {
      errorEl.textContent = "Completează toate câmpurile.";
      return;
    }
    if (!Number.isInteger(age) || age < 14 || age > 100) {
      errorEl.textContent = "Vârsta trebuie să fie un număr întreg între 14 și 100.";
      return;
    }
    students.push({ id: nextId++, name, group, age, specialty, avatar });
    form.reset();
    errorEl.textContent = "";
    render();
  });

  
  document.querySelectorAll(".btns").forEach(box => {
    box.addEventListener("click", e => {
      if (e.target.tagName !== "BUTTON") return;
      box.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      list.style[box.dataset.prop] = e.target.textContent;
    });
  });
  const gapInput = document.getElementById("gap");
  gapInput.addEventListener("input", () => {
    list.style.gap = gapInput.value + "px";
    document.getElementById("gapValue").textContent = gapInput.value;
  });

  render();
  const enterWorldButton = document.querySelector("#enter-world");

enterWorldButton.addEventListener("click", (event) => {
	event.preventDefault();
	enterWorldButton.textContent = "Bine ai venit în regat!";
	enterWorldButton.setAttribute("aria-live", "polite");

	window.setTimeout(() => {
		enterWorldButton.textContent = "Intră în lume";
	}, 2500);
});