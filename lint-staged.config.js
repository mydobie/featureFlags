module.exports = {
  'src/**/*.{ts,tsx,js, jsx}': 'npm run lint:js',
  'src/**/*.{scss,css}': 'npm run lint:scss',
  'src/**/*.{html,json}': 'npm run prettier ',
  '*.md': 'npm run prettier',
};
