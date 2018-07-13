import React from 'react';
import { mount, shallow } from 'enzyme';
import UVIndex from '../../src/components/UVIndex';

it('should render UVIndex component without crashing', () => {
  shallow(<UVIndex />);
});

it('should render UVIndex with "high" warning', () => {
  const wrapper = mount(<UVIndex uvData={11} />);

  const title = wrapper.find('h1.uvindex__title').text();
  const subTitle = wrapper.find('p').text();

  expect(title).toEqual('11');
  expect(subTitle).toEqual('Be careful! The UV Index is currently Very High!');
});

it('should render UVIndex with sunscreen warning', () => {
  const wrapper = mount(<UVIndex uvData={7} />);

  const title = wrapper.find('h1.uvindex__title').text();
  const subTitle = wrapper.find('p').text();

  expect(title).toEqual('7');
  expect(subTitle).toEqual('Be sure to use sunscreen. The UV Index is currently High.');
});

it('should render UVIndex with no warning', () => {
  const wrapper = mount(<UVIndex uvData={1} />);

  const title = wrapper.find('h1.uvindex__title').text();
  const subTitle = wrapper.find('p').text();

  expect(title).toEqual('1');
  expect(subTitle).toEqual("The UV Index isn't too bad currently.");
});
