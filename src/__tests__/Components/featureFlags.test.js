import {
  loadFeatureFlags,
  resetFeatureFlags,
  isFeatureActive,
  getFeatures,
  reducerFeatureFlags,
} from '../../Components/index';

import {
  FEATURE_FLAGS,
  editFeatureFlag,
  FEATURE_FLAGS_ADD,
  FEATURE_FLAG_EDIT,
  FEATURE_FLAGS_RESET,
} from '../../Components/featureFlags';

/* ************** LOCALSTORAGE TESTS ******************* */
describe('Core feature flag functions - non REDUX', () => {
  const featureList = [
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
  beforeEach(() => {
    localStorage.clear();
  });

  test('Features are loaded into local storage   -  with empty env array', () => {
    const expected = featureList.map((item) => ({
      ...item,
      original: item.active,
    }));
    loadFeatureFlags(
      featureList,
      false,
      () => {},
      'REACT_APP_FEATURE_FLAGS_EMPTY'
    );
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
  });

  test('Features are loaded into local storage   -  with nonexistent env array', () => {
    const expected = featureList.map((item) => ({
      ...item,
      original: item.active,
    }));
    loadFeatureFlags(
      featureList,
      false,
      () => {},
      'REACT_APP_FEATURE_FLAGS_I_DO_NOT_EXIST'
    );
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
  });

  test('Features are loaded into local storage   -  with env array', () => {
    const expected = [
      {
        id: 'FRUITS',
        active: true,
        description: 'Fruit list',
        original: true,
      },
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
        original: true,
      },
      { id: 'FOO', active: true, description: 'more foo', original: true },
    ];
    loadFeatureFlags(
      featureList,
      false,
      () => {},
      'REACT_APP_FEATURE_FLAGS_EDIT'
    );

    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
  });

  test('Change checked value', () => {
    const featureList2 = [
      {
        id: 'FRUITS',
        active: true,
        description: 'Fruit list',
        original: true,
      },
    ];
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(featureList2));
    const received = editFeatureFlag('FRUITS', false);
    const expected = [
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
        original: true,
      },
    ];
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
    expect(received).toEqual(expected);
  });

  test('Does not fail with unknown feature flag', () => {
    const featureList2 = [
      {
        id: 'FRUITS',
        active: true,
        description: 'Fruit list',
        original: true,
      },
    ];
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(featureList2));
    const received = editFeatureFlag('THIS_DOES_NOT_EXIST', false);

    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(featureList2)
    );
    expect(received).toEqual(featureList2);
  });

  test('Reset all feature flags to original value', () => {
    const featureList3 = [
      {
        id: 'FRUITS',
        active: false,
        description: 'Fruit list',
        original: true,
      },
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
        original: false,
      },
    ];
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(featureList3));

    const expected = [
      {
        id: 'FRUITS',
        active: true,
        description: 'Fruit list',
        original: true,
      },
      {
        id: 'VEGGIES',
        active: false,
        description: 'Vegetable list',
        original: false,
      },
    ];
    const returned = resetFeatureFlags();
    expect(localStorage.getItem(FEATURE_FLAGS)).toEqual(
      JSON.stringify(expected)
    );
    expect(returned).toEqual(expected);
  });

  test('Get is active for flag', () => {
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(featureList));
    expect(isFeatureActive('FRUITS')).toEqual(false);
    expect(isFeatureActive('VEGGIES')).toEqual(true);
  });

  test('Get in use for nonexistent flag', () => {
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(featureList));
    expect(isFeatureActive('DOES_NOT_EXIST')).toEqual(undefined);
  });

  test('Get all features flags from local storage', () => {
    const features = featureList.map((item) => ({
      ...item,
      original: item.active,
    }));
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify(features));
    expect(getFeatures()).toEqual(features);
  });
});

