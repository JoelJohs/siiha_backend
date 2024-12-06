# SIIHA Backend

<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <strong>Sistema Integral de Información y Administración Escolar Backend</strong>
</p>

<p align="center">
  Un framework progresivo de <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicaciones del lado del servidor eficientes y escalables.
</p>

## 🛠️ Características

- **Gestión de Alumnos y Padres de Familia:** Manejo completo de la información de los alumnos y sus respectivos padres o tutores.
- **Administración de Grupos:** Asignación de docentes a grupos y gestión de los alumnos pertenecientes a cada grupo.
- **Control de Pagos:** Registro y seguimiento de los pagos realizados por los padres de familia.
- **Relaciones Complejas:** Uso de tablas intermedias para manejar relaciones muchos a muchos entre alumnos y padres.
- **Validación y Manejo de Errores:** Implementación de validaciones robustas para garantizar la integridad de los datos.
- **Configuración por Variables de Entorno:** Seguridad en la gestión de credenciales y configuraciones sensibles.

## 🚀 Tecnologías Utilizadas

- [NestJS](https://nestjs.com/) - Framework para Node.js
- [TypeORM](https://typeorm.io/) - ORM para TypeScript y JavaScript
- [MySQL](https://www.mysql.com/) - Sistema de gestión de bases de datos
- [Postman](https://www.postman.com/) - Herramienta para pruebas de API
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration) - Módulo de configuración para NestJS

## 📋 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/siiha_backend.git
cd siiha_backend
```

### 2. Instalar las Dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados.

```bash
npm install
```

### 3. Configurar las Variables de Entorno

Crea un archivo 

.env

 en la raíz del proyecto y añade la siguiente configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=siiha_db
```

> **Nota:** Reemplaza `root` con tu usuario y contraseña reales de MySQL si es diferente.

### 4. Configurar la Base de Datos

Asegúrate de tener una base de datos MySQL creada con el nombre especificado en `DB_DATABASE` (`siiha_db`).

```sql
CREATE DATABASE siiha_db;
```

> **Nota:** Si `synchronize` está habilitado en la configuración de TypeORM, las tablas se crearán automáticamente al iniciar la aplicación.

## ⚙️ Ejecución

### Iniciar el Servidor de Desarrollo

```bash
npm run start:dev
```

El servidor se iniciará en `http://localhost:3000`.

### Compilar el Proyecto

```bash
npm run build
```

### Iniciar el Servidor en Modo Producción

```bash
npm run start:prod
```

## 🧪 Pruebas

### Pruebas con Postman

Se realizaron pruebas utilizando [Postman](https://www.postman.com/) para verificar el correcto funcionamiento de los endpoints. A continuación, se detallan algunos de los endpoints probados:

#### 1. **Crear un Alumno**

- **URL:** `POST http://localhost:3000/alumnos`
- **Body:**

```json
{
  "nombres": "Luis",
  "apellido_paterno": "Ramírez",
  "apellido_materno": "García",
  "curp": "LIRM850303HDFRNN05",
  "cartilla_vacunacion": "path/to/cartilla_vacunacion.pdf",
  "historial_medico": "path/to/historial_medico.pdf",
  "datos_seguro_social": "path/to/datos_seguro_social.pdf",
  "fecha_inscripcion": "2024-09-01T08:00:00",
  "egreso": 0,
  "fecha_egreso": null,
  "baja": 0,
  "fecha_baja": null,
  "grupoIdGrupo": 1,
  "padreTutorIdPadreTutor": 1
}
```

#### 2. **Crear una Relación entre Alumno y Padre**

- **URL:** `POST http://localhost:3000/alumnos-padres`
- **Body:**

```json
{
  "alumnoId": 1,
  "usuarioPadreId": 1
}
```

#### 3. **Obtener Todos los Alumnos**

- **URL:** `GET http://localhost:3000/alumnos`

#### 4. **Obtener Alumnos con Padres**

- **URL:** `GET http://localhost:3000/alumnos/padres`

#### 5. **Obtener Detalles de Alumnos**

- **URL:** `GET http://localhost:3000/alumnos/details`

#### 6. **Obtener un Alumno por ID**

- **URL:** `GET http://localhost:3000/alumnos/1`

#### 7. **Eliminar un Alumno**

- **URL:** `POST http://localhost:3000/alumnos/delete/1`

### Importar Colección de Postman

Puedes importar una colección de Postman preconfigurada aquí.

## 📂 Estructura del Proyecto

```
siiha_backend/
├── src/
│   ├── alumnos/
│   │   ├── alumnos.controller.ts
│   │   ├── alumnos.service.ts
│   │   └── alumnos.entity.ts
│   ├── alumnos_padres/
│   │   ├── alumnos_padres.controller.ts
│   │   ├── alumnos_padres.service.ts
│   │   └── alumnos_padres.entity.ts
│   ├── padre_tutor/
│   │   ├── padre_tutor.entity.ts
│   │   └── padre_tutor.module.ts
│   ├── usuario_docente/
│   │   ├── usuario_docente.entity.ts
│   │   └── usuario_docente.module.ts
│   ├── pagos/
│   │   ├── pagos.controller.ts
│   │   ├── pagos.service.ts
│   │   └── pagos.entity.ts
│   ├── grupos/
│   │   ├── grupos.controller.ts
│   │   ├── grupos.service.ts
│   │   └── grupos.entity.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   └── ... Tests
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor sigue estos pasos:

1. **Fork** el repositorio.
2. Crea una **rama** para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. **Commit** tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request**.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, por favor abre un [Ticket](https://github.com/tu-usuario/siiha_backend/issues) en el repositorio o contáctame directamente en [email](mailto:tu-email@example.com).

---
