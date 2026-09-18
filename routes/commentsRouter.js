import { Router } from "express";
import { createComment, getAllComments, getCommentById, getCommentsByPostId, updateComment, deleteComment } from "../controllers/commentsControllers.js";
import { validateParamId } from "../middleware/validaParametros.js";    
const commentsRouter = Router();
//Obtener comentarios.
commentsRouter.get("/post/:post_id", getCommentsByPostId);  
commentsRouter.get("/:id", validateParamId, getCommentById); 
commentsRouter.get("/", getAllComments);   
//Crear un comentario.
commentsRouter.post("/", createComment);
//Actualizar comentario.
commentsRouter.put("/", validateParamId, updateComment);
commentsRouter.put("/:id", validateParamId, updateComment);
//Borrar comentario.
commentsRouter.delete("/:id", validateParamId, deleteComment);
commentsRouter.delete("/", validateParamId, deleteComment);
export default commentsRouter;


