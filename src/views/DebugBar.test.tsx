import * as React from 'react'
import { shallow } from 'enzyme'
import DebugBarComponent from '@root/views/DebugBar'
import { UI } from '@root/store/UI'

let ui: UI
const DebugBar = DebugBarComponent as any

describe('Test Debug bar Component', () => {
  beforeEach(() => {
    ui = new UI()
    ui.initDebugConfig({debugMode: true})
  })

  test('should not render debugbar when debug mode is off', () => {
    ui.initDebugConfig({debugMode: false})
    const wrapper = shallow(<DebugBar.wrappedComponent ui={ui} />)
    expect(wrapper.find('label').length).toEqual(0)
  })

  test('should render Debug bar Component correct', () => {
    const wrapper = shallow(<DebugBar.wrappedComponent ui={ui}/>)
    expect(wrapper.find('label').length).toEqual(1)
  })

})
