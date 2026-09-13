import { Router } from "express";
import authorsRouter from "./authorsRouter.js";
import postsRouter from "./postsRouters.js";

const router = Router();

router.use("/api/authors", authorsRouter);
router.use("/api/posts", postsRouter);

export default router;