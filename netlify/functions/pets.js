const getDbClient = require("../../our-library/getDbClient");

const handler = async () => {
  const client = await getDbClient();
  const pets = await client.db().collection("pets").find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
