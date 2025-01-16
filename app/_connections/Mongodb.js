import { MongoClient, ObjectId } from "mongodb";

const dbLink = process.env.mongodb_link;
const client = new MongoClient(dbLink, { serverSelectionTimeoutMS: 10000 });

let db;
let collections;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("Altorgainzers");

    collections = {
      blogscollection: db.collection("blogs"),
      Admindatacollection: db.collection("Admindata"),
      Productscollection: db.collection("Products"),
      userscollection: db.collection("users"),
      orderscollection: db.collection("orders"),
      reviewscollection: db.collection("reviews"),
      contactmessages: db.collection("contactmessages"),
    };
  }

  return collections;
}

export async function getcollection() {
  await connectToDatabase();
  return { ...collections, ObjectId };
}
