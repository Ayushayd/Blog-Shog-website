import { login, register, logout, getMyProfile, getAllAuthors } from '../controllers/userController.js';
import express from 'express';
import { isAuthenticated, isAuthorized } from '../middleware/auth.js';

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout, isAuthenticated);
router.get("/myProfile", isAuthenticated, getMyProfile)
router.get("/authors", getAllAuthors)




export default router;