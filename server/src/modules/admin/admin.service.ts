import { pool } from "../../config/db";

const getAllUSers = async () => {
    const result=await pool.query(`SELECT * FROM users`);
    return result.rows;
};
export const adminServices = {
    getAllUSers
};