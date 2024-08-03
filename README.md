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

- Copia y pega el env-example y cambia el nombre a .env, finalmente cambia los datos dentro que te convengan

- Luego se instala las dependencias en docker

```bash
docker compose up -d mysql maildev phpmyadmin minio
```

- Finalmente Crear la base de datos

```bash
npm run db:reset
```

- Ya con esto, puedes correr el API

```bash
npm run start:dev
```

### Desarrollo

Para el desarrollo, se tiene una serie de comandos CLI que te permite crear todo el boilerplate de un modulo y empezar a desarrollar desde ahi los detalles de los mismos

- Creacion de un nuevo modulo

```bash
npm run generate:resource
```

- Agregado de nuevas propiedades a modelos existentes

```bash
npm run add:property:to-db
```

- Despues de cada cambio en algun modelo en la base de datos, se debe actualizar la misma, para ello hay que crear la nueva migracion

```bash
npm run migration:generate
```

```bash
npm run migration:run
```

- El API trabaja bajo autenticacion por medio de Bearer Tokens usando JWT, por lo que es posible obtener los datos del payload con el decodador @Me(), siempre y cuando se haya utilizado el Guard('jwt'), un ejemplo:

```node
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Me() userPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.service.me(userPayload);
  }
```

- Para el manejo de la permisologia, tenemos PermissionEnum, los cuales son todos los permisos que tendra el sistema, y para aplicar los permisos, se utiliza el decorador Permission(PermissionEnum.EL_PERMISO) para indicar el permiso requerido, y UseGuard(PermissionGuard) para aplicar la verificacion de permisos, un ejemplo de como aplicarlo esta en el modulo de users

### Caracteristicas

- [x] Base de Datos con [TypeORM](https://www.npmjs.com/package/typeorm).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Registro e Inicio de Sesion por email.
- [x] Permisologia atomica, CRUD con Roles.
- [x] Subida de archivos. Soporte con guardado local y guardado por Amazon S3 / Minio.
- [x] Swagger.
- [x] Docker.
