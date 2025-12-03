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
const getBillInfo = async (req: Request, res: Response) => {
  const { billId } = req.params;
  try {
    const result = await billServices.getBillInfo(billId as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBillInfo = async (req: Request, res: Response) => {
  const { billId } = req.params;
  try {
    const result = await billServices.updateBillInfo(
      billId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBillInfo = async (req: Request, res: Response) => {
  const { billId } = req.params;
  try {
    const result = await billServices.deleteBillInfo(billId as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getBillsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await billServices.getBillsByUserId(userId as string);
    res.status(200).json({
      success: true,
      data: result,
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
  getBillsByUserId,
  getBillInfo,
  updateBillInfo,
  deleteBillInfo,
};
