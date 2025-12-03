import { Router } from "express";
import { billController } from "./bills.controller";

const router = Router();
router.post("/create", billController.createBill);
router.get("/:billId", billController.getBillInfo);
router.put("/:billId", billController.updateBillInfo);
router.delete("/:billId", billController.deleteBillInfo);
router.get("/user/:userId", billController.getBillsByUserId);
export const billRoutes = router;
