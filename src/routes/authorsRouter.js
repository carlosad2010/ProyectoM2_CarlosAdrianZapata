import { Router } from "express";
import { createAuthors, getAllAuthors, getAuthorById, updateAuthor,deleteAuthor } from "../controllers/authorsControllers.js";
import { validateParamId } from "../middleware/validaParametros.js";
const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", getAuthorById);
authorsRouter.post("/", createAuthors);
authorsRouter.put("/", validateParamId, updateAuthor);
authorsRouter.put("/:id", validateParamId, updateAuthor);
authorsRouter.delete("/", validateParamId, deleteAuthor);
authorsRouter.delete("/:id", validateParamId, deleteAuthor);
export default authorsRouter;