/* ************** REDUX TESTS ******************* */
describe('Core feature flag functions - REDUX', () => {
  // const mockStore = configureStore([thunk]);
  // let store = '';
  let featureList = [];
  let initialState = {};

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
    initialState = {
      flags: featureList.map((feature) => ({
        ...feature,
        original: feature.active,
      })),
    };
  });
  afterEach(() => {
    // store.dispatch.mockClear();
  });
  test('Proper action is returned for loadFeatureFlags - with empty env array', () => {
    const expectedAction = {
      type: FEATURE_FLAGS_ADD,
      payload: initialState.flags,
    };
    const loadFeatures = loadFeatureFlags(
      featureList,
      true,
      () => {},
      'REACT_APP_FEATURE_FLAGS_EMPTY'
    );
    expect(loadFeatures).toEqual(expectedAction);
  });
  test('Proper action is returned for loadFeatureFlags - with nonexistent env array', () => {
    const expectedAction = {
      type: FEATURE_FLAGS_ADD,
      payload: initialState.flags,
    };
    const loadFeatures = loadFeatureFlags(
      featureList,
      true,
      () => {},
      'REACT_APP_FEATURE_DOES_NOT_EXIST'
    );
    expect(loadFeatures).toEqual(expectedAction);
  });
  test('Proper action is returned for loadFeatureFlags - with  env array', () => {
    const expected = [
      {
        id: 'FRUITS',
        active: true,
        description: 'Fruit list',
        original: true,
      },
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
        original: true,
      },
      { id: 'FOO', active: true, description: 'more foo', original: true },
    ];
    const returned = loadFeatureFlags(
      featureList,
      true,
      () => {},
      'REACT_APP_FEATURE_FLAGS_EDIT'
    );
    const expectedAction = {
      type: FEATURE_FLAGS_ADD,
      payload: expected,
    };

    expect(returned).toEqual(expectedAction);
  });

  test('Proper action is returned for editFeatureFlag', () => {
    const expectedAction = {
      type: FEATURE_FLAG_EDIT,
      payload: { id: 'MY_FEATURE', active: true },
    };
    const returned = editFeatureFlag('MY_FEATURE', true, true);
    expect(returned).toEqual(expectedAction);
  });

  test('Proper action is returned for resetFeatureFlags', () => {
    const expectedAction = { type: FEATURE_FLAGS_RESET };
    const returned = resetFeatureFlags(true);
    expect(returned).toEqual(expectedAction);
  });

  test('Updated state is returned for adding feature flags', () => {
    const action = { type: FEATURE_FLAGS_ADD, payload: initialState.flags };
    expect(reducerFeatureFlags({ flags: [] }, action)).toEqual(initialState);
  });

  test('Updated state is returned for edit feature flags', () => {
    const action = {
      type: FEATURE_FLAG_EDIT,
      payload: { id: 'FRUITS', active: true },
    };
    const newState = {
      flags: [
        {
          id: 'FRUITS',
          active: true,
          description: 'Fruit list',
          original: false,
        },
        {
          id: 'VEGGIES',
          active: true,
          description: 'Vegetable list',
          original: true,
        },
      ],
    };
    expect(reducerFeatureFlags(initialState, action)).toEqual(newState);
  });

  test('Same state is returned for edit unknown feature flags', () => {
    const action = {
      type: FEATURE_FLAG_EDIT,
      payload: { id: 'DOES_NOT_EXIST', active: true },
    };
    expect(reducerFeatureFlags(initialState, action)).toEqual(initialState);
  });

  test('Updated state is returned for reset feature flags', () => {
    const startingState = {
      flags: [
        {
          id: 'FRUITS',
          active: true,
          description: 'Fruit list',
          original: false,
        },
        {
          id: 'VEGGIES',
          active: false,
          description: 'Vegetable list',
          original: true,
        },
      ],
    };
    const action = { type: FEATURE_FLAGS_RESET };
    const expected = {
      flags: [
        {
          id: 'FRUITS',
          active: false,
          description: 'Fruit list',
          original: false,
        },
        {
          id: 'VEGGIES',
          active: true,
          description: 'Vegetable list',
          original: true,
        },
      ],
    };
    expect(reducerFeatureFlags(startingState, action)).toEqual(expected);
  });

  test('Unknown action type returns state', () => {
    const action = { type: 'UNKNOWN_TYPE', payload: false };
    expect(reducerFeatureFlags(initialState, action)).toEqual(initialState);
  });
  test('Is Active in use returns proper value', () => {
    expect(isFeatureActive('FRUITS', featureList)).toEqual(false);
    expect(isFeatureActive('VEGGIES', featureList)).toEqual(true);
  });

  test('Is Active in use returns undefined for an unknown flag', () => {
    expect(isFeatureActive('DOES_NOT_EXIST', featureList)).toEqual(undefined);
  });

  test('getFeatures returns all features', () => {
    expect(getFeatures({ reducerFeatureFlags: initialState })).toEqual(
      initialState.flags
    );
  });
});
