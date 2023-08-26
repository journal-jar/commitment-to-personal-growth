const { MongoClient } = require('mongodb');
let _db;

async function connect() {
  const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
  await client.connect();
  _db = client.db('myDatabase');
  console.log("Connected to Database");
}

function getDb() {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
}

module.exports = {
  connect,
  getDb
};