# API REST -- Gestión de Seguridad Privada

API REST desarrollada con **Node.js, Express y MySQL** para administrar
personas, guardias, servicios, puestos, turnos y novedades.

## 1. Estado y URL de acceso

Actualmente la API está configurada para ejecutarse localmente:

-   **URL local:** `http://localhost:3000`
-   **Ruta de comprobación:** `GET http://localhost:3000/`

La URL anterior **no es pública**: solo funciona desde el computador
donde se está ejecutando el servidor. Para obtener una URL pública es
necesario desplegar la API en un servicio de hosting y configurar una
base de datos MySQL accesible desde ese servicio. Una vez desplegada, se
reemplaza `http://localhost:3000` por la URL asignada por el proveedor.

## 2. Tecnologías

-   Node.js
-   Express
-   MySQL
-   dotenv

## 3. Requisitos previos

-   Node.js y npm instalados.
-   Servidor MySQL o MariaDB activo.
-   Base de datos `wordpress` creada.
-   Tablas `persona`, `guardias`, `servicios`, `puestos`, `turnos` y
    `novedades` creadas con sus relaciones.

## 4. Instalación y configuración

1.  Descarga y descomprime el proyecto.

2.  Abre una terminal en la carpeta que contiene `package.json`.

3.  Instala las dependencias:

    ``` bash
    npm install
    ```

4.  Copia el archivo `.env.example` y cambia el nombre de la copia a
    `.env`.

5.  Abre `.env` y configura los datos de conexión de tu servidor MySQL:

    ``` env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=wordpress
    DB_PORT=3306
    ```

    Reemplaza los valores por los de tu entorno. No compartas el archivo
    `.env` ni publiques sus credenciales.

6.  Inicia la API:

    ``` bash
    npm start
    ```

    Para desarrollo con reinicio automático al detectar cambios:

    ``` bash
    npm run dev
    ```

7.  Si la conexión es correcta, la terminal mostrará
    `Conexión MySQL exitosa` y
    `Servidor iniciado en http://localhost:3000`.

## 5. Formato general

-   Los datos enviados en solicitudes `POST` y `PUT` deben estar en
    formato JSON.
-   En Insomnia selecciona **Body → JSON**.
-   Las respuestas de los recursos administrados con el controlador CRUD
    se entregan en JSON.
-   `:id` representa el identificador del registro que se desea
    consultar, actualizar o eliminar.

## 6. Endpoints disponibles

La API ofrece operaciones CRUD (crear, consultar, actualizar y eliminar)
para cada recurso.

### 6.1 Personas

Ruta base: `/api/personas`

  ------------------------------------------------------------------------------------
  Método                  Endpoint                             Función
  ----------------------- ------------------------------------ -----------------------
  GET                     `/api/personas/getPersonas`          Listar personas

  GET                     `/api/personas/getPersonaById/:id`   Consultar una persona
                                                               por ID

  POST                    `/api/personas/postPersona`          Registrar una persona

  PUT                     `/api/personas/putPersona/:id`       Actualizar una persona

  DELETE                  `/api/personas/deletePersona/:id`    Eliminar una persona
  ------------------------------------------------------------------------------------

Campos para crear o actualizar: `nombre`, `apellido`, `cedula`, `edad`,
`celular`.

Ejemplo de JSON:

``` json
{
  "nombre": "Carlos",
  "apellido": "Ramirez",
  "cedula": "1000000001",
  "edad": 28,
  "celular": "3001111111"
}
```

### 6.2 Guardias

Ruta base: `/api/guardias`

  ------------------------------------------------------------------------------------
  Método                  Endpoint                             Función
  ----------------------- ------------------------------------ -----------------------
  GET                     `/api/guardias/getGuardias`          Listar guardias

  GET                     `/api/guardias/getGuardiaById/:id`   Consultar un guardia
                                                               por ID

  POST                    `/api/guardias/postGuardia`          Registrar un guardia

  PUT                     `/api/guardias/putGuardia/:id`       Actualizar un guardia

  DELETE                  `/api/guardias/deleteGuardia/:id`    Eliminar un guardia
  ------------------------------------------------------------------------------------

Campos: `nombres`, `apellidos`, `documento`, `telefono`, `correo`,
`estado`. Son obligatorios `nombres`, `apellidos` y `documento`.

``` json
{
  "nombres": "Andres",
  "apellidos": "Castro",
  "documento": "1000000002",
  "telefono": "3002222222",
  "correo": "andres@example.com",
  "estado": "Activo"
}
```

### 6.3 Servicios

Ruta base: `/api/servicios`

  --------------------------------------------------------------------------------------
  Método                  Endpoint                               Función
  ----------------------- -------------------------------------- -----------------------
  GET                     `/api/servicios/getServicios`          Listar servicios

  GET                     `/api/servicios/getServicioById/:id`   Consultar un servicio
                                                                 por ID

  POST                    `/api/servicios/postServicio`          Registrar un servicio

  PUT                     `/api/servicios/putServicio/:id`       Actualizar un servicio

  DELETE                  `/api/servicios/deleteServicio/:id`    Eliminar un servicio
  --------------------------------------------------------------------------------------

Campos: `nombre`, `descripcion`, `tarifa_mensual`, `estado`. Es
obligatorio `nombre`.

``` json
{
  "nombre": "Vigilancia residencial",
  "descripcion": "Servicio de vigilancia para conjuntos residenciales",
  "tarifa_mensual": 2500000,
  "estado": "Activo"
}
```

