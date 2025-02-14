// URL base de la API para los Autores
const apiUrl = 'http://localhost:3000/api/autores';

// Función para obtener los autores
const obtenerAutores = async () => {
  try {
    const response = await fetch(apiUrl);
    const autores = await response.json();
    renderizarAutores(autores);
  } catch (error) {
    alert('Error al obtener autores: ' + error.message);
  }
};

// Función para renderizar la lista de autores
const renderizarAutores = (autores) => {
  const autoresList = document.getElementById('autoresList');
  autoresList.innerHTML = ''; // Limpiar la lista antes de renderizar
  autores.forEach(autor => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${autor.nombre} - ${autor.paisOrigen} - ${autor.idiomaNativo} - ${autor.estado}</span>
      <button class="delete" onclick="eliminarAutor(${autor.id})">Eliminar</button>
      <button class="edit" onclick="editarAutor(${autor.id})">Editar</button>
    `;
    autoresList.appendChild(li);
  });
};

// Función para agregar un nuevo autor
const agregarAutor = async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const paisOrigen = document.getElementById('paisOrigen').value;
  const idiomaNativo = document.getElementById('idiomaNativo').value;
  const estado = document.getElementById('estado').value;

  const nuevoAutor = { nombre, paisOrigen, idiomaNativo, estado };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoAutor)
    });

    if (!response.ok) {
      throw new Error('No se pudo agregar el autor');
    }

    await response.json();
    obtenerAutores(); // Recargar la lista
  } catch (error) {
    alert(error.message);
  }
};

// Función para eliminar un autor
const eliminarAutor = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el autor');
    }

    const data = await response.json();
    alert(data.mensaje);
    obtenerAutores(); // Recargar la lista
  } catch (error) {
    alert(error.message);
  }
};

// Función para editar un autor
const editarAutor = (id) => {
  const nombre = prompt("Nuevo nombre:");
  const paisOrigen = prompt("Nuevo país de origen:");
  const idiomaNativo = prompt("Nuevo idioma nativo:");
  const estado = prompt("Nuevo estado (activo/inactivo):");

  const autorActualizado = { nombre, paisOrigen, idiomaNativo, estado };

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(autorActualizado)
  })
  .then(response => response.json())
  .then(() => obtenerAutores())
  .catch(error => alert("Error al actualizar el autor: " + error.message));
};

// Evento de submit en el formulario
document.getElementById('autorForm').addEventListener('submit', agregarAutor);

// Obtener los autores cuando cargue la página
window.onload = obtenerAutores;
