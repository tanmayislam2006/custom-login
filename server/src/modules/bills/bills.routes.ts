import { Router } from "express";
import { billController } from "./bills.controller";

const router=Router()
router.post('/create',billController.createBill)
export const billRoutes =router