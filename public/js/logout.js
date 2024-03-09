document.querySelector("#logout").addEventListener("click", async function () {
  const ourPromise = await fetch("/.netlify/functions/logout");

  window.location = "/";
});
