/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import SAMPLE from '../__templates__/SAMPLE';

describe('EXAMPLE', () => {
  let wrapper = '';
  beforeAll(() => {
    wrapper = mount(<SAMPLE />);
    wrapper.update();
  });
  beforeEach(() => {});
  afterEach(() => {});
  afterAll(() => {});

  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test.todo('EXAMPLE to do test');

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    expect(wrapper).toMatchSnapshot();
  });
  */
});
