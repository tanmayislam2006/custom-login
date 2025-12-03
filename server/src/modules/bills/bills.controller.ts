import { Request, Response } from "express";
import { billServices } from "./bills.service";

const createBill = async (req: Request, res: Response) => {
  try {
    const result = await billServices.createBill(req.body);
    res.status(201).json({
      success: true,
      data: { ...result },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const billController = {
  createBill,
};
