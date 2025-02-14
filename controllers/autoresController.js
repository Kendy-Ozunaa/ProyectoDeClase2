const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/autores.json");

// Función para leer los datos de los autores
const leerDatos = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      // Si el archivo no existe, devuelve una lista vacía
      return { autores: [] };
    }
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data); // Parseo el archivo JSON
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return { autores: [] }; // Si hay un error, devolvemos lista vacía
  }
};

// Función para escribir datos en el archivo JSON
const escribirDatos = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
    console.log("Datos guardados correctamente.");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
  }
};

// Función para obtener todos los autores
exports.obtenerAutores = (req, res) => {
  try {
    const data = leerDatos();
    res.json(data.autores); // Enviar la lista de autores como respuesta
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los autores", detalle: error.message });
  }
};

// Función para agregar un nuevo autor
exports.agregarAutor = (req, res) => {
  try {
    // Asegúrate de que los datos necesarios estén presentes
    const { nombre, paisOrigen, idiomaNativo, estado } = req.body;

    if (!nombre || !paisOrigen || !idiomaNativo || !estado) {
      return res.status(400).json({ error: "Faltan datos requeridos (nombre, país origen, idioma nativo, estado)" });
    }

    const data = leerDatos();

    const nuevoAutor = {
      id: Date.now(), // Usamos el timestamp como identificador único
      nombre,
      paisOrigen,
      idiomaNativo,
      estado
    };

    data.autores.push(nuevoAutor);
    escribirDatos(data);
    res.status(201).json(nuevoAutor); // Respondemos con el autor agregado
  } catch (error) {
    res.status(500).json({ error: "Error al agregar autor", detalle: error.message });
  }
};

// Función para actualizar un autor existente
exports.actualizarAutor = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, paisOrigen, idiomaNativo, estado } = req.body;

    if (!nombre || !paisOrigen || !idiomaNativo || !estado) {
      return res.status(400).json({ error: "Faltan datos requeridos (nombre, país origen, idioma nativo, estado)" });
    }

    const data = leerDatos();
    const index = data.autores.findIndex((autor) => autor.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    // Actualizamos el autor con los nuevos datos
    data.autores[index] = { ...data.autores[index], nombre, paisOrigen, idiomaNativo, estado };
    escribirDatos(data);

    res.json(data.autores[index]); // Respondemos con el autor actualizado
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar autor", detalle: error.message });
  }
};

// Función para eliminar un autor
exports.eliminarAutor = (req, res) => {
  try {
    const { id } = req.params;
    const data = leerDatos();
    const nuevaLista = data.autores.filter((autor) => autor.id !== parseInt(id));

    if (data.autores.length === nuevaLista.length) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    data.autores = nuevaLista;
    escribirDatos(data);
    res.json({ mensaje: "Autor eliminado" }); // Mensaje de éxito
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar autor", detalle: error.message });
  }
};
