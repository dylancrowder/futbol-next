FUTBOL APP



Descripción
Aplicación creada para un proceso de selección. La función de la aplicación es crear dos equipos de fútbol y, mediante una API, agregar jugadores hasta completar dos equipos de 5 jugadores cada uno. Al completar ambos equipos, se muestra un mensaje indicando que los equipos están listos.



Tecnologías Utilizadas

Frontend: React/Next.js

Backend: Next.js

Base de Datos: MongoDB

Instalación
Para instalar y ejecutar la aplicación localmente, sigue estos pasos:

Clona el repositorio:

bash
Copiar código
git clone https://github.com/dylancrowder/futbol-next.git
Navega al directorio del proyecto:

bash
Copiar código
cd futbol-app
Instala las dependencias:

bash
Copiar código
npm install
Configura las variables de entorno. Crea un archivo .env en el directorio raíz con el siguiente contenido:

env
Copiar código
MONGODB_URI=tu_uri_de_base_de_datos
Nota: Agrega otros valores necesarios en el archivo .env según la configuración de tu proyecto.

Ejecuta la aplicación:

bash
Copiar código
npm run dev












Endpoints
Aquí se describen los endpoints disponibles en la API:

POST /api/add-players/[teamName]
Descripción: Agrega un jugador al equipo especificado.

POST /api/add-team
Descripción: Agrega un equipo nuevo a la base de datos en caso de que no exista o no tenga el mismo nombre.

GET /api/add-team/[teamName]
Descripción: Busca un equipo por su nombre.

PUT /api/change-teamName/[teamName]
Descripción: Cambia el nombre del equipo seleccionado, siempre y cuando sea un nombre no repetido.

DELETE /api/delete-player/[teamName]/[playerName]
Descripción: Elimina un jugador del equipo seleccionado.

GET /api/find-team-players/[teamName]
Descripción: Muestra los jugadores de un equipo.

DELETE /api/removeTeam/[teamName]
Descripción: Elimina un equipo seleccionado por su nombre.








Contacto
Nombre: Dylan Crowder
Email: devdylancrowder@outlook.com
