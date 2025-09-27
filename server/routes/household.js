import express from 'express';
import * as HouseholdController from '../controllers/HouseholdController.js';
import verifyUser from '../middleware/requireAuth.js'; // Assuming this middleware exists

const router = express.Router();

// All routes below this point are protected and require a logged-in user.
// router.use();

router.post('/',verifyUser ,HouseholdController.createHousehold);

router.get('/',verifyUser, HouseholdController.getHousehold);

// Only household admins can update or delete the household.
router.patch(
    '/:id', verifyUser,
    HouseholdController.protectAdminRoutes, 
    HouseholdController.updateHousehold
);

router.delete(
    '/:id', verifyUser,
    HouseholdController.protectAdminRoutes, 
    HouseholdController.deleteHousehold
);

export default router;
