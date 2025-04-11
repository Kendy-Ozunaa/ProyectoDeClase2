const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/prestamos.json");

// Leer los datos
const leerDatos = () => {
  try {
    if (!fs.existsSync(dataPath)) return { prestamos: [] };
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer los datos:", error);
    return { prestamos: [] };
  }
};

// Escribir los datos
const escribirDatos = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
    console.log("Datos de préstamo actualizados.");
  } catch (error) {
    console.error("Error al escribir datos:", error);
  }
};

// Obtener todos los préstamos
exports.obtenerPrestamos = (req, res) => {
  const data = leerDatos();
  res.json(data.prestamos);
};

// Agregar un nuevo préstamo
exports.agregarPrestamo = (req, res) => {
  const data = leerDatos();

  const libroInfo = req.body.libro?.split(" - ") || [];

  const nuevo = {
    id: Date.now(),
    usuario: req.body.usuario,
    carnet: req.body.cedula || req.body.carnet || "No definido",
    libroId: libroInfo[0]?.trim() || "000",
    tituloLibro: libroInfo[1]?.trim() || req.body.libro || "Sin título",
    ciencia: req.body.ciencia,
    fechaPrestamo: req.body.fechaPrestamo,
    fechaDevolucion: req.body.fechaDevolucion || "", // AHORA SE GUARDA
    estado: "Prestado"
  };

  const camposObligatorios = ["usuario", "carnet", "libroId", "tituloLibro", "ciencia", "fechaPrestamo", "fechaDevolucion"];
  for (const campo of camposObligatorios) {
    if (!nuevo[campo]) {
      return res.status(400).json({ error: `El campo '${campo}' es obligatorio.` });
    }
  }

  data.prestamos.push(nuevo);
  escribirDatos(data);
  res.status(201).json({ mensaje: "Préstamo registrado.", prestamo: nuevo });
};

// Registrar devolución
exports.registrarDevolucion = (req, res) => {
  const data = leerDatos();
  const index = data.prestamos.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Préstamo no encontrado" });
  }

  data.prestamos[index].fechaDevolucion = new Date().toISOString().split("T")[0];
  data.prestamos[index].estado = "Devuelto";

  escribirDatos(data);
  res.json({ mensaje: "Devolución registrada.", prestamo: data.prestamos[index] });
};

// Filtro mejorado
exports.filtrarPrestamos = (req, res) => {
  const data = leerDatos();
  const { usuario = "", estado = "", ciencia = "", libro = "" } = req.query;

  let filtrados = data.prestamos;

  if (usuario.trim()) {
    filtrados = filtrados.filter(p =>
      p.usuario?.toLowerCase().includes(usuario.toLowerCase()) ||
      p.carnet?.toLowerCase().includes(usuario.toLowerCase())
    );
  }

  if (estado.trim()) {
    filtrados = filtrados.filter(p =>
      p.estado?.toLowerCase() === estado.toLowerCase()
    );
  }

  if (ciencia.trim()) {
    filtrados = filtrados.filter(p =>
      p.ciencia?.toLowerCase().includes(ciencia.toLowerCase())
    );
  }

  if (libro.trim()) {
    filtrados = filtrados.filter(p =>
      p.tituloLibro?.toLowerCase().includes(libro.toLowerCase())
    );
  }

  res.json(filtrados);
};
