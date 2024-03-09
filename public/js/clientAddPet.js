document
  .querySelector("#add-new-pet-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const pet = {
      name: document.querySelector("#name").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    document
      .querySelector("#add-new-pet-form")
      .classList.add("form-is-loading");

    const ourPromise = await fetch("/.netlify/functions/addPet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    const theResponse = await ourPromise.json();

    if (theResponse.success) {
      window.location = "/admin";
    }
  });
