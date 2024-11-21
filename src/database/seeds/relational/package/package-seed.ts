type Packages = Array<{
  name: string;
  slug: string;
  description: string;
}>;

const packages: Packages = [
  {
    name: 'Medicina general',
    description:
      'Nivel de atención médica que realiza procedimientos sencillos',
    slug: 'medicina-general',
  },
  {
    name: 'Cirugía',
    description:
      'Departamento donde se realizan intervenciones quirúrgicas variadas',
    slug: 'cirugia',
  },
  {
    name: 'Gineco-Obstetricia',
    description: 'Especialidad encargada de la salud de la mujer',
    slug: 'gineco-obstetricia',
  },
  {
    name: 'Pediatría',
    description: 'Especialidad encargada de la salud de los niños',
    slug: 'pediatria',
  },
  {
    name: 'Laboratorio',
    description: 'Departamento especializado en analizar muestras biológicas',
    slug: 'laboratorio',
  },
  {
    name: 'Radiología',
    description:
      'Departamento especializado en obtener imágenes del interior del cuerpo, con el objetivo de diagnosticar enfermedades, evaluar tratamientos y realizar procedimientos médicos',
    slug: 'radiologia',
  },
  {
    name: 'Farmacia',
    description:
      'Departamento donde se preparan, dispensan y controlan los medicamentos',
    slug: 'farmacia',
  },
  {
    name: 'Anestesia',
    description:
      'Departamento hecho para garantizar la seguridad y el bienestar del paciente durante procedimientos quirúrgicos y algunos exámenes médicos',
    slug: 'anestesia',
  },
  {
    name: 'Hemoterapia',
    description:
      'Departamento encargado de la extracción, procesamiento, almacenamiento y transfusión de sangre y sus componentes',
    slug: 'hemoterapia',
  },
  {
    name: 'Cardiologia',
    description: 'Departamento encargado de la salud del corazón',
    slug: 'cardiologia',
  },
];

export default packages;
