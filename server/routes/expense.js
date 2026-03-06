import express from "express";
import * as ExpenseController from "../controllers/ExpenseController.js";
import verifyUser from "../middleware/requireAuth.js"; // Assuming this middleware exists

const router = express.Router();

// All routes below this point are protected and require a logged-in user.
// router.use();

router.post("/", verifyUser, ExpenseController.createExpense);
router.get("/", verifyUser, ExpenseController.getExpenses);
router.patch("/:id", verifyUser, ExpenseController.editExpense);
router.delete("/:id", verifyUser, ExpenseController.deleteExpense);
/* 

// Only household admins can update or delete the household.
router.patch(
  "/",
  verifyUser,
  HouseholdController.protectAdminRoutes,
  HouseholdController.updateHousehold
);

router.delete(
  "/:id",
  verifyUser,
  HouseholdController.protectAdminRoutes,
  HouseholdController.deleteHousehold
); */

export default router;
