// Obtengo el arreglo "carrito" que tiene los ids de los productos que agrego el usuario
let carritoJSON = sessionStorage.getItem("carrito");
let carrito = JSON.parse(carritoJSON);
console.log(carritoJSON);
console.log(carrito);

// Obtengo el localStorage de 'productos'
let productosJSON = localStorage.getItem("productos");
let productos = JSON.parse(productosJSON);


// actualizarPrecio(carrito);
let total = 0;
for(const item of carrito){
    
    // console.log('El item en el carrito es: ' , item)
    for(let i= 0; i < productos.length ; i ++){
        
        if(item == productos[i].id){

            // Precio con descuento
            let preDescuento = productos[i].precio - (productos[i].precio*0.15)

            total += preDescuento

            




            // console.log("El producto almacenado es: ", productos[i].id)
            document.querySelector(".lista-producto-carrito").innerHTML += 
            '<li class="producto-carrito">'
            +'<div class="id-oculto">'+ productos[i].id+'</div>'
            +'<img style="padding: 10px; height: 100px;" src="'+productos[i].img+'" alt="">'
            + '<div class="detalle-carrito">'
            +' <p class="producto-descripcion">'+productos[i].descripcion+'</p>'
            +' <p class="producto-precio">'+preDescuento+'</p>'
            // +' <p class="producto-cantidad">x 3</p>'
            + '</div>'
            +' <a class="borrar-elemento" href="">'
            +' <img style="height: 40px;" src="imagenes/quitar-producto.png" alt="">'
            +' </a>'
            
            +'</li>'
        }
    }
    document.querySelector(".totalSuma").innerHTML = total;
}

// Borrar producto del carrito
let btnBorrar = document.querySelectorAll(".borrar-elemento");
for(let btn of btnBorrar){
	btn.addEventListener("click", borrar);  
}

// La funcion borrar toma en cuenta los productos antes y despues de borrar y resta del carrito 
function borrar(e){
    e.preventDefault();
	let hijo = e.target;
	let padre= hijo.parentNode;
	let abuelo= padre.parentNode;
    let antes = [];
    devolverItems(antes)
    console.log("Antes: " , antes)
    abuelo.remove();
    let despues = [];
    devolverItems(despues)
    console.log("Despues: ", despues)
    let result = antes.filter(el => !despues.includes(el));
    console.log("Resultado: " ,result);
    let arreglonumerico = [];
    for(i = 0; i < result.length ; i++){
        let itemNumerico = parseInt(result[i])
        arreglonumerico.push(itemNumerico)
    }
    actualizarCarrito(arreglonumerico);


    console.log('Arreglo numerico', arreglonumerico)
    // Actualiza el precio total del carrito
    actualizarPrecio(arreglonumerico);
}

// Devuelve los id de productos (items) que hay en el carrito al momento de ser llamado
function devolverItems(arreglo){
// Necesito a todos los elementos que tengan la clase producto-carrito
let items = document.querySelectorAll(".producto-carrito")
// Por cada item que me busque los valores de la etiqueta
items.forEach(item => {
    const valorId = item.querySelector(".id-oculto")
    const id = valorId.textContent;
    arreglo.push(id)
})
// console.log("El arreglo final es", arreglo)
return arreglo;
}


function actualizarCarrito(arr){
    // console.log("Carrito:" ,carrito)
    // console.log("arr: ", arr)
    let arregloFinal = carrito.filter(el => !arr.includes(el));
    // console.log("Arreglo final: " ,arregloFinal);
    carrito = [];
    arregloFinal.forEach(element => carrito.push(parseInt(element)))
    let carritoJSON = JSON.stringify(carrito);
    // console.log("Carrito json: ", carritoJSON)
    sessionStorage.setItem("carrito",carritoJSON);

    actualizarPrecio();

}

// To-Do 
function actualizarPrecio(){
    let total = 0;
    let items = document.querySelectorAll(".producto-carrito");
    // Por cada item que me busque los valores de la etiqueta
    items.forEach(item => {
        let precioProducto = item.querySelector(".producto-precio");        
        total += parseInt(precioProducto.textContent)
})
document.querySelector('.totalSuma').innerHTML = total;
}



const comprarCarrito = document.querySelector(".boton-primario");

comprarCarrito.addEventListener("click", ()=>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Gracias por su compra!',
        showConfirmButton: false,
        timer: 2500
      })

      setTimeout(() => {
        window.location.href = "index.html"
      }, 3000)


   
});