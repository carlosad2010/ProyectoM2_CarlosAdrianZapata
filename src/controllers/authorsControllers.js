
import pool from "../db/config.js";

// Obtener todos los autores 
export const getAllAuthors = async (req, res,next) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY name");
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

//Obtener un autor por ID
export const getAuthorById = async (req, res,next) => {
  try {
    const result = await pool.query(`SELECT * FROM authors WHERE id = $1`, [req.params.id]);

    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);

  }
};

// Crear un nuevo autor
export const createAuthors = async (req, res,next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nombre y email son requeridos" });
    }

    const result = await pool.query(
      "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bio || null],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Actualizar un autor existente
export const updateAuthor = async (req, res,next) => {
    try {
      const { name, email, bio } = req.body;
      if(req.params.id === undefined || req.params.id === null || req.params.id === '') {
        return res.status(400).json({ error: 'ID del autor es requerido' });
      }
      const result = await pool.query(
        'UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *',
        [name, email, bio, req.params.id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error actualizando autor:', error);
      next(error);

    }
};

//Borrar un autor existente por ID
export const deleteAuthor = async (req, res,next) => {
  try {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando autor:', error);
    next(error);
  }
};


