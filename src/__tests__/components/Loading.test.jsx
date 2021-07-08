/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import Loading from '../../components/Loading';

describe('Loading icon tests', () => {
  let wrapper = '';

  test('Is accessible', async () => {
    wrapper = mount(<Loading />);
    wrapper.update();
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Adds default screen reader only text', () => {
    wrapper = mount(<Loading />);
    wrapper.update();

    expect(wrapper.find('.sr-only')).toHaveLength(1);
    expect(wrapper.find('.sr-only').first().text()).toEqual('Loading');
  });
  test('Props change spinner', () => {
    wrapper = mount(
      <Loading color='danger' size='10px'>
        We are loading data
      </Loading>
    );
    wrapper.update();
    expect(wrapper.find('.sr-only')).toHaveLength(1);
    expect(wrapper.find('.sr-only').first().text()).toEqual(
      'We are loading data'
    );

    expect(wrapper.find('Spinner')).toHaveLength(1);
    expect(wrapper.find('Spinner').first().props().variant).toEqual('danger');
    expect(wrapper.find('Spinner').first().props().style.height).toEqual(
      '10px'
    );
    expect(wrapper.find('Spinner').first().props().style.width).toEqual('10px');
  });

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    wrapper = mount(<Loading />);
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
  */
});
