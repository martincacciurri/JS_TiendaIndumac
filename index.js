// Cuando carga deberia ver si hay alguien logeado
// para poner en 0 el carrito ya que es 
// 1 carrito para 1 session
let carritoJSON = sessionStorage.getItem("carrito");
let carrito = JSON.parse(carritoJSON);
console.log('Este es el carrito de index.js: ' ,carrito)
carritoJSON = JSON.stringify(carrito);
console.log(carritoJSON)
sessionStorage.setItem("carrito", carritoJSON);


// Evento Load de la pagina que carga la temperatura con datos de API
window.addEventListener('load', ()=>{
	let lon;
	let lat;
	let iconoAnimado = document.getElementById('icono-animado');
	let ubicacion = document.getElementById('ubicacion'); 
	let temperatura = document.getElementById('temperatura');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition( posicion => {
			// console.log(posicion)
			lon = posicion.coords.longitude
			lat = posicion.coords.latitude

			// console.log('Longitud: ', lon);
			// console.log('Latitud: ', lat);

			const url='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&lang=es&units=metric&appid=e1f7b057b83e4fc5d1f56b22939b2d0c'
		
			// console.log('Resultado de la url: ',url)
			
			fetch(url)
				.then(response => {return response.json()})
				.then(data => {
					// console.log(data)
					// Obtengo datos de la API
					let temp = Math.round(data.main.temp)
					let ubi = data.name
					switch(data.weather[0].main){
						case 'Thunderstorm':
							iconoAnimado.src= 'animated/thunder.svg'
							// console.log('TORMENTA');
							break;
						case 'Drizzle':
							iconoAnimado.src= 'animated/rainy-2.svg'
							// console.log('LLOVIZNA');
							break;
						case 'Rain':
							iconoAnimado.src= 'animated/rainy-7.svg'
							// console.log('LLUVIA');
							break;
						case 'Snow':
							iconoAnimado.src= 'animated/snowy-6.svg'
							// console.log('NIEVE');
							break;
						case 'Clear':
							iconoAnimado.src= 'static/day.svg'
							// console.log('LIMPIO');
							break;
						case 'Atmosphere':
							iconoAnimado.src= 'animated/weather.svg'
							// console.log('ATMOSFERA');
							break;
						case 'Clouds':
							iconoAnimado.src= 'animated/cloudy-day-1.svg'
							// console.log('NUBES');
							break;
						default:
							iconoAnimado.src = 'animated/cloudy-day-1.svg'
							// console.log('por defecto');
					}
					// console.log("La temperatura obtenida es: ", temp)


					// Asigno los valores de los datos obtenidos por la API
					temperatura.textContent = temp + ' °C'
					ubicacion.textContent = ubi + ' '
				})
				.catch(error => {
					console.log(error)
				})
		})
	}
})

// Funcion de carrete
let swiper = new Swiper('.swiper-container', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	  breakpoints: {
		620: {
		  slidesPerView: 1,
		  spaceBetween: 20,
		},
		680: {
		  slidesPerView: 2,
		  spaceBetween: 40,
		},
		920: {
		  slidesPerView: 3,
		  spaceBetween: 40,
		},
		1240: {
		  slidesPerView: 4,
		  spaceBetween: 50,
		},

	} 
    }
    );

function usuarioEnLinea(){	
// Obtiene el usuario si esta logeado
let usuarioActivoJSON = sessionStorage.getItem("usuarioActivo");
let usuarioActivo = JSON.parse(usuarioActivoJSON);

if (usuarioActivo != null){
	document.getElementById("link-login").innerHTML = '<span class="nav-ayuda"><a class="nav-link" id="link-login-salir" href="index.html" style="padding-left: 105px; font-weight: 700; text-decoration:underline;">Salir</a></span>'
	$("#link-login-salir").click(function(){
		sessionStorage.clear();
	})
	Toastify({
		text:"Bienvenido " + usuarioActivo,
		duration: 5000,
		style:{
			background:"#42c968"
		},
	}).showToast();
}
else{
	Toastify({
		text:"¡Bienvenido! Recuerda logearte para poder comprar",
		duration: 5000,
		style:{
			background:"#53b0e6",
			fontSize: "14px"
		},
		// position: "left",
		// gravity: "bottom"
	}).showToast();
}
}

// Arreglo de objetos del tipo 'productos' (pasar a clase Producto)
let productos = [
	{id:1, descripcion: 'TALADRO PREC.- 13MM - 600W - REVERSIBLE', precio: 10000, img:'imagenes/01grande.jpg'},
	{id:2, descripcion: 'SOLDADORA MIG/MAG/MMA/TIG - MIG200P', precio: 110000, img:'imagenes/02grande.jpg'},
	{id:3, descripcion: 'LLAVE DE IMPACTO A BATERIA 18V FLEX ONE ION LITIO', precio: 30000, img:'imagenes/03grande.jpeg'},
	{id:4, descripcion: 'SOLDADORA INVERTER MMA250P-MONOF. 220VOLTS.-200AMP', precio: 30000, img:'imagenes/04grande.jpg'},
	{id:5, descripcion: 'AMOLADORA ANGULAR 710 W / 115 MM TOTAL', precio: 9750, img:'imagenes/05grande.jpg'},
	{id:6, descripcion: 'DISCO MULTITURBO DIAMANTADO 115MM HAMILTON', precio: 5000, img:'imagenes/06grande.jpg'}
];

let productosJSON = JSON.stringify(productos);
localStorage.setItem("productos",productosJSON);

// console.log(productosJSON);
// console.log(productos);

// Carga de productos
let descuento = 0.15; 
let precio = '';
let precio_con_dto = 0;
let precio_dto = '';
let productoId = 0;

