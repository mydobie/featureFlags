/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
  FeatureFlagsUI,
  FlagType,
  FeatureFlagProvider,
  LOCAL_STORAGE_KEY,
} from '../../components';

let featureList: FlagType[] = [
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

describe('Feature Flags - local storage tests', () => {
  beforeEach(() => {
    featureList = [
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
  });
  test('Expect feature flag list to be accessible', async () => {
    const { container } = render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Features flags are shown', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );
    const listItems = screen.queryAllByRole('listitem');

    expect(listItems).toHaveLength(featureList.length);
    expect(screen.getByTestId('coreFeatureFlagsUI')).toBeInTheDocument();
  });

  test('Feature is set to correct value', () => {
    const { container } = render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
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
      ).toEqual(flag.title || flag.id);

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

  test('Clicking on a feature changes the value', async () => {
    const onFeatureChange = jest.fn(() => {});

    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI onFeatureChange={onFeatureChange} />
      </FeatureFlagProvider>
    );

    expect(screen.queryAllByTestId('flagNotInitialWarning')).toHaveLength(0);
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();

    // ensure that warning icon is shown
    expect(screen.queryAllByTestId('flagNotInitialWarning')).toHaveLength(1);

    await waitFor(() => expect(onFeatureChange.mock.calls.length).toBe(1));
    // @ts-ignore
    expect(onFeatureChange.mock.calls[0][0]).toEqual(featureList[0].id);
    // @ts-ignore
    expect(onFeatureChange.mock.calls[0][1]).toEqual(true);
  });

  test('Click on reset, resets each value to original', () => {
    const onFeatureChange = jest.fn(() => {});
    const onFeatureReset = jest.fn(() => {});

    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI
          onFeatureChange={onFeatureChange}
          onFeatureReset={onFeatureReset}
        />
      </FeatureFlagProvider>
    );

    screen.getAllByRole('checkbox').forEach(async (feature, index) => {
      fireEvent.click(feature);

      await waitFor(() =>
        expect((feature as HTMLInputElement).checked).not.toEqual(
          featureList[index]?.original
        )
      );
    });

    fireEvent.click(screen.getByTestId('resetButton'));

    screen.getAllByRole('checkbox').forEach((feature, index) => {
      expect((feature as HTMLInputElement).checked).toEqual(
        featureList[index].original
      );
    });

    expect(onFeatureReset.mock.calls.length).toBe(1);
  });

  test('All switches are enabled when readonly prop is not set', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );

    expect(screen.getAllByRole('checkbox')).toHaveLength(featureList.length);

    screen.getAllByRole('checkbox').forEach((feature) => {
      expect(feature).not.toBeDisabled();
    });
  });

  test('Feature flag displays without optional items', () => {
    render(
      <FeatureFlagProvider features={[{ id: 'PLAIN' }]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.queryByTestId('feature_description')).not.toBeInTheDocument();
  });

  it('Not default element is shown if a custom one is not passed', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );
    // There is bleed from another test - this ensures back to given stt4e
    fireEvent.click(screen.getByTestId('resetButton'));

    expect(
      screen.queryByTestId('flagNotInitialWarning')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    // ensure that warning icon is shown
    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).toBeInTheDocument();
  });

  it('Custom not default element is shown', () => {
    render(
      <FeatureFlagProvider features={[...featureList]}>
        <FeatureFlagsUI
          notDefaultIndicator={
            <div data-testid='customTestIndicator'>Hello</div>
          }
        />
      </FeatureFlagProvider>
    );
    fireEvent.click(screen.getByTestId('resetButton'));

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    // ensure that warning icon is shown
    expect(screen.queryByTestId('flagNotInitialWarning')).toBeInTheDocument();
    expect(
      screen.queryByTestId('notDefaultIndicatorDefault')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('customTestIndicator')).toBeInTheDocument();
  });

  it('No feature flags are shown if no feature flags are available', () => {
    render(
      <FeatureFlagProvider>
        <FeatureFlagsUI />
      </FeatureFlagProvider>
    );

    expect(screen.queryByTestId('coreFeatureFlagsUI')).not.toBeInTheDocument();
    expect(screen.queryByTestId('noFeatureFlagsMessage')).toBeInTheDocument();
  });

  describe('Persist', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('If persist is set, a warning is shown', () => {
      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      expect(screen.getByTestId('persistAlert')).toBeInTheDocument();
    });

    it('If persist and readonly are set, a warning is not shown', () => {
      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI readonly />
        </FeatureFlagProvider>
      );

      expect(screen.queryByTestId('persistAlert')).not.toBeInTheDocument();
    });

    it('If persist is not set, a warning is not shown', () => {
      render(
        <FeatureFlagProvider features={[...featureList]}>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      expect(screen.queryByTestId('persistAlert')).not.toBeInTheDocument();
    });

    it('Local storage is set on page load', () => {
      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      const expected = JSON.stringify([
        { id: 'INACTIVE', active: false },
        { id: 'ACTIVE', active: true },
      ]);
      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(expected);
    });

    it('Expect context values to take  local storage values on creation', () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([
          { id: 'INACTIVE', active: true },
          { id: 'ACTIVE', active: false },
        ])
      );

      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      const expected = JSON.stringify([
        { id: 'INACTIVE', active: true },
        { id: 'ACTIVE', active: false },
      ]);

      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(expected);
    });

    it('Expect local storage is changed when flag is changed', async () => {
      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      const expected = JSON.stringify([
        { id: 'INACTIVE', active: false },
        { id: 'ACTIVE', active: true },
      ]);
      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(expected);

      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();

      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      const expectedAfterClick = JSON.stringify([
        { id: 'INACTIVE', active: true },
        { id: 'ACTIVE', active: true },
      ]);

      await waitFor(() =>
        expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
          expectedAfterClick
        )
      );
    });

    it('Reset also changes local storage', async () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([
          { id: 'INACTIVE', active: true },
          { id: 'ACTIVE', active: false },
        ])
      );

      render(
        <FeatureFlagProvider features={[...featureList]} persist hideWarnings>
          <FeatureFlagsUI />
        </FeatureFlagProvider>
      );

      const expected = JSON.stringify([
        { id: 'INACTIVE', active: true },
        { id: 'ACTIVE', active: false },
      ]);

      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(expected);

      fireEvent.click(screen.getByTestId('resetButton'));

      const expectedAfterReset = JSON.stringify([
        { id: 'INACTIVE', active: false },
        { id: 'ACTIVE', active: true },
      ]);
      await waitFor(() =>
        expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
          expectedAfterReset
        )
      );
    });
  });
});
