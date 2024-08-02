# Medisync API

## Descripción

API Backend de Medisync, Sistema de Informacion para optimizar los procesos y manejo de citas y diagnosticos de un centro medico.

## Comenzando

### Dependencias

- Node.js
- NPM
- Docker y Docker Compose
- Prettier
- Eslint

### Instalación

- Empezamos por instalar las dependencias

```bash
npm install
```

- Luego se instala las dependencias en docker

```bash
docker compose up -d mysql maildev phpadmin minio
```

- Copia y pega el env-example y cambia el nombre a .env, finalmente cambia los datos dentro que te convengan

- Finalmente Crear la base de datos

```bash
npm run db:reset
```

- Ya con esto, puedes correr el API

```bash
npm run start:dev
```

## Caracteristicas

- [x] Base de Datos con [TypeORM](https://www.npmjs.com/package/typeorm).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Registro e Inicio de Sesion por email.
- [x] Permisologia atomica, CRUD con Roles.
- [x] Subida de archivos. Soporte con guardado local y guardado por Amazon S3 / Minio.
- [x] Swagger.
- [x] Docker.
