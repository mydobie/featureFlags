/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import FourOhFour from '../../pages/FourOhFour';

describe('404 tests', () => {
  let wrapper = '';
  beforeAll(() => {
    // Since the component doesn't have any props nor state
    // we can grab a single copy to use for all tests
    wrapper = mount(<FourOhFour />);
    wrapper.update();
  });
  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    expect(wrapper).toMatchSnapshot();
  });
  */
});
