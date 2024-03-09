const cookie = require("cookie");

function isAdmin(event) {
  const incomingCookie = cookie.parse(event.headers.cookie || "");
  if (
    incomingCookie?.petadoption ==
    "askldjasdjklfkljads123981231231230asdfjkasdfjk1230910230asdjklfakjlsd1209309123123"
  ) {
    return true;
  }
  return false;
}

module.exports = isAdmin;
