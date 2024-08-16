// src/lib/dbConnect.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI =
  "mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/footbal";

if (!MONGODB_URI) {
  throw new Error(
    "Define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient: Mongoose | null = null;
let cachedDb: Mongoose | null = null;

async function dbConnect(): Promise<{
  client: Mongoose | null;
  db: Mongoose | null;
}> {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await mongoose.connect(MONGODB_URI, {});

  cachedClient = client;
  cachedDb = client;
  return { client, db: client };
}

export default dbConnect;
