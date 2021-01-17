/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { editFeatureFlag } from '../../Components/featureFlags';

import { resetFeatureFlags, FeatureFlagsReduxUI } from '../../Components/index';

const mockStore = configureStore();

describe('Redux wrapper for edit feature flags UI', () => {
  let wrapper = '';
  let store = '';
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
    store = mockStore({ reducerFeatureFlags: { flags: featureList } }); // enter starting store
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });

  test('Component is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Features array is sent to Core UI', () => {
    const FeaturesUI = wrapper.find('FeatureFlagsUICore');
    expect(FeaturesUI).toHaveLength(1);
    expect(FeaturesUI.first().props().features).toEqual(featureList);
  });

  test('Edit action is called when feature change is called', () => {
    const FeaturesUI = wrapper.find('FeatureFlagsUICore');
    FeaturesUI.first().instance().featureClick('MY_FEATURE', false);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenLastCalledWith(
      editFeatureFlag('MY_FEATURE', false, true)
    );
  });

  test('Reset action is called when resetFeatures is called', () => {
    const FeaturesUI = wrapper.find('FeatureFlagsUICore');
    FeaturesUI.first().instance().featureReset();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenLastCalledWith(resetFeatureFlags(true));
  });
});
