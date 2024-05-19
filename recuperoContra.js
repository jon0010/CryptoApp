document.addEventListener("DOMContentLoaded", ()=> {

	const form = document.getElementById("recuperoContraseña");
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
        
        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        
		if (!correoPattern.test(correo)) {

			alert('Por favor, ingresa un e-mail válido.');
			return;

		}
        
        
		alert('Te hemos enviado un e-mail que te ayudará a recuperar tu contraseña');
    });

    checkForm();
});