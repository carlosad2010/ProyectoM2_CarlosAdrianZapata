export function validarEmail(email) {
  if (!email) {
    return "El email es requerido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "El formato del email es inválido";
  }

  return null;
}

export function validarNombre(nombre) {
  if (nombre === null || nombre === undefined) {
    return "El nombre es requerido";
  }

  if (typeof nombre !== "string") {
    return "El nombre debe ser un texto";
  }

  if (nombre.trim().length == 0) {
    return "El nombre no puede estar vacío";
  }

  if (nombre.trim().length < 2 || nombre.trim().length > 100) {
    return "El nombre debe tener entre 2 y 100 caracteres";
  }

  return null;
}

export function validarEdad(edad) {
  if (edad == undefined) {
    return null;
  }

  if (typeof edad !== "number" || isNaN(edad)) {
    return "La edad debe ser un número";
  }

  if (edad < 0 || edad > 150) {
    return "La edad debe estar entre 0 y 150";
  }

  return null;
}