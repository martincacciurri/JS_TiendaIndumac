let usuarios = [
    {id:1, mail: 'admin',pass:'admin'},
    {id:2, mail: 'martin',pass:'martin'},
    {id:3, mail: 'cata',pass:'cata'}
];

let formulario = document.getElementById("formulario");
let btnLogin = document.getElementById("btnLogin");

formulario.addEventListener("submit", function(e){

    e.preventDefault();
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    console.log('Usuario', user);
    console.log('Pasword:',pass);
    validarUsuario(user,pass);

})

function validarUsuario(usuario, password){
    for(let i=0; i< usuarios.length ; i++){
        if(usuarios[i].mail == usuario && usuarios[i].pass == password)
        {
            console.log('Se logeo');
            let usuarioActivoJSON = JSON.stringify(usuario);
            sessionStorage.setItem("usuarioActivo", usuarioActivoJSON);
            window.location = "index.html";

            // Existe usuario registrado
            // creo el carrito por session
            let carrito = [];
            console.log(carrito)
            carritoJSON = JSON.stringify(carrito);
            console.log(carritoJSON)
            sessionStorage.setItem("carrito", carritoJSON);



        }
    }
}


