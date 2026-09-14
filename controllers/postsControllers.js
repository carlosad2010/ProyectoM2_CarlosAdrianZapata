
import pool from "../db/config.js";

//Obtener todos los posts
export const getAllPosts = async (req, res) => {
   const { published } = req.query;
    
    try {
      let query = 'SELECT * FROM posts';
      let params = [];
      
      if (published !== undefined) {
        query += ' WHERE published = $1';
        params.push(published === 'true');
      }
      
      query += ' ORDER BY created_at DESC';
      
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (error) {
      console.error('Error obteniendo posts:', error);
      res.status(500).json({ error: 'Error obteniendo posts' });
    }
};

//Obtener un post por ID
export const getPostById = async (req, res) => {
try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo post:', error);
    res.status(500).json({ error: 'Error obteniendo post' });
  }
};


//posts con detalle de su author
export const getPostByAuthorId = async (req, res) => {
try {
    const result = await pool.query(
      `SELECT title,content,name,email FROM posts as p 
      INNER JOIN authors a ON p.author_id = a.id WHERE a.id = $1`,[req.params.authorId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post con este autor no encontrado' });
    }
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo post para este autor:', error);
    res.status(500).json({ error: 'Error obteniendo post del autor' });
  }
};

//Crear un nuevo post
export const createPost = async (req, res) => {
      const { title, content, author_id, published } = req.body;
      
      if (!title || !content || !author_id) {
        return res.status(400).json({ 
          error: 'Título, contenido y author_id son requeridos' 
        });
      }
      
      try {
        const result = await pool.query(
          'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
          [title, content, author_id, published || false]
        );
        
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error creando post:', error);
        
        if (error.code === '23503') {
          return res.status(404).json({ error: 'El autor especificado no existe' });
        }
        
        res.status(500).json({ error: 'Error creando post' });
      }
    };

//Actualizar un post existente
export const updatePost = async (req, res) => {
    const { title, content, published } = req.body;
      
      try {
        const result = await pool.query(
          'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published) WHERE id = $4 RETURNING *',
          [title, content, published, req.params.id]
        );
        
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Post no encontrado' });
        }
        
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error actualizando post:', error);
        res.status(500).json({ error: 'Error actualizando post' });
      }
    };

//Eliminar un post

export const deletePost = async (req, res) => {
    try {
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1',
        [req.params.id]
    );
    
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json({ message: 'Post eliminado exitosamente' });
    } catch (error) {
    console.error('Error eliminando post:', error);
    res.status(500).json({ error: 'Error eliminando post' });
    }
};
    