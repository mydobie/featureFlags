/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import Version from '../../pages/Version';

const fs = require('fs');

describe('Version tests', () => {
  let wrapper = '';
  beforeAll(() => {
    // Since the component doesn't have any props nor state
    // we can grab a single copy to use for all tests
    wrapper = mount(<Version />);
    wrapper.update();
  });
  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData);
    const { version, name } = packageJson;
    expect(wrapper.find('#appNameFromPackageJson').text()).toEqual(name);
    expect(wrapper.find('#appVersionFromPackageJson').text()).toEqual(version);
    expect(wrapper.find('#gitCommitHash').text()).toEqual('foo');
  });

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    expect(wrapper).toMatchSnapshot();
  });
  */
});
