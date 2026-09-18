import { Router } from "express";
import authorsRouter from "./authorsRouter.js";
import postsRouter from "./postsRouters.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use("/api/authors", authorsRouter);
router.use("/api/posts", postsRouter);
router.use("/api/comments", commentsRouter);

export default router;