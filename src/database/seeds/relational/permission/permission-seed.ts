import { PermissionsEnum } from 'src/permissions/permissions.enum';

type Permissions = Array<{
  name: string;
  slug: string;
  description: string;
}>;

const permissions: Permissions = [
  {
    name: 'Crear Usuario',
    slug: PermissionsEnum.CREATE_USER,
    description: 'Permite crear un usuario ajeno al mismo que los crea',
  },
  {
    name: 'Editar Usuario',
    slug: PermissionsEnum.EDIT_USER,
    description: 'Permite editar un usuario ajeno al mismo que los edita',
  },
  {
    name: 'Acceso Móvil',
    slug: PermissionsEnum.ACCESS_MOBILE,
    description: 'Permite el acceso a la aplicación desde un dispositivo móvil',
  },
  {
    name: 'Uso Móvil',
    slug: PermissionsEnum.USE_MOBILE,
    description: 'Permite usar la aplicación en un dispositivo móvil',
  },
  {
    name: 'Acceso Escritorio',
    slug: PermissionsEnum.ACCESS_DESKTOP,
    description:
      'Permite el acceso a la aplicación desde un dispositivo de escritorio',
  },
  {
    name: 'Crear Rol',
    slug: PermissionsEnum.CREATE_ROLE,
    description: 'Permite crear un rol nuevo',
  },
  {
    name: 'Actualizar Rol',
    slug: PermissionsEnum.UPDATE_ROLE,
    description: 'Permite actualizar un rol existente',
  },
  {
    name: 'Eliminar Rol',
    slug: PermissionsEnum.DELETE_ROLE,
    description: 'Permite eliminar un rol existente',
  },
];

export default permissions;
