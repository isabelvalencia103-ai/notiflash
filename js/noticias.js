/* =========================================================
   noticias.js
   Trae las noticias del archivo JSON y las pinta como tarjetas.
   ========================================================= */

/**
 * Trae las noticias del archivo data/noticias.json.
 * fetch pide el archivo y await espera a que llegue la respuesta.
 */
async function obtenerNoticias() {
  try {
    const respuesta = await fetch('data/noticias.json');
    const noticias = await respuesta.json();
    return noticias;
  } catch (error) {
    console.error('No se pudieron cargar las noticias:', error);
    return [];
  }
}

/**
 * Construye el HTML de UNA tarjeta a partir de un objeto noticia.
 */
function crearTarjeta(noticia) {
  return `
    <article class="card">
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <div class="card__cuerpo">
        <span class="etiqueta">${noticia.categoria}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descripcion}</p>
        <div class="card__acciones">
          <a href="detalle.html?id=${noticia.id}" class="btn">Ver más</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Pinta una lista de noticias dentro del contenedor indicado.
 * map() convierte cada noticia en HTML y join('') los une.
 */
function mostrarNoticias(lista, idContenedor) {
  const contenedor = document.getElementById(idContenedor);

  if (!contenedor) return;

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="texto-gris">No hay noticias para mostrar.</p>';
    return;
  }

  contenedor.innerHTML = lista.map(crearTarjeta).join('');
}

/**
 * Arranque del Home: muestra las tres primeras noticias.
 */
async function iniciarHome() {
  const noticias = await obtenerNoticias();
  const destacadas = noticias.slice(0, 3);
  mostrarNoticias(destacadas, 'grid-destacadas');
}

iniciarHome();