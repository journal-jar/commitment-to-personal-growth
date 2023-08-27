// require('dotenv').config({path: '../../.env'});

const { MongoClient } = require('mongodb');
let _db;

// Connection string to local instance of MongoDB
const connectionStringURI = process.env.MONGO_CONNECTION_STRING


async function connect() {
  const client = new MongoClient(connectionStringURI, { useUnifiedTopology: true });
  await client.connect();
  _db = client.db('JDB');
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