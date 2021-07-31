/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
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
        description: 'Fruit list',
      },
      {
        id: 'VEGGIES',
        active: true,
        description: 'Vegetable list',
      },
    ];
    loadFeatureFlags({ features: featureList, persist: false });
  });

  test('Expect feature flag list to be accessible', async () => {
    const { container } = render(<FeatureFlagsUI />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.innerHTML).not.toBeNull();
  });

  test('Features flags are shown', () => {
    render(<FeatureFlagsUI />);
    const listItems = screen.queryAllByRole('listitem');

    expect(listItems).toHaveLength(featureList.length);
    expect(screen.getByTestId('coreFeatureFlagsUI')).toBeInTheDocument();
  });

  test('Feature is set to correct value', () => {
    const { container } = render(<FeatureFlagsUI />);

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
    const onFeatureChange = jest.fn(() => {});
    const { container } = render(
      <FeatureFlagsUI onFeatureChange={onFeatureChange} />
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

    // ensure that featurechagne callback was called
    const expected = featureList.map((flag) => ({
      ...flag,
      original: flag.active,
    }));
    expected[0].active = !expected[0].active;
    expect(onFeatureChange.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(onFeatureChange.mock.calls[0][0]).toEqual(expected);
  });

  test('If persist is not set, warning is not shown', () => {
    loadFeatureFlags({ features: featureList, persist: false });
    render(<FeatureFlagsUI />);
    expect(screen.queryByTestId('persistAlert')).not.toBeInTheDocument();
  });

  test('If persist is set, warning is shown', () => {
    loadFeatureFlags({ features: featureList, persist: true });
    render(<FeatureFlagsUI />);
    expect(screen.queryByTestId('persistAlert')).toBeInTheDocument();
  });

  test('Click on reset, rests each value to original', () => {
    const onFeatureChange = jest.fn(() => {});
    const { container } = render(
      <FeatureFlagsUI onFeatureChange={onFeatureChange} />
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
    expect(onFeatureChange.mock.calls.length).toBe(checkboxes.length + 1);
    // @ts-ignore
    expect(onFeatureChange.mock.calls[checkboxes.length][0]).toEqual(
      featureList.map((feature) => ({ ...feature, original: feature.active }))
    );
  });
});