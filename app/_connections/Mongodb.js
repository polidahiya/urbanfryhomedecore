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
      Admindatacollection: db.collection("Admindata"),
      Productscollection: db.collection("Products"),
      userscollection: db.collection("users"),
      orderscollection: db.collection("orders"),
      reviewscollection: db.collection("reviews"),
      contactmessages: db.collection("contactmessages"),
      couponscollection: db.collection("couponscollection"),
      Newslettersubscriberscollection: db.collection("Newslettersubscribers"),
      inhomecollection: db.collection("inhomecollection"),
      blogscollection: db.collection("blogscollection"),
    };

    // Create unique index on email for newsletter collection
    await collections.Newslettersubscriberscollection.createIndex(
      { email: 1 },
      { unique: true }
    );
  }

  return collections;
}

export async function getcollection() {
  await connectToDatabase();
  return { ...collections, ObjectId };
}
