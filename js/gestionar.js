/* =========================================================
   gestionar.js
   Mini CRUD: crear y eliminar noticias.
   ========================================================= */

function obtenerCreadas() {
  return JSON.parse(localStorage.getItem('noticiasCreadas')) || [];
}

async function obtenerTodas() {
  const originales = await obtenerNoticias();
  const creadas = obtenerCreadas();
  return [...originales, ...creadas];
}

function eliminarNoticia(id) {
  const seguro = confirm('¿Seguro que desea eliminar esta noticia? Esta acción no se puede deshacer.');
  if (!seguro) return;

  let creadas = obtenerCreadas();
  creadas = creadas.filter(noticia => noticia.id !== id);
  localStorage.setItem('noticiasCreadas', JSON.stringify(creadas));
  mostrarTabla();
}

async function mostrarTabla() {
  const noticias = await obtenerTodas();
  const creadas = obtenerCreadas();
  const cuerpo = document.getElementById('tabla-noticias');

  cuerpo.innerHTML = noticias.map((noticia, posicion) => {
    const esCreada = creadas.some(c => c.id === noticia.id);
    const boton = esCreada
      ? `<button class="btn btn--eliminar" onclick="eliminarNoticia(${noticia.id})">Eliminar</button>`
      : `<span class="td-origen">Original</span>`;

    return `
      <tr>
        <td>${posicion + 1}</td>
        <td class="td-titulo">${noticia.titulo}<br><span class="td-origen">${esCreada ? 'creada por el usuario' : 'del archivo de datos'}</span></td>
        <td>${noticia.categoria}</td>
        <td>${noticia.fecha}</td>
        <td>${boton}</td>
      </tr>
    `;
  }).join('');
}

function validarNoticia() {
  const campos = ['titulo', 'categoria', 'descripcion', 'contenido'];
  let esValido = true;

  campos.forEach(campo => {
    document.getElementById(campo).classList.remove('invalido');
    document.getElementById('error-' + campo).textContent = '';
  });

  campos.forEach(campo => {
    if (document.getElementById(campo).value.trim() === '') {
      document.getElementById(campo).classList.add('invalido');
      document.getElementById('error-' + campo).textContent = 'Este campo es obligatorio';
      esValido = false;
    }
  });

  return esValido;
}

document.getElementById('form-noticia').addEventListener('submit', function(evento) {
  evento.preventDefault();

  if (!validarNoticia()) return;

  const creadas = obtenerCreadas();

  const nueva = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value.trim(),
    categoria: document.getElementById('categoria').value,
    imagen: document.getElementById('imagen').value.trim() || 'img/noticia1.jpg',
    descripcion: document.getElementById('descripcion').value.trim(),
    contenido: document.getElementById('contenido').value.trim(),
    fecha: new Date().toISOString().slice(0, 10),
    autor: 'Usuario'
  };

  creadas.push(nueva);
  localStorage.setItem('noticiasCreadas', JSON.stringify(creadas));

  this.reset();
  alert('Noticia guardada correctamente');
  mostrarTabla();
});

mostrarTabla();