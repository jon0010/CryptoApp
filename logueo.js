

document.addEventListener("DOMContentLoaded", ()=> {

	const form = document.getElementById("formularioLogueo");
	const submitButton = document.getElementById("submit");
	const inputs = form.querySelectorAll("input");
	
	const checkForm = ()=> {

		let allFilled = true;


		/*inputs.forEach(input => {
			if (input.type !== "submit" && input.value.trim() === "") {

				allFilled = false;
				
			}

			submitButton.disabled = !allFilled;
			
		})*/

		/*const passwordLogin = document.getElementById("contraseña").value;
		
        if (passwordLogin === '') {

            allFilled = true;
        }*/

		submitButton.disabled = !allFilled;


	}
	
	inputs.forEach(input => {
		input.addEventListener("input", checkForm);

	})

	form.addEventListener("submit", (event)=> {
		
		event.preventDefault();

		const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        
        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        
		if (!correoPattern.test(correo)) {

			alert('Por favor, ingresa un e-mail válido.');
			return;

		}

		const contraseñaPattern = /^[^ ]{5,12}$/;

		if (contraseña.trim() === '') {
            alert('Por favor, ingrese su contraseña.');
            return;
        }

		if (!contraseñaPattern.test(contraseña)) {
            alert('Recuerde que la contraserña debe contener entre 5 y 12 caracteres.');
            return;
        }

        
        
		alert('Excelente. Ya te has logueado en el sistema');
    });

    checkForm();
});