const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static("public"));

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
app.use("/api/prestamos", require("./routes/prestamos"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando! Prueba con /api/editora");
});

// Ruta para login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const usersPath = path.join(__dirname, "data", "usuario.json"); // Cambié el nombre de 'users.json' a 'usuario.json'

  // Verificar si el archivo de usuarios existe
  if (!fs.existsSync(usersPath)) {
    return res.status(500).json({ success: false, message: "Archivo de usuarios no encontrado" });
  }

  // Leer los usuarios
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const user = users.find(u => u.username === username && u.password === password);

  // Verificar si el usuario es correcto
  if (user) {
    res.json({ success: true, message: "Login correcto" });
  } else {
    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
