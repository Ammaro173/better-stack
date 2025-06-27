import mongoose from "mongoose";

await mongoose.connect(process.env.DATABASE_URL || "").catch((error) => {
	console.error("Error connecting to database:", error);
});

// const client = mongoose.connection.getClient().db("auth");//! This will override default db to the one passed in the connection string

//! Extract database name from DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL || "");
const dbName = dbUrl.pathname.slice(1); //! Remove leading slash
const client = mongoose.connection.getClient().db(dbName || "auth");

export { client };
