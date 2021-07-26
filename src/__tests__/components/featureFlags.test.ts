import { renderHook, act } from '@testing-library/react-hooks';

import {
  featuresWithOverrides,
  loadFeatureFlags,
  FEATURE_FLAGS,
  FEATURE_FLAGS_PERSIST,
  getResetFeatureFlags,
  editFeatureFlag,
  isFeatureActive,
  useLocalStorage,
  getFeatureFlagsRedux,
  getPersistRedux,
} from '../../components';

// /* ************** LOCALSTORAGE TESTS ******************* */
describe('Core feature flag functions - non REDUX', () => {
  let featureList = [];
  beforeEach(() => {
    featureList = [
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
      },
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
      },
    ];
  });

  afterEach(() => {
    localStorage.clear();
    featureList = [];
  });
  test('Feature with overrides merges arrays', () => {
    const overridesArray = [
      { id: 'FRUITS', active: false },
      { id: 'VEGGIES', active: false },
      { id: 'CANDY', active: true, description: 'Candy!' },
    ];
    const expected = [
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
      },
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
      },
      { id: 'CANDY', active: true, description: 'Candy!' },
    ];

    const withOverrides = featuresWithOverrides(
      [...featureList],
      overridesArray
    );

    expect(withOverrides).toEqual(expected);
  });

  test('Features with overrides works with undefined override', () => {
    expect(featuresWithOverrides(featureList)).toEqual(featureList);
  });

  test('Features are loaded empty local storage', () => {
    loadFeatureFlags(featureList, false);

    const expected = featureList.map((flag) => ({
      ...flag,
      original: flag.active,
    }));

    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
  });

  test('Features are loaded with existing local storage, non persist', () => {
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(null);
    const existing = JSON.stringify([
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
      },
      { id: 'CANDY', active: true, description: 'Candy!' },
    ]);
    localStorage.setItem(FEATURE_FLAGS, existing);
    expect(localStorage.getItem(FEATURE_FLAGS)).not.toEqual(null);
    loadFeatureFlags(featureList);

    const expected = featureList.map((flag) => ({
      ...flag,
      original: flag.active,
    }));
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
    expect(localStorage.getItem(FEATURE_FLAGS_PERSIST)).toEqual('false');
  });

  test('Features are loaded with existing local storage, persist', () => {
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(null);
    const existing = JSON.stringify([
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
        original: false,
      },
      { id: 'CANDY', active: true, description: 'Candy!', original: true },
    ]);
    localStorage.setItem(FEATURE_FLAGS, existing);
    expect(localStorage.getItem(FEATURE_FLAGS)).not.toEqual(null);

    loadFeatureFlags(featureList, true);
    const expected = [
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
        original: true,
      },
      { id: 'CANDY', active: true, description: 'Candy!', original: true },
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
        original: false,
      },
    ];

    expect(JSON.parse(localStorage.getItem(FEATURE_FLAGS))).toEqual(expected);
    expect(localStorage.getItem(FEATURE_FLAGS_PERSIST)).toEqual('true');
  });

  test('GetRestFeatureFlags sends an array with values set back to original value', () => {
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(null);
    const initial = [
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
        original: true,
      },
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
        original: false,
      },
    ];

    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(initial));
    expect(localStorage.getItem(FEATURE_FLAGS)).not.toEqual(null);

    const expected = [
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
        original: true,
      },
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
        original: false,
      },
    ];
    expect(getResetFeatureFlags()).toEqual(expected);
  });

  test('Edit feature', () => {
    loadFeatureFlags(featureList);
    expect(JSON.parse(localStorage.getItem(FEATURE_FLAGS))).toEqual(
      featureList.map((feature) => ({
        ...feature,
        original: feature.active,
      }))
    );
    expect(featureList[0].id).toEqual('FRUITS');
    expect(featureList[0].active).toBeFalsy();

    editFeatureFlag('FRUITS', true);
    const newLocalStorage = JSON.parse(localStorage.getItem(FEATURE_FLAGS));
    expect(newLocalStorage[0].id).toEqual('FRUITS');
    expect(newLocalStorage[0].active).toBeTruthy();
  });

  // TODO set error checking if local storage or item doesn't exist
  // test('Edit feature with empty local storage', () => {
  //   editFeatureFlag('FRUITS', true);
  //   const newLocalStorage = JSON.parse(localStorage.getItem(FEATURE_FLAGS));
  //   expect(newLocalStorage[0].id).toEqual('FRUITS');
  //   expect(newLocalStorage[0].active).toBeTruthy();
  // });

  test('Get is active - false', () => {
    loadFeatureFlags(featureList);
    expect(featureList[0].id).toEqual('FRUITS');
    expect(featureList[0].active).toBeFalsy();

    expect(isFeatureActive('FRUITS')).toBeFalsy();
  });

  test('Get is active - True', () => {
    loadFeatureFlags(featureList);
    expect(featureList[1].id).toEqual('VEGGIES');
    expect(featureList[1].active).toBeTruthy();

    expect(isFeatureActive('VEGGIES')).toBeTruthy();
  });

  // NOTE: Testing the useLocalStorage hook directly isn't really neccessary
  // because it is only used by componts within the package
  // keeping it here as an example of how to test hooks
  test('Local storage hook, set value', () => {
    expect(localStorage.getItem(FEATURE_FLAGS)).toBeNull();
    const { result } = renderHook(() => useLocalStorage(FEATURE_FLAGS));
    act(() => {
      result.current[1](featureList);
    });

    const expected = JSON.stringify(featureList);
    expect(localStorage.getItem(FEATURE_FLAGS)).not.toBeNull();
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(expected);
    expect(result.current[0]).toEqual(featureList);
  });
});

// /* ************** REDUX GET TESTS ******************* */
describe('Core feature flag functions - REDUX', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {
      FeatureFlags: {
        features: [
          {
            id: 'FRUITS',
            description: 'Fruit list',
            active: false,
            original: true,
          },
          {
            id: 'VEGGIES',
            description: 'Vegetable list',
            active: true,
            original: true,
          },
        ],
        persist: true,
      },
    };
  });

  test('Get feature flags returns flags from state', () => {
    expect(getFeatureFlagsRedux(initialState)).toEqual(
      // @ts-ignore
      initialState?.FeatureFlags?.features
    );
  });

  test('Get persist returns value from state', () => {
    expect(getPersistRedux(initialState)).toEqual(
      // @ts-ignore
      initialState?.FeatureFlags?.persist
    );
  });

  test('Is feature active returns value from state', () => {
    expect(isFeatureActive('VEGGIES', initialState)).toBeTruthy();
    expect(isFeatureActive('FRUITS', initialState)).toBeFalsy();
  });
});
