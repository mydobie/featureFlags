/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';

// import { editFeatureFlag } from '../../Components/featureFlags';

import { FeatureFlagsUI } from '../../Components/index';

describe('Local storage wrapper for edit feature flags UI', () => {
  let wrapper = '';
  const featureList = [
    {
      id: 'FRUITS',
      inuse: false,
      description: 'Fruit list',
      original: false,
    },
    {
      id: 'VEGGIES',
      inuse: true,
      description: 'Vegetable list',
      original: true,
    },
  ];

  beforeEach(() => {
    wrapper = mount(<FeatureFlagsUI />);
    localStorage.setItem('featureFlags', JSON.stringify(featureList));
  });
  afterEach(() => {});

  test('Component is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test.todo('Ensure featureChange calls editFeatureFlag and onFeatureChange');
  test.todo(
    'Ensure that featureReset calls resetFeatureFlags and onFeatureChange'
  );
});
