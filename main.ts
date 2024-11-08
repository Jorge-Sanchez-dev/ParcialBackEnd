import { MongoClient } from 'mongodb'

// Connection URL
const MOONGO_URL = Deno.env.get("MONGO_URL");
if(!MOONGO_URL){
  console.error("Error en MONGO_URL");
  Deno.exit(1);
}

const client = new MongoClient(MOONGO_URL);
await client.connect();
console.info('Connected successfully to MongoDB');

const db = client.db("AGENDA");
