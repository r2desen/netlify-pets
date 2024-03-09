const escape = require("escape-html");
const { ObjectId } = require("mongodb");
const getDbClient = require("../../our-library/getDbClient");
const isAdmin = require("../../our-library/isAdmin");

const handler = async (event) => {
  if (isAdmin(event)) {
    const body = JSON.parse(event.body);

    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      };
    }

    const client = await getDbClient();
    const pet = await client
      .db()
      .collection("pets")
      .findOne({ _id: new ObjectId(body.id) });
    client.close();

    pet.name = escape(pet.name);
    pet.birthYear = escape(pet.birthYear);
    pet.species = escape(pet.species);
    pet.description = escape(pet.description);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
