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
const getBillInfo = async (billId: string) => {
  const result = await pool.query(`SELECT * FROM bills WHERE bill_id=$1`, [
    billId,
  ]);
  if (result.rows.length === 0) return { message: "can not find the bill" };
  return result.rows[0];
};
const updateBillInfo = async (
  billId: string,
  billInfo: Record<string, unknown>
) => {
  const { bill_type, organization, amount, due_date, status } = billInfo;
  const result = await pool.query(
    `UPDATE bills SET bill_type=$1, organization=$2, amount=$3, due_date=$4, status=$5 WHERE bill_id=$6 RETURNING *`,
    [bill_type, organization, amount, due_date, status, billId]
  );
  if (result.rows.length === 0) return { message: "something is wrong" };
  return { message: "bill updated successfully", data: result.rows[0] };
};

const deleteBillInfo = async (billId: string) => {
  const result = await pool.query(
    `DELETE FROM bills WHERE bill_id = $1 RETURNING *`,
    [billId]
  );
  if (result.rowCount === 0) {
    return {
      message: "No bill found with this ID",
    };
  }

  // Successfully deleted
  return {
    message: "Bill deleted successfully",
    deletedData: result.rows[0],
  };
};

const getBillsByUserId = async (userId: string) => {
  const result = await pool.query(`SELECT * FROM bills WHERE user_id=$1`, [
    userId,
  ]);
  return result.rows;
};
export const billServices = {
  createBill,
  getBillsByUserId,
  getBillInfo,
  updateBillInfo,
  deleteBillInfo,
};
