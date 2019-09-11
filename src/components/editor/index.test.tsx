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

  test('should handle tab key', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Editor id="1" onCommandEvent={mockFn}/>)
    const editElement = wrapper.find(EditorSelector)

    editElement.simulate('keyDown', {
      keyCode: KEY_CODE.TAB,
    })
    expect(mockFn).toHaveBeenCalledWith('INDENT', expect.any(EditorState))

    editElement.simulate('keyDown', {
      keyCode: KEY_CODE.TAB,
      shiftKey: true,
    })
    expect(mockFn).toHaveBeenCalledWith('OUTDENT', expect.any(EditorState))
  })

  test('should handle arrow key', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Editor id="1" onCommandEvent={mockFn}/>)
    const editElement = wrapper.find(EditorSelector)

    editElement.simulate('keyDown', {
      keyCode: KEY_CODE.UP,
    })
    expect(mockFn).toHaveBeenCalledWith('UP', expect.any(EditorState))

    editElement.simulate('keyDown', {
      keyCode: KEY_CODE.DOWN,
      shiftKey: true,
    })
    expect(mockFn).toHaveBeenCalledWith('DOWN', expect.any(EditorState))
  })

})
