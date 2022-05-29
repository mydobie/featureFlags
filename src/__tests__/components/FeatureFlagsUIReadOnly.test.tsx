/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FlagType, loadFeatureFlags } from '../../components/featureFlags';
import FeatureFlagsUI from '../../components/FeatureFlagsUI';

describe('Feature Flags - local storage tests', () => {
  let featureList: FlagType[] = [];
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
    loadFeatureFlags({ features: featureList, persist: false });
  });

  test('Expect feature flag list to be accessible', async () => {
    const { container } = render(<FeatureFlagsUI readonly />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Features flags are shown', () => {
    render(<FeatureFlagsUI readonly />);
    const listItems = screen.queryAllByRole('listitem');

    expect(listItems).toHaveLength(featureList.length);
    expect(
      screen.getByTestId('coreFeatureFlagsUIReadonly')
    ).toBeInTheDocument();
  });

  test('Feature is set to correct value', () => {
    const { container } = render(<FeatureFlagsUI readonly />);

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
    localStorage.clear();
    featureList = [
      {
        id: 'FRUITS',
      },
    ];

    loadFeatureFlags({ features: featureList, persist: false });
    const { container } = render(<FeatureFlagsUI readonly />);
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
    localStorage.clear();
    featureList = [
      {
        id: 'FRUITS',
        active: true,
        original: false,
      },
    ];

    loadFeatureFlags({ features: featureList, persist: false });
    render(<FeatureFlagsUI readonly />);

    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).toBeInTheDocument();
  });

  it('Custom not default element is shown', () => {
    localStorage.clear();
    featureList = [
      {
        id: 'FRUITS',
        active: true,
        original: false,
      },
    ];

    loadFeatureFlags({ features: featureList, persist: false });
    render(
      <FeatureFlagsUI
        readonly
        notDefaultIndicator={<div data-testid='customTestIndicator'>Hello</div>}
      />
    );

    // ensure that warning icon is shown
    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).not.toBeInTheDocument();

    expect(screen.queryAllByTestId('customTestIndicator')).toHaveLength(1);
  });

  it('No feature flags are shown if no feature flags are available', () => {
    localStorage.clear();

    loadFeatureFlags({ features: [], persist: false });
    render(<FeatureFlagsUI readonly />);
    expect(
      screen.queryByTestId('coreFeatureFlagsUIReadonly')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('noFeatureFlagsMessage')).toBeInTheDocument();
  });
});
