# SIIHA Backend

<p align="center">
    <img src="./public/logo.png" width="120" alt="Logo SIIHA" />
</p>

<p align="center">
  <strong>Sistema Integral de Información y Administración Escolar Backend</strong>
</p>

## 🛠️ Características

- **Gestión de Alumnos y Padres de Familia:** Manejo completo de la información de los alumnos y sus respectivos padres o tutores.
- **Administración de Grupos:** Asignación de docentes a grupos y gestión de los alumnos pertenecientes a cada grupo.
- **Control de Pagos:** Registro y seguimiento de los pagos realizados por los padres de familia.
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

Crea un archivo `.env` en la raíz del proyecto y añade la siguiente configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=siiha_db
```

> **Nota:** Reemplaza `root` con tu usuario y contraseña reales de MySQL si es diferente.

### 4. Configurar la Base de Datos

1. Asegúrate de tener MySQL instalado y funcionando.
2. Crea la base de datos especificada en `DB_DATABASE` sin ninguna tabla:

```sql
CREATE DATABASE siiha_db;
```

3. Al iniciar la aplicación, TypeORM sincronizará automáticamente las tablas basadas en las entidades definidas.

### 5. Configuración de la Conexión en `app.module.ts`

En el entorno local, si tu MySQL no tiene contraseña, la configuración será la siguiente:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
    username: configService.get<string>('DB_USERNAME'),
    password: '',
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // ¡Usa synchronize: false en producción!
  }),
  inject: [ConfigService],
});
```

Si tu MySQL requiere contraseña, edita el archivo `.env` para incluirla y ajusta la configuración de `password`:

```env
DB_PASSWORD=tu_password
```

Y cambia la configuración en `app.module.ts` a:

```typescript
password: configService.get<string>('DB_PASSWORD'),
```

## ⚙️ Migración de Tablas

Para garantizar un formato consistente de la base de datos en diferentes entornos, habilita la opción `synchronize: true` solo en entornos de desarrollo. En producción, utiliza migraciones.

1. Generar una migración basada en las entidades:

```bash
npm run typeorm migration:generate -- -n InitialMigration
```

2. Ejecutar las migraciones:

```bash
npm run typeorm migration:run
```

> **Nota:** Cambia `synchronize` a `false` en producción para evitar modificaciones no controladas en la base de datos.

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

Utiliza [Postman](https://www.postman.com/) para probar los endpoints del backend. Puedes importar una colección preconfigurada disponible en el repositorio.

## 📂 Estructura del Proyecto

```
siiha_backend/
├── src/
│   ├── alumnos/
│   │   ├── alumnos.controller.ts
│   │   ├── alumnos.service.ts
│   │   └── alumnos.entity.ts
│   ├── padres_tutores/
│   │   ├── padres_tutores.controller.ts
│   │   ├── padres_tutores.service.ts
│   │   └── padres_tutores.entity.ts
│   ├── grupos/
│   │   ├── grupos.controller.ts
│   │   ├── grupos.service.ts
│   │   └── grupos.entity.ts
│   ├── app.module.ts
│   └── main.ts
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
