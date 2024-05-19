
document.addEventListener("DOMContentLoaded", ()=> {

	const form = document.getElementById("formularioConsulta");
	const submitButton = document.getElementById("button");
	const inputs = form.querySelectorAll("input");
	
	const checkForm = ()=> {

		let allFilled = true;

		submitButton.disabled = !allFilled;


	}
	
	inputs.forEach(input => {
		input.addEventListener("input", checkForm);

	})

	form.addEventListener("submit", (event)=> {
		
		event.preventDefault();

		const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;

        const namePattern = /^[a-z A-Z]{5,}$/;
        
		if (!namePattern.test(nombre)) {
            alert('El nombre debe tener al menos 5 letras y no contener números ni caracteres especiales.');
            return;
        }

        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        
		if (!correoPattern.test(correo)) {

			alert('Por favor, ingresa un e-mail válido.');
			return;

		}
        
        
		alert('Tu consulta ya fue enviada!');
        
    });

    checkForm();
});