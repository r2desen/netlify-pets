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
        body: JSON.stringify({ success: false }),
      };
    }

    const client = await getDbClient();
    await client
      .db()
      .collection("pets")
      .deleteOne({ _id: new ObjectId(body.id) });
    client.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
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
