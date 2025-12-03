import { pool } from "../../config/db";

const createBill = async (billInfo: Record<string, unknown>) => {
  const { user_id, bill_type, organization, amount, due_date } = billInfo;
  const result = await pool.query(
    `INSERT INTO bills(user_id,bill_type,organization,amount,due_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [user_id, bill_type, organization, amount, due_date]
  );
  if (result.rows.length === 0) return { message: "something is wrong" };
  return { message: "bill created successfully" };
};
export const billServices = {
  createBill,
};
