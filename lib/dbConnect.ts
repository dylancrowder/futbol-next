import mongoose, { connect, connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const conn: any = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) {
    return;
  }

  const db = await connect(MONGODB_URI);

  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Error:", err.message));
