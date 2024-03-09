const urlVariables = new URLSearchParams(window.location.search);
const id = urlVariables.get("id");

async function getEditPet() {
  const ourPromise = await fetch("/.netlify/functions/getSingularPet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const pet = await ourPromise.json();
  console.log(pet);

  if (!pet.name) {
    window.location = "/admin";
  }

  document.querySelector("#name").value = pet.name;
  document.querySelector("#birthYear").value = pet.birthYear;
  document.querySelector("#species").value = pet.species;
  document.querySelector("#description").value = pet.description;

  document.querySelector("#edit-pet-form").classList.remove("form-is-loading");
  document.querySelector("#name").focus();
}

getEditPet();

document
  .querySelector("#edit-pet-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const pet = {
      id,
      name: document.querySelector("#name").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    document.querySelector("#edit-pet-form").classList.add("form-is-loading");

    const ourPromise = await fetch("/.netlify/functions/saveChanges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    const theResponse = await ourPromise.json();

    if (theResponse.success) {
      window.location = "/admin";
    }
  });
