// src/config/db.ts
import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connection_str,
  ssl:{rejectUnauthorized:false}
});

const initDB = async () => {
  try {
    //! USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(60) NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    //! BILLS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bills (
        bill_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        bill_type TEXT NOT NULL,
        organization TEXT NOT NULL,
        amount NUMERIC(10,2),
        due_date DATE,
        status TEXT DEFAULT 'pending'
      );
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS refreshTokens(
        token_id SERIAL PRIMARY KEY ,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '7 days')
        )
        `)

    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
};

export default initDB;
