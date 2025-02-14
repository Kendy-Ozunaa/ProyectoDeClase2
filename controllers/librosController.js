const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/libros.json");

// Función para leer los datos
const leerDatos = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      return { libros: [] };
    }
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return { libros: [] };
  }
};

// Función para escribir los datos
const escribirDatos = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
    console.log("Datos guardados correctamente.");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
  }
};

// Obtener todos los libros
exports.obtenerLibros = (req, res) => {
  try {
    const data = leerDatos();
    res.json(data.libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros." });
  }
};

// Agregar un nuevo libro con todos los datos mínimos
exports.agregarLibro = (req, res) => {
  try {
    const data = leerDatos();
    const nuevoLibro = {
      id: Date.now(),
      descripcion: req.body.descripcion,
      signaturaTopografica: req.body.signaturaTopografica,
      isbn: req.body.isbn,
      tipoBibliografia: req.body.tipoBibliografia,
      autores: req.body.autores,
      editora: req.body.editora,
      anioPublicacion: req.body.anioPublicacion,
      ciencia: req.body.ciencia,
      idioma: req.body.idioma,
      estado: req.body.estado
    };

    // Validar que todos los campos sean obligatorios
    for (const key in nuevoLibro) {
      if (!nuevoLibro[key]) {
        return res.status(400).json({ error: `El campo ${key} es obligatorio.` });
      }
    }

    data.libros.push(nuevoLibro);
    escribirDatos(data);
    res.status(201).json({ mensaje: "Libro agregado correctamente.", libro: nuevoLibro });
  } catch (error) {
    res.status(500).json({ error: "Error interno al agregar el libro." });
  }
};

// Actualizar un libro
exports.actualizarLibro = (req, res) => {
  try {
    const data = leerDatos();
    const index = data.libros.findIndex((libro) => libro.id == req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    data.libros[index] = { ...data.libros[index], ...req.body };
    escribirDatos(data);
    res.json({ mensaje: "Libro actualizado correctamente.", libro: data.libros[index] });
  } catch (error) {
    res.status(500).json({ error: "Error interno al actualizar el libro." });
  }
};

// Eliminar un libro
exports.eliminarLibro = (req, res) => {
  try {
    const data = leerDatos();
    const filtrados = data.libros.filter((libro) => libro.id != req.params.id);

    if (data.libros.length === filtrados.length) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    data.libros = filtrados;
    escribirDatos(data);
    res.json({ mensaje: "Libro eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error interno al eliminar el libro." });
  }
};
