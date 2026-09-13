export const validateParamId = (req, res, next) => {
  if (!req.params.id || req.params.id === '') {
    return res.status(400).json({ error: "El ID es requerido" });
  }

    if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }
  
  next();
};

