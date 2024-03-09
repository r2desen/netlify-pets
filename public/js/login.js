document.querySelector("#login-form").addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const ourPromise = await fetch("/.netlify/functions/loginAttempt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  });

  const ourData = await ourPromise.json();
  if (ourData.success) {
    window.location = "/admin";
  } else {
    console.log("Try again");
  }
}
