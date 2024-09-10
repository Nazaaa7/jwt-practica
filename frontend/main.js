(async () => {
    const response = await fetch('http://localhost:4000/session', {
        method: 'GET',
        credentials: 'include' // Importante para enviar las cookies de sesión
    })

    console.log({ response })


    if (response.ok) {
        const data = await response.json();
        document.getElementById('user-name').innerText = data.user.username;
    } else {
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'index.html';
    }
})();
document.getElementById('logout').addEventListener('click', async function(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include', // Incluye cookies de sesión en la solicitud.
        });

        if (response.ok) {
            window.location.href = '/login.html'; // Redirige después del logout
        } else {
            console.error('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
