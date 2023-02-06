import { Testomonial } from "../models/Testimoniales.js";

const  guardarTestimoniales = async (req, res) => {
    //Validar
    const {nombre, correo, mensaje} = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje: 'el nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'el correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'el mensaje esta vacio'});
    }


    if(errores.length > 0){
        //consultar testimoniales existente
        const testimoniales = await Testomonial.findAll();
        //mostrr la vista con errores

        res.render('testimoniales', {
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })

        
    }else{
        //almacenar en la base de datos
        
        try{
            
            await Testomonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales')

        }catch(error){
            console.log(error);
        }

    }

}

export{
    guardarTestimoniales
}