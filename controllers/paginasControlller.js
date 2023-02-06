import {Viaje} from "../models/Viaje.js";
import { Testomonial } from "../models/Testimoniales.js";


const paginaInicio = async (req, res) => { //req lo que enviamos o la peticion  - res - lo que express nos responde
    
    //consultar 3 viajes del modelo viaje 
   const promiseDb = [];
   promiseDb.push(Viaje.findAll( { limit: 3 } ));
   promiseDb.push(Testomonial.findAll( { limit: 3 } ));
   
    try{
        const resultado = await Promise.all( promiseDb );
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
            
        });
    }catch(error){
        console.log(error);
    }
   
}

const paginaNosotros = (req, res) => { 

    res.render('nosotros', {
        pagina: 'Nosotros'
    })

}
const paginaViajes = async (req, res) => { 

    //consultar la base de datos
    const viajes = await Viaje.findAll();
    

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes, 
    })
    
}

const paginaTestimoniales = async (req, res) => { 
    try{
        const testimoniales = await Testomonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
    
        })
    }catch(error){
        console.log(error);
    }
   
    
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

     const { slug } =  req.params;
    
    try{
        const resultado = await Viaje.findOne( { where: { slug: slug } } );

        return res.render('viaje', {
            pagina: 'Informacion de Viaje',
            resultado
        })
    }catch (error){
        console.log(error);
    }



    
}



export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}