import { PermissionsEnum } from 'src/permissions/permissions.enum';

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

export default roles;
