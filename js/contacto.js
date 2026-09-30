/* =========================================================
   contacto.js
   Valida el formulario de contacto antes de "enviarlo".
   ========================================================= */

/**
 * Muestra el mensaje de error debajo de un campo
 * y le pone el borde rojo.
 */
function mostrarError(idCampo, mensaje) {
  document.getElementById(idCampo).classList.add('invalido');
  document.getElementById('error-' + idCampo).textContent = mensaje;
}

/**
 * Borra todos los errores antes de volver a validar.
 */
function limpiarErrores() {
  const campos = ['nombre', 'correo', 'asunto', 'mensaje', 'acepto'];
  campos.forEach(campo => {
    const elemento = document.getElementById(campo);
    if (elemento) elemento.classList.remove('invalido');
    document.getElementById('error-' + campo).textContent = '';
  });
}

/**
 * Revisa todos los campos. Devuelve true si todo esta bien.
 * La expresion regular comprueba que haya texto, arroba,
 * texto, punto y texto.
 */
function validarFormulario() {
  limpiarErrores();
  let esValido = true;

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const acepto = document.getElementById('acepto').checked;

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nombre === '') {
    mostrarError('nombre', 'El nombre es obligatorio');
    esValido = false;
  }

  if (correo === '') {
    mostrarError('correo', 'El correo es obligatorio');
    esValido = false;
  } else if (!patronCorreo.test(correo)) {
    mostrarError('correo', 'Ingresa un correo válido (debe contener @ y dominio)');
    esValido = false;
  }

  if (asunto === '') {
    mostrarError('asunto', 'El asunto es obligatorio');
    esValido = false;
  }

  if (mensaje.length < 10) {
    mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
    esValido = false;
  }

  if (!acepto) {
    document.getElementById('error-acepto').textContent = 'Debes aceptar el tratamiento de datos';
    esValido = false;
  }

  return esValido;
}

/**
 * Borra el formulario y esconde la confirmacion.
 */
function limpiarFormulario() {
  document.getElementById('form-contacto').reset();
  limpiarErrores();
  document.getElementById('confirmacion').style.display = 'none';
}

// Se ejecuta cuando el usuario presiona "Enviar mensaje"
document.getElementById('form-contacto').addEventListener('submit', function(evento) {
  evento.preventDefault(); // evita que la pagina se recargue

  if (!validarFormulario()) {
    return; // si hay errores, no sigue
  }

  document.getElementById('confirmacion').style.display = 'block';
  document.getElementById('form-contacto').reset();
});