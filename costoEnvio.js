const precio_por_km = 10;

let envios = [
    {codpostal:2000,ciudad:"Rosario",distancia:165},
    {codpostal:5000,ciudad:"Cordoba",distancia:300},
    {codpostal:1000,ciudad:"CABA",distancia:400}
];

let btnCalcularCostoEnvio = document.querySelector('.boton-primario')

btnCalcularCostoEnvio.addEventListener("click", ()=>{
    let codigo_postal = document.getElementById("codigo_postal").value;
    let costo = 0;
    // Busco el codigo postal ingresado en la coleccion de codigos postales
    for(let i=0 ; i < envios.length ; i++){
        codigo_postal = parseInt(codigo_postal);
        if( envios[i].codpostal == codigo_postal){
            costo = envios[i].distancia * precio_por_km;
            document.getElementById("muestro-total").innerHTML = 
            '<div class="costo-envio">' +
            '<img src="imagenes/envios1.png" alt="">' +
            '<h5 class= "resultado-costo" id="resultado-costo">ARS$ ' +costo+'.-</h5>' +
            '</div>'
            break
        }
        else
        {
            // color cara = #E53A3A
            document.getElementById("muestro-total").innerHTML = 
            '<div class="costo-envio">' +
            '<img src="imagenes/sad.png" alt="">' +
            '<h5 class= "resultado-costo-fuera-alcance" id="resultado-costo"> ¡Lo sentimos! Tu localidad esta fuera de nuestro alcance</h5>' +
            '</div>'
        }
    }

    // Si no encontro nada recorriendo el arreglo, emito alerta
    




})
