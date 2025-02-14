  const fs = require("fs");
  const path = require("path");

  const dataPath = path.join(__dirname, "../data/biblioteca.json");

  const leerDatos = () => {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  };

  const escribirDatos = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
  };

  exports.obtenerTipos = (req, res) => {
    const data = leerDatos();
    res.json(data.tiposBibliografia);
  };

  exports.agregarTipo = (req, res) => {
    const data = leerDatos();
    const nuevoTipo = {
      id: Date.now(),
      descripcion: req.body.descripcion,
      estado: req.body.estado
    };

    data.tiposBibliografia.push(nuevoTipo);
    escribirDatos(data);
    res.status(201).json(nuevoTipo);
  };

  exports.actualizarTipo = (req, res) => {
    const data = leerDatos();
    const index = data.tiposBibliografia.findIndex((tipo) => tipo.id == req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Tipo de bibliografía no encontrado" });
    }

    data.tiposBibliografia[index] = { ...data.tiposBibliografia[index], ...req.body };
    escribirDatos(data);
    res.json(data.tiposBibliografia[index]);
  };

  exports.eliminarTipo = (req, res) => {
    const data = leerDatos();
    const filtrados = data.tiposBibliografia.filter((tipo) => tipo.id != req.params.id);

    if (data.tiposBibliografia.length === filtrados.length) {
      return res.status(404).json({ error: "Tipo de bibliografía no encontrado" });
    }

    data.tiposBibliografia = filtrados;
    escribirDatos(data);
    res.json({ mensaje: "Tipo de bibliografía eliminado" });
  };
