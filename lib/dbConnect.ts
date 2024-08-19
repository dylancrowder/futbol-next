import mongoose, { connect, connection } from "mongoose";

const MONGODB_URI =
  "mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/footbal";

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

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));
