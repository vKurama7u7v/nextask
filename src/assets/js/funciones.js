

/*=====        =====*/

const formulario = document.getElementById("Grid__Form");
const inputs = document.querySelectorAll("#Grid__Form input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#$!%*?&])([A-Za-z\d$@#$!%*?&]|[^ ]){8,16}$/,
  /*
	Password
	
	La contraseña tiene que ser de 8 a 16 digitos, 
	Al menos una letra Mayúscula, 
	Al menos una letra Minuscula, 
	Al menos un número, 
	No debe contener espacios en blanco, 
	Al menos 1 caracter especial (@#$!%*?&).

	*/

  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
