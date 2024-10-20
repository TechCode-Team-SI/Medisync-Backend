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
    name: 'Eliminar Usuario',
    slug: PermissionsEnum.SOFT_DELETE_USER,
    description: 'Permite eliminar un usuario de manera temporal',
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
  {
    name: 'Configurar Centro Médico',
    slug: PermissionsEnum.CONFIGURE_MEDICAL_CENTER,
    description: 'Permite configurar el centro médico',
  },
  {
    name: 'Configurar Paquetes',
    slug: PermissionsEnum.CONFIGURE_PACKAGES,
    description: 'Permite configurar paquetes',
  },
  {
    name: 'Ver Sugerencias',
    slug: PermissionsEnum.VIEW_SUGGESTION,
    description: 'Permite ver sugerencias',
  },
  {
    name: 'Ver Quejas',
    slug: PermissionsEnum.VIEW_COMPLAINT,
    description: 'Permite ver quejas',
  },
  {
    name: 'Atender Sugerencias',
    slug: PermissionsEnum.ATTEND_SUGGESTION,
    description: 'Permite atender sugerencias',
  },
  {
    name: 'Atender Quejas',
    slug: PermissionsEnum.ATTEND_COMPLAINT,
    description: 'Permite atender quejas',
  },
  {
    name: 'Gestionar Artículos',
    slug: PermissionsEnum.MANAGE_ARTICLES,
    description: 'Permite gestionar artículos',
  },
  {
    name: 'Gestionar Preguntas',
    slug: PermissionsEnum.MANAGE_QUESTIONS,
    description: 'Permite gestionar preguntas',
  },
  {
    name: 'Gestionar Formularios',
    slug: PermissionsEnum.MANAGE_FORMS,
    description: 'Permite gestionar formularios',
  },
  {
    name: 'Asignar Formulario a Especialidad',
    slug: PermissionsEnum.SET_FORM_FOR_SPECIALTY,
    description: 'Permite asignar un formulario a una especialidad',
  },
  {
    name: 'Gestionar Especialidades',
    slug: PermissionsEnum.MANAGE_SPECIALTIES,
    description: 'Permite gestionar especialidades',
  },
  {
    name: 'Ver Estadísticas',
    slug: PermissionsEnum.MANAGE_STATISTICS,
    description: 'Permite ver estadísticas',
  },
  {
    name: 'Gestionar Enfermedades',
    slug: PermissionsEnum.MANAGE_ILLNESSES,
    description: 'Permite gestionar enfermedades',
  },
  {
    name: 'Gestionar Tratamientos',
    slug: PermissionsEnum.MANAGE_TREATMENTS,
    description: 'Permite gestionar tratamientos',
  },
  {
    name: 'Gestionar Lesiones',
    slug: PermissionsEnum.MANAGE_INJURIES,
    description: 'Permite gestionar lesiones',
  },
  {
    name: 'Gestionar Patologías',
    slug: PermissionsEnum.MANAGE_PATHOLOGIES,
    description: 'Permite gestionar patologías',
  },
  {
    name: 'Gestionar Síntomas',
    slug: PermissionsEnum.MANAGE_SYMPTOMS,
    description: 'Permite gestionar síntomas',
  },
  {
    name: 'Gestionar Roles',
    slug: PermissionsEnum.MANAGE_ROLES,
    description: 'Permite gestionar roles',
  },
  {
    name: 'Gestionar Áreas',
    slug: PermissionsEnum.MANAGE_AREAS,
    description: 'Permite gestionar áreas',
  },
  {
    name: 'Gestionar Agenda',
    slug: PermissionsEnum.MANAGE_AGENDA,
    description: 'Permite gestionar la agenda',
  },
  {
    name: 'Gestionar Horarios',
    slug: PermissionsEnum.MANAGE_SCHEDULE,
    description: 'Permite gestionar los horarios',
  },
  {
    name: 'Ver Todos los Usuarios',
    slug: PermissionsEnum.VIEW_ALL_USERS,
    description: 'Permite ver todos los usuarios',
  },
  {
    name: 'Asignar Agenda',
    slug: PermissionsEnum.ASSIGN_AGENDA,
    description: 'Permite asignar la agenda',
  },
  {
    name: 'Gestionar Empleados',
    slug: PermissionsEnum.MANAGE_EMPLOYEES,
    description: 'Permite gestionar empleados',
  },
  {
    name: 'Ver Todas las Citas',
    slug: PermissionsEnum.VIEW_ALL_REQUESTS,
    description: 'Permite ver todas las citas',
  },
];

export default permissions;
