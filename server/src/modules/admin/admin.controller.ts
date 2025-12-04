import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllUSers = async (req: Request, res: Response) => {
    console.log(req.user);
  try {
    const result = await adminServices.getAllUSers();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users" + error.message,
    });
  }
};
export const adminController = {
  getAllUSers
};
