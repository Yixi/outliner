import { shallow } from 'enzyme'
import HeaderBar from '@root/views/header/index'
import * as React from 'react'

describe('test view HeaderBar', () => {
  test('should render <HeaderBar> correct', () => {
    const wrapper = shallow(<HeaderBar/>)
    expect(wrapper.text()).toEqual('Outliner')
  })
})
