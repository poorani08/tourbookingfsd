import express from "express";
import {verifyUser,verifyAdmin} from '../utils/verifyToken.js';
import { createBooking, getBooking, getallBooking } from "../controllers/bookingcontroller.js";
const router=express.Router();
router.post("/",verifyUser,createBooking)
router.get("/:id",verifyUser,getBooking)
router.get("/",verifyAdmin,getallBooking)

export default router;
