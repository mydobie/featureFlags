/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import Home from '../../pages/Home';

describe('Home component tests', () => {
  test('Home component is accessible', async () => {
    const wrapper = mount(<Home />);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
});
