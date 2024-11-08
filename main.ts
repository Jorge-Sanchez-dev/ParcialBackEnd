import { MongoClient } from 'mongodb'
import type { Personas } from "./types.ts";

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

const usersCollection = db.collection<Personas>("Personas");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if(method === "GET"){
    if(path === "/personas"){
      const name = url.searchParams.get("name");
      if(name){
        const personasDB = await usersCollection.find({name}).toArray();
        /*const personas = await Promise.all{
         
        }*/
        return new Response(JSON.stringify(personasDB));
      }
    }
  }else if (method === "POST"){
    if(path === "/personas"){

    }else if (path === "/persona"){

    }
  }else if(method === "PUT"){
    if (path === "/persona"){

    }else if (path === "/persona/amigo"){
      
    }
  }else if(method === "DELETE"){
    if (path === "/persona"){

    }
  }

  return new Response ("endpoint not found", {status: 404});

}

Deno.serve({port:3000}, handler);