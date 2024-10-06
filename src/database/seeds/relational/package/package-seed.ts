type Packages = Array<{
  name: string;
  slug: string;
  description: string;
}>;

const packages: Packages = [
  {
    name: 'Medicina general',
    description: 'Medicina',
    slug: 'medicina-general',
  },
  {
    name: 'Cirugía',
    description: 'Medicina',
    slug: 'cirugia',
  },
  {
    name: 'Gineco-Obstetricia',
    description: 'Medicina',
    slug: 'gineco-obstetricia',
  },
  {
    name: 'Pediatría',
    description: 'Medicina',
    slug: 'pediatria',
  },
  {
    name: 'Laboratorio',
    description: 'Medicina',
    slug: 'laboratorio',
  },
  {
    name: 'Radiología',
    description: 'Medicina',
    slug: 'radiologia',
  },
  {
    name: 'Farmacia',
    description: 'Medicina',
    slug: 'farmacia',
  },
  {
    name: 'Anestesia',
    description: 'Medicina',
    slug: 'anestesia',
  },
  {
    name: 'Hemoterapia',
    description: 'Medicina',
    slug: 'hemoterapia',
  },
  {
    name: 'Emergencia',
    description: 'Medicina',
    slug: 'emergencia',
  },
  {
    name: 'Cardiologia',
    description: 'Medicina',
    slug: 'cardiologia',
  },
];

export default packages;
