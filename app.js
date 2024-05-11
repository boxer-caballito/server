const express = require('express');
const app = express();

const {infoCursos} = require('./datos/cursos.js');

//Routers
//para definir paths o rutas y no repetir tanto codigo

const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion',routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

//Routing

app.get('/', (req, res) => {
    res.send('mi primer servidor con express . Cursos');
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`El servidor esta escuchando en el puerto: ${PORT}...`)
})

