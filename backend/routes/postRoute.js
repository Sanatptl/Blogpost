import express from "express";
import * as postController from "../controllers/postController.js";

const router = express.Router();

// router.get("/", postController.getPosts);
router
  .route("/:postId")
  .delete(postController.deletePost)
  .patch(postController.updatePost);

router.route("/").get(postController.getPosts).post(postController.createPost);

export default router;
