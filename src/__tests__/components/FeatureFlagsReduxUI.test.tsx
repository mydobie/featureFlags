/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { axe } from 'jest-axe';
import configureStore from '../../redux/store';
import { loadFeatureFlagsRedux } from '../../components/featureFlagsReducers';

import FeatureFlagsReduxUI from '../../components/FeatureFlagsReduxUI';
import { FlagType } from '../../components';

describe('Feature Flags - local storage tests', () => {
  let featureList: FlagType[] = [];
  const store = configureStore();
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
    store.dispatch(
      loadFeatureFlagsRedux({
        features: featureList,
        persist: false,
        reset: true,
      })
    );
  });

  test('Expect feature flag list to be accessible', async () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Features flags are shown', () => {
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    const listItems = screen.queryAllByRole('listitem');

    expect(listItems).toHaveLength(featureList.length);
    expect(screen.getByTestId('coreFeatureFlagsUI')).toBeInTheDocument();
  });

  test('Feature is set to correct value', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    const listItems = container.querySelectorAll('li');

    featureList.forEach((flag, index) => {
      // @ts-ignore
      expect(listItems.item(index).querySelector('input').checked).toEqual(
        flag.active
      );
      expect(
        // @ts-ignore
        listItems.item(index).querySelector('label').innerHTML.trim()
      ).toEqual(flag.description);
    });
  });

  test('Clicking on a feature changes the value', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );

    expect(screen.queryAllByTestId('flagNotInitialWarning')).toHaveLength(0);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // @ts-ignore
    expect(checkboxes[0].checked).toEqual(featureList[0].active);
    fireEvent.click(checkboxes[0]);

    expect(
      // @ts-ignore
      container.querySelectorAll('input[type="checkbox"]')[0].checked
    ).toEqual(!featureList[0].active);

    // ensure that warning icon is shown
    expect(screen.queryAllByTestId('flagNotInitialWarning')).toHaveLength(1);
  });

  test.todo('Feature are overritten when override array');

  test('If persist is not set, warning is  not shown', () => {
    store.dispatch(
      loadFeatureFlagsRedux({ features: featureList, persist: false })
    );
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    expect(screen.queryByTestId('persistAlert')).not.toBeInTheDocument();
  });

  test('If persist is set, warning is shown', () => {
    store.dispatch(
      loadFeatureFlagsRedux({ features: featureList, persist: true })
    );
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    expect(screen.queryByTestId('persistAlert')).toBeInTheDocument();
  });

  test('Click on reset, rests each value to original', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => fireEvent.click(checkbox));
    expect(
      // @ts-ignore
      container.querySelector('input[type="checkbox"]').checked
    ).not.toEqual(featureList[0].active);

    fireEvent.click(screen.getByTestId('resetButton'));

    container
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox, index) => {
        // @ts-ignore
        expect(checkbox.checked).toEqual(featureList[index].active);
      });
  });

  test('All switches are enabled when readonly prop is not set', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI />
      </Provider>
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(featureList.length);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeDisabled();
    });
  });

  test('Readonly prop disables the switch and hides reset button', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(featureList.length);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled();
    });
  });
});
