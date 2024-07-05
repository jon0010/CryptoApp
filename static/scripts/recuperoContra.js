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

	form.addEventListener("submit", async (event)=> {
		
		event.preventDefault();

		const correo = document.getElementById('correo').value;
		
        const contraseña = document.getElementById('contraseña').value;
        const confirmarContraseña = document.getElementById('confirmarContraseña').value;

        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
		const contraseñaPattern = /^[^ ]{5,12}$/;

		if (!contraseñaPattern.test(contraseña)) {
            alert('Por favor, ingresa una contraseña valida. Debe contener entre 5 y 12 caracteres.');
            return;
        }

        if (contraseña.trim() === '' || confirmarContraseña.trim() === '') {
            alert('Por favor, ingresa y confirma tu contraseña.');
            return;
        }

        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no coinciden.');
            return;
        }
		
		//lo hago así sin id porque no puedo mandar el correo sino
        const response = await fetch(`http://localhost:5000/api/change_pass`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            	password: contraseña,
				identificador: correo,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

		
    });

    checkForm();
});