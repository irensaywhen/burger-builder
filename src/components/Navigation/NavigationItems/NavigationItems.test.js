import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  // Will be executed before each of your tests
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  test('should render two navigation items if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  test('should have three nav items if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  test('Should have logout item when authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });

    expect(
      wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
    ).toEqual(true);
  });
});
