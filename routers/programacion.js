const express = require('express');

const routerProgramacion = express.Router();

const {programacion} = require('../datos/cursos.js').infoCursos;

//MIDDLEWARE

// las funciones middleware se ejecutan cuando:
//-Despues de recibir una solicitud.
//-antes de recibir una respuesta
routerProgramacion.use(express.json());

//programacion
routerProgramacion.get('/', (req, res) => {
  res.send(programacion);
});

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

  if(resultados.length === 0) {
      return res.status(404).send(`No se encontraron cursos con el lenguaje: ${lenguaje}`)
  }

  //parametros querry
  /* son para espeficar alguna filtracion de datos por
  medio de esos parametros */

  //parametro querry "ordenar por vistas"
  if (req.query.ordenar === 'vistas') {
     return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)))
  }else {
      return res.send(resultados);
  }

  //--->  reto de ordenar por vistas por solicitudes querry

  res.send(JSON.stringify(resultados));
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;

  const nivel = req.params.nivel;

  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

  if (resultados.length === 0) {
     return res.status(404).send(`no se encontraron lecciones con el lenguaje ${lenguaje} y el nivel ${nivel}`);
  }

  res.status(200).send(resultados);
});

routerProgramacion.post('/', (req, res) => {
  //Extraemos el cuerpo de la solicitud
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  return res.send(programacion);
});

routerProgramacion.put('/:id', (req, res) => {
const cursoActualizado = req.body;
const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice => 0) {
    programacion[indice] = cursoActualizado;
  }

  res.send(programacion);
})


routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice => 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }

  res.send(programacion);
});

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);

  if (indice === 0) {
    programacion.splice(indice, 1);
  }

 return res.send(programacion);
});

module.exports = routerProgramacion