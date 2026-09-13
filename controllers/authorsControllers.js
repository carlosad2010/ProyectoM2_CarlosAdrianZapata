
import pool from "../db/config.js";

// Obtener todos los autores 
export const getAllAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY name");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error obteniendo autores:", error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

//Obtener un autor por ID
export const getAuthorById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM authors WHERE id = $1`, [req.params.id]);

    if (result.rows.length == 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo autor:", error);
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

// Crear un nuevo autor
export const createAuthors = async (req, res) => {
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
    console.error("Error creando post:", error);

    if (error.code == "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error creando post" });
  }
};

//Actualizar un autor existente
export const updateAuthor = async (req, res) => {
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
      
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
      
      res.status(500).json({ error: 'Error actualizando autor' });
    }
};

//Borrar un autor existente por ID
export const deleteAuthor = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando autor:', error);
    res.status(500).json({ error: 'Error eliminando autor' });
  }
};
