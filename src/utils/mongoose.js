import { connect, connection } from "mongoose";

const conn = {
    isConnected: false,
}

export const connectDB = async () => {
    if(conn.isConnected) return;

  const db = await connect("mongodb://127.0.0.1/nextmongocrud");
//   console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState; //Devuelve un número que indica el estado del socket
};

connection.on('connected', () => {
    console.log('Mongoose is connected');
});
connection.on('error', (err) => {
    console.log('Mongoose connection error', err);
});