import express from "express";
import authCtrl from '../controllers/authController.js'

const router = express.Router()

router.get("/accessUser",  authCtrl.accessUser);
router.post("/register",  authCtrl.register);
router.post("/login",  authCtrl.login);

export default router;
