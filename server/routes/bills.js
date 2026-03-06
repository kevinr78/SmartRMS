import express from "express";
import {
  getBills,
  createBill,
  deleteBill,
  updateBill,
} from "../controllers/BillsController.js";
import verifyUser from "../middleware/requireAuth.js";

const router = express.Router();

router.use(verifyUser);

router.route("/").get(getBills).post(createBill);

router.route("/:id").delete(deleteBill).patch(updateBill);

export default router;
