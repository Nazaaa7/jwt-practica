(async () => {
    fetch('http://localhost:4000/session')
    .then(response => response.json())
    .then(data => {
      if (data && data.username) {
        console.log('Username:', data.username);
      } else {
        console.error('No se encontró username en la respuesta:', data);
      }
    })
    .catch(error => {
      console.error('Error en fetch:', error);
    });
  
})();

document.getElementById('logout').addEventListener('click', async function(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include', // Incluye cookies de sesión en la solicitud.
        });
      
            if (data && (data.user === null || data.user === undefined || Object.keys(data.user).length === 0)) {
              console.log('Cierre de sesión exitoso');
              // Redirigir al usuario a la página de inicio de sesión
              window.location.href = 'index.html';
            } else {
              console.error('Error al cerrar sesión:', data);
              // Mostrar un mensaje de error al usuario
              divError.innerText = 'Error al cerrar sesión. Por favor, inténtalo de nuevo.';
            }
          
          } catch (error) {
            console.error('Error en la solicitud:', error);
            divError.innerText = 'Error en la solicitud. Inténtalo de nuevo más tarde.';
          }
});
