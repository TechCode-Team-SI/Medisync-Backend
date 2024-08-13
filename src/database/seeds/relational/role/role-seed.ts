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
    permissions: [
      PermissionsEnum.ACCESS_DESKTOP,
      PermissionsEnum.ACCESS_MOBILE,
      PermissionsEnum.USE_MOBILE,
    ],
  },
  {
    name: 'Paciente',
    slug: 'patient',
    permissions: [PermissionsEnum.ACCESS_MOBILE, PermissionsEnum.USE_MOBILE],
  },
];

export const rolesProduction: Roles = [
  {
    name: RolesEnum.MOBILE_USER,
    slug: RolesEnum.MOBILE_USER,
    permissions: [PermissionsEnum.ACCESS_MOBILE, PermissionsEnum.USE_MOBILE],
  },
  {
    name: RolesEnum.UNCONFIRMED_MOBILE_USER,
    slug: RolesEnum.UNCONFIRMED_MOBILE_USER,
    permissions: [PermissionsEnum.ACCESS_MOBILE],
  },
];

export default roles;
