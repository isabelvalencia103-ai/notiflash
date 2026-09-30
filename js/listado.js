let todasLasNoticias = [];

function filtrarPorCategoria(lista, categoria) {
  if (categoria === 'Todas') {
    return lista;
  }
  return lista.filter(noticia => noticia.categoria === categoria);
}

function filtrarPorTitulo(lista, texto) {
  const busqueda = texto.toLowerCase().trim();
  if (busqueda === '') {
    return lista;
  }
  return lista.filter(noticia => noticia.titulo.toLowerCase().includes(busqueda));
}

function ordenarNoticias(lista, criterio) {
  const copia = [...lista];
  if (criterio === 'recientes') {
    return copia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }
  if (criterio === 'antiguas') {
    return copia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }
  if (criterio === 'alfabetico') {
    return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }
  return copia;
}

function aplicarFiltros() {
  const categoria = document.querySelector('input[name="categoria"]:checked').value;
  const texto = document.getElementById('input-busqueda').value;
  const orden = document.getElementById('select-orden').value;

  let resultado = filtrarPorCategoria(todasLasNoticias, categoria);
  resultado = filtrarPorTitulo(resultado, texto);
  resultado = ordenarNoticias(resultado, orden);

  const contador = document.getElementById('contador');
  if (resultado.length === 1) {
    contador.textContent = 'Se encontró 1 noticia';
  } else {
    contador.textContent = 'Se encontraron ' + resultado.length + ' noticias';
  }

  mostrarNoticias(resultado, 'grid-noticias');
}

async function iniciarListado() {
  todasLasNoticias = await obtenerNoticias();
  aplicarFiltros();

  document.getElementById('btn-filtrar').addEventListener('click', aplicarFiltros);
  document.querySelectorAll('input[name="categoria"]').forEach(radio => {
    radio.addEventListener('change', aplicarFiltros);
  });
  document.getElementById('input-busqueda').addEventListener('keyup', aplicarFiltros);
  document.getElementById('select-orden').addEventListener('change', aplicarFiltros);
}

iniciarListado();