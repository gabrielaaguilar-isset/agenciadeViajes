import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

//Conectarr a la base de datos

db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

    
//Definir puerto


const port = process.env.PORT || 4000;

//Hanilitarr pug
app.set('view engine', 'pug');

//obtteneer el annio actual
app.use((req, res, next) => {

   const year = new Date();

   res.locals.actualYear = year.getFullYear();
   res.locals.nombreSitio = 'Agencia de Viajes';
    
   next();
})

//Agregr body parse para leer los datos del formulario
app.use(express.urlencoded({extended: true}));



//Definir carpeta publica
app.use(express.static('public'));


//Agregar route
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puesto ${port}`);
})
