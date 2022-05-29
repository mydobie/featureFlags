/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { axe } from 'jest-axe';
import configureStore from '../../redux/store';
import { FlagType } from '../../components/featureFlags';
import FeatureFlagsReduxUI from '../../components/FeatureFlagsReduxUI';
import { loadFeatureFlagsRedux } from '../../components/featureFlagsReducers';

describe('Feature Flags - local storage tests', () => {
  let featureList: FlagType[] = [];
  const store = configureStore();
  beforeEach(() => {
    localStorage.clear();
    featureList = [
      {
        id: 'FRUITS',
        active: false,
        title: 'Fruit list',
        description: 'This is the fruit list.',
      },
      {
        id: 'VEGGIES',
        active: true,
        title: 'Vegetable list',
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
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Features flags are shown', () => {
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );
    const listItems = screen.queryAllByRole('listitem');

    expect(listItems).toHaveLength(featureList.length);
    expect(
      screen.getByTestId('coreFeatureFlagsUIReadonly')
    ).toBeInTheDocument();
  });

  test('Feature is set to correct value', () => {
    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );

    const listItems = container.querySelectorAll('li');

    featureList.forEach((flag, index) => {
      expect(
        listItems.item(index).querySelector('[data-feature-is-active]')
      ).toHaveAttribute('data-feature-is-active', flag.active?.toString());

      expect(
        listItems
          .item(index)
          .querySelector('[data-label-title]')
          ?.innerHTML.trim()
      ).toEqual(flag.title);

      if (flag.description) {
        expect(
          listItems
            .item(index)
            .querySelector('[data-label-description]')
            ?.innerHTML.trim()
        ).toEqual(flag.description);
      } else {
        expect(
          listItems.item(index).querySelector('[data-label-description]')
        ).not.toBeInTheDocument();
      }
    });
  });

  test('Feature flag displays without optional items', () => {
    featureList = [
      {
        id: 'FRUITS',
      },
    ];
    store.dispatch(
      loadFeatureFlagsRedux({
        features: featureList,
        persist: false,
        reset: true,
      })
    );

    const { container } = render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );
    const listItem = container.querySelector('li');

    expect(listItem?.querySelector('[data-feature-is-active]')).toHaveAttribute(
      'data-feature-is-active',
      'false'
    );

    expect(
      listItem?.querySelector('[data-label-title]')?.innerHTML.trim()
    ).toEqual(featureList[0].id);

    expect(
      listItem?.querySelector('[data-label-description]')
    ).not.toBeInTheDocument();
  });

  it('Not default element is shown if a custom one is not passed', () => {
    featureList = [
      {
        id: 'FRUITS',
        active: true,
        original: false,
      },
    ];

    store.dispatch(
      loadFeatureFlagsRedux({
        features: featureList,
        persist: false,
        reset: true,
      })
    );

    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );

    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).toBeInTheDocument();
  });

  it('Custom not default element is shown', () => {
    featureList = [
      {
        id: 'FRUITS',
        active: true,
        original: false,
      },
    ];

    store.dispatch(
      loadFeatureFlagsRedux({
        features: featureList,
        persist: false,
        reset: true,
      })
    );
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI
          readonly
          notDefaultIndicator={
            <div data-testid='customTestIndicator'>Hello</div>
          }
        />
      </Provider>
    );

    // ensure that warning icon is shown
    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).not.toBeInTheDocument();

    expect(screen.queryAllByTestId('customTestIndicator')).toHaveLength(1);
  });

  it('No feature flags are shown if no feature flags are available', () => {
    store.dispatch(
      loadFeatureFlagsRedux({
        features: [],
        persist: false,
        reset: true,
      })
    );
    render(
      <Provider store={store}>
        <FeatureFlagsReduxUI readonly />
      </Provider>
    );
    expect(
      screen.queryByTestId('coreFeatureFlagsUIReadonly')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('noFeatureFlagsMessage')).toBeInTheDocument();
  });
});
