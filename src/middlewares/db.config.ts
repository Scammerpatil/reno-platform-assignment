import mysql from "mysql2/promise";

// Database Connection

const dbConfig = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "schools",
    });
    // Create a table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        contact VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `;
    connection.query(createTableQuery);
    console.log("Connected to the Database");
    return connection;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default dbConfig;
