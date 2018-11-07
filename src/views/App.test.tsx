import * as React from 'react'
import { shallow } from 'enzyme'
import App from '@root/views/App'

describe('App Page test', () => {
  test('should render App correct', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('HeaderBar').length).toEqual(1)
    expect(wrapper.find('DebugBar').length).toEqual(1)
  })
})
