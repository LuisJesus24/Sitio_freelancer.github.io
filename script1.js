document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        name: name,
        number: number,
        email: email,
        message: message
    };

    // Verifica que los datos estén siendo capturados correctamente
    console.log(formData);

    const form = document.querySelector('.formulario');

    fetch('http://localhost:8080/Messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) { // Si la respuesta no es OK, lanzamos un error
            throw new Error('Bad Request');
        }
        return response.json();  // Si todo está bien, pasamos a leer la respuesta
    })
    .then(data => {
        console.log('Éxito:', data);

        // Crear el mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.textContent = '¡Los datos se enviaron con éxito!';
        successMessage.style.backgroundColor = 'green';
        successMessage.style.color = 'white';
        successMessage.style.padding = '10px';
        successMessage.style.marginTop = '10px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.textAlign = 'center';
        
        // Insertar el mensaje debajo del formulario
        form.insertAdjacentElement('afterend', successMessage);

        // Eliminar el mensaje después de 2 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 2000); // 2 segundos
    })
    .catch(error => {
        // Crear el mensaje de error
        const errorMessage = document.createElement('div');
        errorMessage.textContent = '¡Hubo un error al enviar los datos!';
        errorMessage.style.backgroundColor = 'red';
        errorMessage.style.color = 'white';
        errorMessage.style.padding = '10px';
        errorMessage.style.marginTop = '10px';
        errorMessage.style.borderRadius = '5px';
        errorMessage.style.textAlign = 'center';
        
        // Insertar el mensaje debajo del formulario
        form.insertAdjacentElement('afterend', errorMessage);

        // Eliminar el mensaje después de 2 segundos
        setTimeout(() => {
            errorMessage.remove();
        }, 2000); // 2 segundos
        console.error('Error:', error);
    });
});

function scrollToSection() {
    // Selecciona la sección con el ID "miSeccion"
    const section = document.getElementById('contactForm');

    // Realiza el desplazamiento suave
    section.scrollIntoView({
        behavior: 'smooth'
    });
}