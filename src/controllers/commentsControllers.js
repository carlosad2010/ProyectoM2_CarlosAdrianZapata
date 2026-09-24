import pool from "../db/config.js";

//Obtener todos los comentarios
export const getAllComments = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM comments ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
};

//obtener un comentario por ID
export const getCommentById = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM comments WHERE id = $1", [req.params.id]);   
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};  
//Obtener Comentarios de un Post por ID
export const getCommentsByPostId = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC", [req.params.post_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo comentario
export const createComment = async (req, res, next) => {
    try {   
    const { content, post_id, commenter_name, commenter_email } = req.body;
    if (!content || !post_id || !commenter_name) {
        return res.status(400).json({ message: "Faltan campos requeridos: Contenido, ID de la publicación o nombre del comentarista" });
    }    

    const result = await pool.query(
        "INSERT INTO comments (content, post_id, commenter_name, commenter_email) VALUES ($1, $2, $3, $4) RETURNING *",
        [content, post_id, commenter_name, commenter_email || null]
    );
    res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}   

// Actualizar un comentario existente
export const updateComment = async (req, res, next) => {
    try {
        const { content, commenter_name, commenter_email } = req.body;
        if(req.params.id === undefined || req.params.id === null || req.params.id === '') {
            return res.status(400).json({ error: 'ID del comentario es requerido' });
        }
            
        const result = await pool.query(
            "UPDATE comments SET content = COALESCE($1, content), commenter_name = COALESCE($2, commenter_name), commenter_email = COALESCE($3, commenter_email) WHERE id = $4 RETURNING *",
            [content, commenter_name, commenter_email, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

//borrar un comentario existente
export const deleteComment = async (req, res, next) => {
    try {
        if(req.params.id === undefined || req.params.id === null || req.params.id === '') {
            return res.status(400).json({ error: 'ID del comentario es requerido' });
        }

        const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
