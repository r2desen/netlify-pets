const { MongoClient } = require("mongodb");

const handler = async () => {
  const client = new MongoClient(process.env.CONNECTIONSTRING);
  await client.connect();

  const pets = await client.db().collection("pets").find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
