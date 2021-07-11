export const COLORS = 'COLORS';
export const DINOS = 'DINOS';
export const FRUITS = 'FRUITS';
export const VEGGIES = 'VEGGIES';

export const featureFlagsRedux = [
  {
    id: FRUITS,
    active: false,
    description: 'Fruit list',
  },
  {
    id: VEGGIES,
    active: true,
    description: 'Vegetable list',
  },
];

export const featureFlagsLocalStorage = [
  {
    id: COLORS,
    active: false,
    description: 'Color list',
  },
  {
    id: DINOS,
    active: false,
    description: 'Dino list',
  },
];
