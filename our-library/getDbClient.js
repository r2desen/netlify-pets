const { MongoClient } = require("mongodb");

async function getDb() {
  const client = new MongoClient(process.env.CONNECTIONSTRING);
  await client.connect();
  return client;
}

module.exports = getDb;
