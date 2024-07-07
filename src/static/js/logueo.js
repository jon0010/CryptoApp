

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

	form.addEventListener("submit", async (event)=> {
		
		event.preventDefault();

		const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        
        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //ojo con esto
        
		/*if (!correoPattern.test(correo)) {

			alert('Por favor, ingresa un e-mail válido.');
			return;

		}*/ // Modificado esto para incoporar el usuario
		

		const contraseñaPattern = /^[^ ]{5,12}$/;
		if (correo.trim() === '') {
            alert('Por favor, ingrese su usuario o correo.');
            return;
        }

		if (contraseña.trim() === '') {
            alert('Por favor, ingrese su contraseña.');
            return;
        }

		if (!contraseñaPattern.test(contraseña)) {
            alert('Recuerde que la contraserña debe contener entre 5 y 12 caracteres.');
            return;
        }

        
        
		try {
            const response = await fetch("/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: correo,
                    pass: contraseña,
                })
            });

            const data = await response.json();
            if (response.ok) {
				console.log(data);
                alert('Excelente. Ya te has logueado en el sistema');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    checkForm();
});