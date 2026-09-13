import { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost} from "../controllers/postsControllers.js";
import { validateParamId } from "../middleware/validaParametros.js";
const postsRouter = Router();   

postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getPostById);
postsRouter.post("/", createPost);
postsRouter.put("/", validateParamId, updatePost);
postsRouter.put("/:id", validateParamId, updatePost);
postsRouter.delete("/", validateParamId, deletePost);  
postsRouter.delete("/:id", validateParamId, deletePost);  
export default postsRouter;