function cargarProductos(){
	for(let i=0 ; i < productos.length ; i++){
		if(i== 0){			
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen1").innerHTML = productoImg;
			document.getElementById("productoID1").innerHTML = productoId;
			document.getElementById("precio1-descuento").innerHTML = precio;
			document.getElementById("precio1").innerHTML = precio_dto;
			document.getElementById("producto1").innerHTML = productos[i].descripcion;
		}
		if(i== 1){
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen2").innerHTML = productoImg;
			document.getElementById("productoID2").innerHTML = productoId;
			document.getElementById("precio2-descuento").innerHTML = precio;
			document.getElementById("precio2").innerHTML = precio_dto;
			document.getElementById("producto2").innerHTML = productos[i].descripcion;	
		}
		if(i== 2){
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen3").innerHTML = productoImg;
			document.getElementById("productoID3").innerHTML = productoId;
			document.getElementById("precio3-descuento").innerHTML = precio;
			document.getElementById("precio3").innerHTML = precio_dto;
			document.getElementById("producto3").innerHTML = productos[i].descripcion;
		}
		if(i== 3){
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen4").innerHTML = productoImg;
			document.getElementById("productoID4").innerHTML = productoId;
			document.getElementById("precio4-descuento").innerHTML = precio;
			document.getElementById("precio4").innerHTML = precio_dto;
			document.getElementById("producto4").innerHTML = productos[i].descripcion;
		}
		if(i== 4){
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen5").innerHTML = productoImg;
			document.getElementById("productoID5").innerHTML = productoId;
			document.getElementById("precio5-descuento").innerHTML = precio;
			document.getElementById("precio5").innerHTML = precio_dto;
			document.getElementById("producto5").innerHTML = productos[i].descripcion;
		}
		if(i== 5){
			let productoImg = productos[i].img;
			productoId = productos[i].id;
			precio_con_dto = productos[i].precio - (productos[i].precio * descuento);
			precio_dto = '$ ' + precio_con_dto.toString();
			precio = '$ ' + productos[i].precio.toString();
			document.getElementById("producto-imagen6").innerHTML = productoImg;
			document.getElementById("productoID6").innerHTML = productoId;
			document.getElementById("precio6-descuento").innerHTML = precio;
			document.getElementById("precio6").innerHTML = precio_dto;
			document.getElementById("producto6").innerHTML = productos[i].descripcion;
		}
	}
}

// Usuario en linea

usuarioEnLinea();

// Funcion que carga productos (se ejecuta siempre)
cargarProductos();

let btnComprarCarrete = document.querySelectorAll(".botonComprar");
for(let btn of btnComprarCarrete){
	btn.addEventListener("click", comprar);   // en lugar de comprar puede ser 'agregar a carrito'
}

// console.log(btnComprarCarrete);

// let carrito = [];
// let carrito_storage = [];
function comprar(e){

	// e.preventDefault();
	let hijo = e.target;
	let padre= hijo.parentNode;
	let abuelo= padre.parentNode;
	let bisabuelo=abuelo.parentNode;

	console.log("Se clickeo el boton", e.target);	
	console.log("Hijo", hijo);
	console.log("Padre", padre);
	console.log("Abuelo",abuelo);
	console.log("Bisabuelo", bisabuelo);

	let productoID = padre.querySelector("p").textContent;
	console.log("La maquina elegida es la: ", parseInt(productoID));

	// Arreglo JSON, para almacenear productos
	let productoIdJSON = JSON.stringify(productoID);
	localStorage.setItem("producto", productoIdJSON)
}

// Buscador
for(let i = 0; i < productos.length; i++){
	document.querySelector(".listaArticulos").innerHTML += '<li class="articulo"><span style="display: none;" id="productoIDbusqueda'+productos[i].id+'1">'+productos[i].id+'</span><a href="producto.html" class="botonVer">'+productos[i].descripcion+'</a></li>'
	
}


document.addEventListener("keyup", e=>{
	document.querySelector(".listaArticulos").style.display = 'block';
	document.querySelector('.div-compras-img').src ="imagenes/cancelarBusqueda.png"
	if (e.target.matches("#buscador")){
		
		if (e.key ==="Escape")e.target.value = ""
  
		document.querySelectorAll(".articulo").forEach(articulo =>{
			articulo.textContent.toLowerCase().includes(e.target.value.toLowerCase())
			  ?articulo.classList.remove("filtro")
			  :articulo.classList.add("filtro")
		})
  
	}
  
  
  })

  let logoBusqueda = document.querySelector('.div-compras-img')
  logoBusqueda.addEventListener("click", ()=>{
	document.getElementById("buscador").value = ""
	$('#listaArticulos').hide();
	logoBusqueda.src = "imagenes/buscar.png"
 })

 let btnVerProducto = document.querySelectorAll(".botonVer");
 for(let btnVer of btnVerProducto){
	btnVer.addEventListener("click", verProducto);   // en lugar de comprar puede ser 'agregar a carrito'
 }

 function verProducto(e){

	// e.preventDefault();
	let hijo = e.target;
	let padre= hijo.parentNode;
	let abuelo= padre.parentNode;
	let bisabuelo=abuelo.parentNode;

	console.log("Se clickeo el boton", e.target);	
	console.log("Hijo", hijo);
	console.log("Padre", padre);
	console.log("Abuelo",abuelo);
	console.log("Bisabuelo", bisabuelo);


	let productoID = padre.querySelector("span").textContent;
	console.log("La maquina elegida para ver es: ", parseInt(productoID));

	// Arreglo JSON, para almacenear productos
	let productoIdJSON = JSON.stringify(productoID);
	localStorage.setItem("producto", productoIdJSON)

 }