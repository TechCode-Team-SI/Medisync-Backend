type Specialties = Array<{
  id: string;
  name: string;
  description: string;
}>;

const specialties: Specialties = [
  {
    id: '3f50c3e6-8f1e-4d3b-9b8b-1f2e4d3b9b8b',
    name: 'cardiology',
    description: 'department that treats the heart',
  },
  {
    id: '3f50c3e6-8f1e-4d3b-9b8b-1f2e4d3b9b6c',
    name: 'urology',
    description: 'department that treats the urinary system',
  },
  {
    id: '3f50c3e6-8f1e-4d3b-9b8b-1f2e4d3b9b4d',
    name: 'neurology',
    description: 'department that treats the nervous system',
  },
];

export default specialties;
