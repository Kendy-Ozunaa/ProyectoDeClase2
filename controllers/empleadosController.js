const fs = require('fs');
const path = require('path');

const empleadosFilePath = path.join(__dirname, '../data/empleados.json');

const getEmpleados = () => {
    const data = fs.readFileSync(empleadosFilePath, 'utf-8');
    return JSON.parse(data);
};

const saveEmpleados = (empleados) => {
    fs.writeFileSync(empleadosFilePath, JSON.stringify(empleados, null, 2));
};

module.exports = {
    getEmpleados,
    saveEmpleados
};