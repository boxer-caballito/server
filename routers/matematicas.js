const express = require('express');

const routerMatematicas = express.Router();

const {matematicas} = require('../datos/cursos.js').infoCursos;

routerMatematicas.use(express.json());

//matematicas

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
})

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;

    const resultado = matematicas.filter(materia => materia.tema === tema);

    if(resultado.length === 0) {
        return res.status(404).send(`No se encontraron cursos con el tema: ${tema}`)
    }

    res.send(JSON.stringify(resultado));
});

function validar (req, res, cursoNuevo) {
    if (cursoNuevo.id == '3' && cursoNuevo.titulo == 'geometria' && cursoNuevo.tema == "geometria" && cursoNuevo.vistas >= 0 && cursoNuevo.nivel == 'basico') {
        matematicas.push(cursoNuevo);
        return res.send(matematicas);
} else {
   return res.status(401).send(`Error, su informacion no es valida para agregar el nuevo curso: ${cursoNuevo}`)
} 
};

routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    validar(req, res, cursoNuevo);
});

routerMatematicas.put('/:id', (req, res) => {
    const id = req.params.id;
    const cursoActualizado = req.body;

    const indice = matematicas.findIndex(curso => curso.id == id);

    if (indice => 0) {
        matematicas[indice] = cursoActualizado
    }
   return res.send(matematicas);
});

routerMatematicas.patch('/:id', (req, res) => {
    const id = req.params.id;
    const infoActualizada = req.body;

    const indice = matematicas.findIndex(curso => curso.id == id);

    if (indice => 0) {
        const cursoAModificar = matematicas[indice];
        Object.assign(cursoAModificar, infoActualizada);
    }
    return res.status(200).send(matematicas);
});

module.exports = routerMatematicas;
