/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
  FeatureFlagsUI,
  FlagType,
  FeatureFlagProvider,
} from '../../components';

const featureList: FlagType[] = [
  {
    id: 'INACTIVE',
    active: false,
    title: 'Inactive features',
  },
  {
    id: 'ACTIVE',
    active: true,
    title: 'Active features',
  },
];

describe('Feature Flags - ReadOnly UI', () => {
  test('Expect feature flag list to be accessible', async () => {
    const { container } = render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Correct number of features flags are shown', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(featureList.length);

    expect(
      screen.getByTestId('coreFeatureFlagsUIReadonly')
    ).toBeInTheDocument();
  });

  test('Features are set to correct value', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );

    const listItems = screen.getAllByRole('listitem');

    featureList.forEach((flag, index) => {
      expect(
        listItems[index].querySelector('[data-feature-is-active]')
      ).toHaveAttribute('data-feature-is-active', flag.active?.toString());

      expect(
        listItems[index].querySelector('[data-label-title]')?.innerHTML.trim()
      ).toEqual(flag.title);

      if (flag.description) {
        expect(
          listItems[index]
            .querySelector('[data-label-description]')
            ?.innerHTML.trim()
        ).toEqual(flag.description);
      } else {
        expect(
          listItems[index].querySelector('[data-label-description]')
        ).not.toBeInTheDocument();
      }
    });
  });

  test('Feature flag displays without optional items', () => {
    render(
      <FeatureFlagProvider
        features={[
          {
            id: 'FRUITS',
          },
        ]}
      >
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );
    const listItem = screen.getByRole('listitem');

    expect(listItem?.querySelector('[data-feature-is-active]')).toHaveAttribute(
      'data-feature-is-active',
      'false'
    );

    expect(
      listItem?.querySelector('[data-label-title]')?.innerHTML.trim()
    ).toEqual('FRUITS');

    expect(
      listItem?.querySelector('[data-label-description]')
    ).not.toBeInTheDocument();
  });

  it('Not default element is shown if a custom one is not passed', () => {
    render(
      <FeatureFlagProvider
        features={[
          {
            id: 'FRUITS',
            active: true,
            original: false,
          },
        ]}
      >
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );

    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).toBeInTheDocument();
  });

  it('Custom not default element is shown', () => {
    render(
      <FeatureFlagProvider
        features={[
          {
            id: 'FRUITS',
            active: true,
            original: false,
          },
        ]}
      >
        <FeatureFlagsUI
          readonly
          notDefaultIndicator={
            <div data-testid='customTestIndicator'>Hello</div>
          }
        />
      </FeatureFlagProvider>
    );

    // ensure that warning icon is shown
    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).not.toBeInTheDocument();

    expect(screen.queryAllByTestId('customTestIndicator')).toHaveLength(1);
  });

  it('No feature flags are shown if no feature flags are available', () => {
    render(
      <FeatureFlagProvider>
        <FeatureFlagsUI readonly />
      </FeatureFlagProvider>
    );
    expect(
      screen.queryByTestId('coreFeatureFlagsUIReadonly')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('noFeatureFlagsMessage')).toBeInTheDocument();
  });
});
