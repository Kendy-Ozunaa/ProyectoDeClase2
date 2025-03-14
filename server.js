const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
app.use("/api/tiposBibliografia", require("./routes/tiposBibliografia"));
app.use("/api/editora", require("./routes/editoraRoutes"));
app.use("/api/autores", require("./routes/autores"));
app.use("/api/libros", require("./routes/libros"));
app.use("/api/empleados", require("./routes/empleados")); // Nueva ruta para empleados

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando! Prueba con /api/editora");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});