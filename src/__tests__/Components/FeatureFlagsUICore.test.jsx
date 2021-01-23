/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';

import FeatureFlagsUICore from '../../Components/FeatureFlagsUICore';

describe('Edit feature flags UI (aka core UI)', () => {
  let wrapper = '';
  const featureList = [
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
  ];
  const onFeatureChange = jest.fn();
  const onFeatureReset = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <FeatureFlagsUICore
        features={featureList}
        onFeatureClick={onFeatureChange}
        onFeatureReset={onFeatureReset}
      />
    );
  });
  afterEach(() => {
    onFeatureChange.mockClear();
    onFeatureReset.mockClear();
  });

  test('Component is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Correct number items are show an checked appropriately', () => {
    const inputs = wrapper.find('CBox');
    expect(inputs).toHaveLength(featureList.length);

    let counter = 0;

    inputs.forEach((input, index) => {
      expect(input.props().checked).toEqual(featureList[index].active);
      counter += 1;
    });
    expect(counter).toEqual(featureList.length);
  });

  test('OnFeatureClick is called on checkbox change', () => {
    wrapper
      .find('CBox')
      .first()
      .simulate('change', { target: { checked: true } });
    expect(onFeatureChange).toBeCalledTimes(1);
    expect(onFeatureChange.mock.calls[0][0]).toEqual(featureList[0].id);
    expect(onFeatureChange.mock.calls[0][1]).toEqual(!featureList[0].inuse);
  });

  test('onFeatureReset is called when reset button is pressed', () => {
    wrapper.find('#resetFeatureFlags').first().simulate('click');
    expect(onFeatureReset).toBeCalledTimes(1);
  });

  test('Inputs are enabled when readonly is not set (defaults to false)', () => {
    expect(wrapper.props().readonly).toEqual(undefined); // this is then translated to false
    const input = wrapper.find('CBox').first();
    expect(input.props().disabled).toEqual(false);
    expect(wrapper.find('#resetFeatureFlags')).toHaveLength(1);
  });

  test('Inputs are disabled when readonly is set to true', () => {
    wrapper = shallow(
      <FeatureFlagsUICore
        features={featureList}
        onFeatureClick={onFeatureChange}
        onFeatureReset={onFeatureReset}
        readonly
      />
    );
    const input = wrapper.find('CBox').first();
    expect(input.props().disabled).toEqual(true);
    expect(wrapper.find('#resetFeatureFlags')).toHaveLength(0);
  });

  test('Inputs that are in use are in bold', () => {
    const index = 1;
    expect(featureList[index].active).toEqual(true);
    expect(
      wrapper.find('.customInputItem').at(index).props().style.fontWeight
    ).toEqual('bold');
  });

  test('Inputs that are not inuse are not bold', () => {
    const index = 0;
    expect(featureList[index].active).toEqual(false);
    expect(
      wrapper.find('.customInputItem').at(index).props().style.fontWeight
    ).toEqual('');
  });
});
