const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON donde se almacenan las editoras
const editorasFilePath = path.join(__dirname, "../data/editoras.json");

// Función para leer los datos correctamente desde editoras.json
const leerEditoras = () => {
  if (!fs.existsSync(editorasFilePath)) {
    return { editoras: [] }; // Si el archivo no existe, retorna un objeto con array vacío
  }
  try {
    const data = JSON.parse(fs.readFileSync(editorasFilePath, "utf8"));
    return Array.isArray(data.editoras) ? data : { editoras: [] };
  } catch (error) {
    console.error("Error al leer editoras.json:", error);
    return { editoras: [] };
  }
};

// Función para escribir los datos manteniendo la estructura original
const escribirEditoras = (editoras) => {
  fs.writeFileSync(editorasFilePath, JSON.stringify({ editoras }, null, 2), "utf8");
};

// Controlador para obtener todas las editoras
exports.obtenerEditoras = (req, res) => {
  const data = leerEditoras();
  res.json(data.editoras);
};

// Controlador para agregar una nueva editora
exports.agregarEditora = (req, res) => {
  const { descripcion, estado } = req.body;
  if (!descripcion || !estado) {
    return res.status(400).json({ error: "Descripción y estado son obligatorios" });
  }

  const data = leerEditoras();
  const nuevaEditora = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    estado: estado.trim(),
  };

  data.editoras.push(nuevaEditora);
  escribirEditoras(data.editoras);
  res.status(201).json(nuevaEditora);
};

// Controlador para actualizar una editora existente
exports.actualizarEditora = (req, res) => {
  const id = Number(req.params.id);
  const { descripcion, estado } = req.body;
  const data = leerEditoras();

  const index = data.editoras.findIndex((editora) => editora.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Editora no encontrada" });
  }

  if (descripcion) {
    data.editoras[index].descripcion = descripcion.trim();
  }
  if (estado) {
    data.editoras[index].estado = estado.trim();
  }

  escribirEditoras(data.editoras);
  res.json(data.editoras[index]);
};

// Controlador para eliminar una editora
exports.eliminarEditora = (req, res) => {
  const id = Number(req.params.id);
  const data = leerEditoras();

  const editorasFiltradas = data.editoras.filter((editora) => editora.id !== id);
  if (data.editoras.length === editorasFiltradas.length) {
    return res.status(404).json({ error: "Editora no encontrada" });
  }

  escribirEditoras(editorasFiltradas);
  res.json({ mensaje: "Editora eliminada con éxito" });
};