### 6.4 Puestos

Ruta base: `/api/puestos`

  Método   Endpoint                           Función
  -------- ---------------------------------- ----------------------------
  GET      `/api/puestos/getPuestos`          Listar puestos
  GET      `/api/puestos/getPuestoById/:id`   Consultar un puesto por ID
  POST     `/api/puestos/postPuesto`          Registrar un puesto
  PUT      `/api/puestos/putPuesto/:id`       Actualizar un puesto
  DELETE   `/api/puestos/deletePuesto/:id`    Eliminar un puesto

Campos: `id_persona`, `id_servicio`, `nombre`, `direccion`,
`descripcion`, `estado`. Son obligatorios `id_persona` y `nombre`.
`id_persona` debe corresponder a una persona existente; `id_servicio`,
cuando se envía, debe corresponder a un servicio existente.

``` json
{
  "id_persona": 2,
  "id_servicio": 1,
  "nombre": "Puesto principal",
  "direccion": "Calle .example",
  "descripcion": "Acceso principal",
  "estado": "Activo"
}
```

### 6.5 Turnos

Ruta base: `/api/turnos`

  Método   Endpoint                         Función
  -------- -------------------------------- ---------------------------
  GET      `/api/turnos/getTurnos`          Listar turnos
  GET      `/api/turnos/getTurnoById/:id`   Consultar un turno por ID
  POST     `/api/turnos/postTurno`          Registrar un turno
  PUT      `/api/turnos/putTurno/:id`       Actualizar un turno
  DELETE   `/api/turnos/deleteTurno/:id`    Eliminar un turno

Campos: `id_guardia`, `id_puesto`, `fecha`, `hora_inicio`, `hora_fin`,
`estado`. Son obligatorios `id_guardia`, `id_puesto`, `fecha`,
`hora_inicio` y `hora_fin`.

``` json
{
  "id_guardia": 1,
  "id_puesto": 1,
  "fecha": "2026-11-05",
  "hora_inicio": "06:00:00",
  "hora_fin": "14:00:00",
  "estado": "Programado"
}
```

### 6.6 Novedades

Ruta base: `/api/novedades`

  -------------------------------------------------------------------------------------
  Método                  Endpoint                              Función
  ----------------------- ------------------------------------- -----------------------
  GET                     `/api/novedades/getNovedades`         Listar novedades

  GET                     `/api/novedades/getNovedadById/:id`   Consultar una novedad
                                                                por ID

  POST                    `/api/novedades/postNovedad`          Registrar una novedad

  PUT                     `/api/novedades/putNovedad/:id`       Actualizar una novedad

  DELETE                  `/api/novedades/deleteNovedad/:id`    Eliminar una novedad
  -------------------------------------------------------------------------------------

Campos: `id_turno`, `tipo`, `descripcion`, `fecha_hora`, `nivel`. Son
obligatorios `id_turno`, `tipo` y `fecha_hora`.

``` json
{
  "id_turno": 1,
  "tipo": "Reporte",
  "descripcion": "Se realizó el relevo sin inconvenientes",
  "fecha_hora": "2026-11-05 06:15:00",
  "nivel": "Bajo"
}
```

## 7. Códigos de respuesta HTTP

  Código   Significado
  -------- ---------------------------------------------------------
  200      Solicitud realizada correctamente
  201      Registro creado correctamente
  400      Datos enviados incorrectos o incompletos
  404      Ruta o registro no encontrado
  409      Conflicto con un dato único o una relación entre tablas
  500      Error interno o error de base de datos

**Importante:** si un registro está relacionado con otros registros
mediante claves foráneas, MySQL puede impedir su eliminación. En ese
caso, la API responde con un conflicto (`409`).

## 8. Pruebas en Insomnia

1.  Inicia el servidor con `npm start`.
2.  Crea una solicitud nueva en Insomnia.
3.  Para consultar registros, selecciona `GET` y pega uno de los
    endpoints de la sección 6.
4.  Para crear registros, selecciona `POST`, abre `Body → JSON`, pega un
    ejemplo y envía la solicitud.
5.  Para actualizar, selecciona `PUT`, agrega el ID al final de la ruta
    y envía los campos que deseas modificar.
6.  Para eliminar, selecciona `DELETE` y agrega el ID al final de la
    ruta.
7.  Revisa tanto el código HTTP como el cuerpo JSON de la respuesta.

Ejemplo local para listar personas:

`GET http://localhost:3000/api/personas/getPersonas`

## 9. Estructura del proyecto

``` text
API_completa/
├── index.js
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── config/
    │   └── dbConfig.js
    ├── controllers/
    ├── models/
    ├── routes/
    └── utils/
        └── crudFactory.js
```

## 10. Despliegue público

La API incluida en este proyecto está configurada para ejecución local.
Para publicarla se debe:

1.  Subir el código a un repositorio o al servicio de despliegue
    elegido.
2.  Crear o disponer de una base de datos MySQL accesible desde el
    hosting.
3.  Configurar las variables de entorno `PORT`, `DB_HOST`, `DB_USER`,
    `DB_PASSWORD`, `DB_NAME` y `DB_PORT` en el panel del hosting.
4.  Desplegar e iniciar el servicio con `npm start`.
5.  Probar la ruta raíz `/` y varios endpoints CRUD usando el dominio
    público asignado.

Cuando el hosting entregue el dominio, la URL pública tendrá la forma
`https://tu-dominio-del-hosting`. Esta dirección es un ejemplo de
formato, no una URL activa de este proyecto.