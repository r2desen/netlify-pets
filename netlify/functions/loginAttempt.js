const cookie = require("cookie");

const handler = async (event) => {
  const body = JSON.parse(event.body);
  if (body.username == "learn" && body.password == "javascript") {
    const myCookie = cookie.serialize(
      "petadoption",
      "askldjasdjklfkljads123981231231230asdfjkasdfjk1230910230asdjklfakjlsd1209309123123",
      {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": myCookie,
        Location: "/",
      },
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
