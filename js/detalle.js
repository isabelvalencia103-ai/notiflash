/* =========================================================
   detalle.js
   Muestra UNA sola noticia, la que venga en la URL.
   Ejemplo: detalle.html?id=3
   ========================================================= */

/**
 * Lee el parametro id de la direccion del navegador.
 * URLSearchParams sirve para leer lo que va despues del signo ?
 * Number() lo convierte de texto a numero, porque en el JSON el id es numero.
 */
function obtenerIdDeLaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return Number(parametros.get('id'));
}

/**
 * Pinta la noticia completa dentro del article #detalle.
 */
function mostrarDetalle(noticia) {
  const contenedor = document.getElementById('detalle');

  // Si el id no existe (por ejemplo detalle.html sin ?id=), avisamos
  if (!noticia) {
    contenedor.innerHTML = '<p class="texto-gris">No se encontró la noticia solicitada.</p>';
    return;
  }

  document.title = 'NotiFlash - ' + noticia.titulo;

  contenedor.innerHTML = `
    <span class="etiqueta">${noticia.categoria}</span>
    <h1>${noticia.titulo}</h1>
    <p class="detalle__datos">Por: ${noticia.autor} | ${noticia.fecha}</p>
    <img src="${noticia.imagen}" alt="${noticia.titulo}">
    <p class="detalle__contenido">${noticia.contenido}</p>
    <div class="detalle__acciones">
      <button class="btn" onclick="guardarEnFavoritos(${noticia.id})">Agregar a favoritos</button>
      <a href="contacto.html" class="btn btn--secundario">Contactar</a>
    </div>
  `;
}

/**
 * Guarda el id de la noticia en localStorage.
 * localStorage solo guarda texto, por eso se usa
 * JSON.stringify al guardar y JSON.parse al leer.
 */
function guardarEnFavoritos(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.includes(id)) {
    alert('Esta noticia ya está en tus favoritos');
    return;
  }

  favoritos.push(id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  alert('Noticia guardada en favoritos');
}

/**
 * Arranque: lee el id, busca la noticia y la muestra.
 * find() recorre el arreglo y devuelve el primer elemento que cumpla.
 */
async function iniciarDetalle() {
  const id = obtenerIdDeLaUrl();
  const noticias = await obtenerNoticias();
  const noticia = noticias.find(n => n.id === id);
  mostrarDetalle(noticia);
}

iniciarDetalle();