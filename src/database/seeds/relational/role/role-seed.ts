import { PermissionsEnum } from 'src/permissions/permissions.enum';

type Roles = Array<{
  name: string;
  permissions: string[];
}>;

const roles: Roles = [
  {
    name: 'Dueño',
    permissions: Object.values(PermissionsEnum),
  },
  {
    name: 'Medico',
    permissions: [
      PermissionsEnum.ACCESS_DESKTOP,
      PermissionsEnum.ACCESS_MOBILE,
      PermissionsEnum.USE_MOBILE,
    ],
  },
  {
    name: 'Paciente',
    permissions: [PermissionsEnum.ACCESS_MOBILE, PermissionsEnum.USE_MOBILE],
  },
];

export default roles;
