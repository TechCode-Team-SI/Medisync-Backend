import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { RolesEnum } from 'src/roles/roles.enum';

type Roles = Array<{
  name: string;
  slug: string;
  permissions: string[];
}>;

const roles: Roles = [
  {
    name: 'Dueño',
    slug: 'owner',
    permissions: Object.values(PermissionsEnum),
  },
  {
    name: 'Medico',
    slug: 'medic',
    permissions: [PermissionsEnum.USE_MOBILE],
  },
  {
    name: 'Paciente',
    slug: 'patient',
    permissions: [PermissionsEnum.USE_MOBILE],
  },
  {
    name: 'Usuario movil',
    slug: RolesEnum.MOBILE_USER,
    permissions: [PermissionsEnum.USE_MOBILE],
  },
];

export const rolesProduction: Roles = [
  {
    name: 'Usuario movil',
    slug: RolesEnum.MOBILE_USER,
    permissions: [PermissionsEnum.USE_MOBILE],
  },
  {
    name: 'Dueño',
    slug: RolesEnum.OWNER,
    //TODO: Update permissions to match the actual permissions
    permissions: Object.values(PermissionsEnum),
  },
];

export default roles;
