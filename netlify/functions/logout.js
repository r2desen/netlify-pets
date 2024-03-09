const cookie = require("cookie");

const handler = async (event) => {
  const myCookie = cookie.serialize("petadoption", "-", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": myCookie,
      Location: "/",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports = { handler };
