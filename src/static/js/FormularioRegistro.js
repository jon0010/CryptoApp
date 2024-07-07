
document.addEventListener("DOMContentLoaded", async()=> {

	const form = document.getElementById("formularioRegistro");
	const submitButton = document.getElementById("submit");
	const inputs = form.querySelectorAll("input");
	
	const checkForm = ()=> {

		let allFilled = true;
	
		/*inputs.forEach(input => {
			if (input.type !== "submit" && input.value.trim() === "") {
			
				allFilled = false;
	
			}
		})

		const password = document.getElementById("contraseña").value;
		const confirmPassword = document.getElementById("confirmarContraseña").value;

		if (password !== confirmPassword){
			allFilled = false;
		}*/
        

		submitButton.disabled = !allFilled;

	};

    const paisSelect = document.getElementById("pais");

    try {
        const response = await fetch("/api/countries");
        const paises = await response.json();
        paises.forEach(pais => {
            const option = document.createElement("option");
            option.value = pais.id;
            option.textContent = pais.nicename;
            if (pais.id === 10) { // Elije Arg como predilecto
                option.selected = true;
            }
            paisSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al obtener los países:", error);
    }
    
	

	inputs.forEach(input => {
		input.addEventListener("input", checkForm);

	});

	form.addEventListener("submit", async (event)=> {
		
		event.preventDefault();

		const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        const confirmarContraseña = document.getElementById('confirmarContraseña').value;
		const usuario = document.getElementById('user').value;
        const countryv = document.getElementById('pais').value;
        const namePattern = /^[a-z A-Z]{5,}$/;
        
		if (!namePattern.test(nombre) || !namePattern.test(apellido)) {
            alert('El nombre y el apellido deben tener al menos 5 letras y no contener números ni caracteres especiales.');
            return;
        }
        const correoPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        
		if (!correoPattern.test(correo)) {
            alert('Por favor, ingresa un e-mail válido.');
            return;
        }

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
        /*"nombre": nombre,
                "apellido": apellido,
                "email": correo,
                "password": contraseña,
				"user": usuario*/
		const response = await fetch("/api/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            	name: nombre,
            	lname: apellido,
                email: correo,
                pass: contraseña,
				user: usuario,
                country: countryv, 
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
        /*const data = await response.json();
        console.log(data.message);*/

		alert('Felicitaciones, te has registrado correctamente');
		
    });

    //checkForm();
});
