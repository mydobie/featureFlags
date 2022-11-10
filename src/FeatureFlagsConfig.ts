export const COLORS = 'COLORS';
export const DINOS = 'DINOS';
export const FRUITS = 'FRUITS';
export const VEGGIES = 'VEGGIES';
export const OTHER = 'OTHER';

export const featureFlagsRedux = [
  {
    id: FRUITS,
    active: false,
    title: 'Fruit list',
    description: 'Show a list of lovely fruits.',
  },
  {
    id: VEGGIES,
    active: true,
    title: 'Vegetable list',
  },
  { id: OTHER },
];

export const featureFlagsLocalStorage = [
  {
    id: COLORS,
    active: false,
    title: 'Color list',
    description: 'Show a list of bright colors.',
  },
  {
    id: DINOS,
    active: true,
    title: 'Dino list',
  },
  { id: OTHER },
];
