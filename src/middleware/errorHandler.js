export function errorHandler(error, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error:`, error.message);

  // Errores de Base de Datos
  if (error.code === '23505') {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }
  
  if (error.code === '23503') {
    return res.status(404).json({ error: 'El autor especificado no existe' });
  }

  // Error por defecto
  res.status(500).json({ error: error.message || 'Error interno del servidor' });
}