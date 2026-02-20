import {Router} from 'express';
import { createPost, getPost,updatePost, deletePost } from '../controllers/post.controller.js';

const router = Router();
router.post("/create", createPost);
router.get("/get", getPost);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
export default router;