function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function quitarFavorito(id) {
  let favoritos = obtenerFavoritos();
  favoritos = favoritos.filter(idGuardado => idGuardado !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}

function crearFila(noticia) {
  return `
    <article class="fila">
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <div class="fila__info">
        <span class="etiqueta">${noticia.categoria}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descripcion}</p>
        <span class="fila__fecha">Guardada el ${noticia.fecha}</span>
      </div>
      <div class="fila__acciones">
        <a href="detalle.html?id=${noticia.id}" class="btn">Ver más</a>
        <button class="btn btn--quitar" onclick="quitarFavorito(${noticia.id})">Quitar</button>
      </div>
    </article>
  `;
}

async function mostrarFavoritos() {
  const ids = obtenerFavoritos();
  const noticias = await obtenerNoticias();
  const contenedor = document.getElementById('lista-favoritos');
  const aviso = document.getElementById('aviso');

  const guardadas = noticias.filter(noticia => ids.includes(noticia.id));

  if (guardadas.length === 0) {
    aviso.style.display = 'none';
    contenedor.innerHTML = '<div class="vacio">Todavía no has guardado noticias. Explora el listado y guarda las que más te gusten.</div>';
    return;
  }

  aviso.style.display = 'block';
  aviso.textContent = 'Tienes ' + guardadas.length + ' noticias guardadas. Si borras el historial del navegador la lista se pierde.';
  contenedor.innerHTML = guardadas.map(crearFila).join('');
}

mostrarFavoritos();