import express from "express";
import * as choreController from "../controllers/ChoreController.js";
import verifyUser from "../middleware/requireAuth.js"; // Assuming this middleware exists

const router = express.Router();

// All chore routes require authentication
router.use(verifyUser);

router
  .route("/")
  .get(choreController.getAllChores)
  .post(choreController.createChore);

router
  .route("/:id")
  .patch(choreController.updateChore)
  .delete(choreController.deleteChore);

export default router;
