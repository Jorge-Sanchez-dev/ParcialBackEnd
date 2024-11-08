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
    if(path === "/persona"){
      const name = url.searchParams.get("name");
      if(name){
        const personasDB = await usersCollection.find({name}).toArray();
      }

    }else if(path === "/personas"){
      const name = url.searchParams.get("name");
      if(name){
        const personasDB = await usersCollection.find({name}).toArray();
        /*const personas = await Promise.all{
         
        }*/
        return new Response(JSON.stringify(personasDB));
      }else{
        return new Response("Not Found", {status: 404});
      }
    }
  }else if (method === "POST"){
    if(path === "/personas"){
      const personas = await req.json;
      if(!personas.name){
        return new Response("Bad Request", {status: 400});
      }

    }else if (path === "/persona"){
      const name = url.searchParams.get("name");

    }
  }else if(method === "PUT"){
    if (path === "/persona"){
      const personas = await req.json;

    }else if (path === "/persona/amigo"){
      const personas = await req.json;
    }
  }else if(method === "DELETE"){
    if (path === "/persona"){
      const name = url.searchParams.get("name");
      if(!name) return new Response("Not found", {status: 404});
      //const {deleted} = await name.at(0);
    };
    /*if (deleted === 0){
      return new Response("Not found", {status: 404});
    }*/
  }

  return new Response ("Not found", {status: 404});

}

Deno.serve({port:3000}, handler);