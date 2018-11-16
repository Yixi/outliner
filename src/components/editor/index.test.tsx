import { mount } from 'enzyme'
import * as React from 'react'
import Editor from '@root/components/editor/index'
import { KEY_CODE } from '@root/constant/keyCode'
import { EditorState } from 'draft-js'

const EditorSelector = '.public-DraftEditor-content'

describe('test Editor component', () => {
  test('should render correct', () => {

    const mockFn = jest.fn()

    const wrapper = mount(<Editor id="1" onCommandEvent={mockFn}/>)

    expect(wrapper.find('DraftEditor').length).toEqual(1)
  })

  test('should handle add command', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Editor id="1" onCommandEvent={mockFn}/>)
    const editElement = wrapper.find(EditorSelector)

    editElement.simulate('keyDown', {
      keyCode: KEY_CODE.ENTER,
    })

    expect(mockFn).toHaveBeenCalledWith('ADD', expect.any(EditorState))

  })
})
