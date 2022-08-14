// Esto esta bien, lo que esta en el localStorage es un arreglo
let productoJSON = localStorage.getItem("producto");
let productoID = JSON.parse(productoJSON);

// Esto esta mal porque lo que esta en el localStorage es un objeto
let productosJSON = localStorage.getItem("productos");
let productos = JSON.parse(productosJSON);

// Carga los datos del producto seleccionado
function cargarProducto(){

    console.log("Carga el producto");

    for(let i=0 ; i < productos.length ; i++){
        if(productos[i].id == productoID){
            // console.log(productos[i].id)
            document.getElementById("producto-img").innerHTML = '<img id="producto-img" style="max-width:400px" src='+productos[i].img+' alt=""></img>'
            document.getElementById("producto-precio-dto").innerHTML = '$ ' + (productos[i].precio - (productos[i].precio * 0.15));
            document.getElementById("producto-precio").innerHTML = '$ ' + productos[i].precio;
            document.getElementById("producto-nombre").innerHTML = productos[i].descripcion;
            break
        }

    }
}

// Cargo el producto en la pantalla
cargarProducto();

// Recupera el carrito por sesión
let carritoJSON = sessionStorage.getItem("carrito")
let carrito = JSON.parse(carritoJSON)

console.log(carrito)

const comprarProducto = document.querySelector(".boton-primario");
console.log(comprarProducto);

comprarProducto.addEventListener("click", ()=>{
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Gracias por su compra!',
        showConfirmButton: false,
        timer: 2500
      })
})


const agregarCarrito = document.querySelector(".boton-secundario");

agregarCarrito.addEventListener("click", ()=>{
    // Agrega producto al carrito
    carrito.push(parseInt(productoID))                                                
    console.log("Carrito:", carrito)
    Toastify({
        text: "Se agrego producto al carrito",
        duration: 5000,
        style:{
            background:"#1ab01d",
            fontSize: "16px"
        },
        position: "left",
        gravity: "bottom"
    }).showToast();

    
    let carritoJSON = JSON.stringify(carrito);
    console.log(carritoJSON)
    sessionStorage.setItem("carrito",carritoJSON);

})

