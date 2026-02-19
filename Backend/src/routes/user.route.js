//routers are the paths for a specific request made on a user side.
import {Router} from 'express';
import {loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
console.log("User route loaded");
const router=Router();
//router.route('/register').post(registerUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;