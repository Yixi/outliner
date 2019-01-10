import Draft, { ContentState, convertFromRaw, SelectionState, EditorState } from 'draft-js'
import store from '@root/store'
import { generateBackspaceAction } from '@root/command-action/commands/backspace'

const mockContentState = convertFromRaw({
  blocks: [
    {
      key: '427gk',
      text: 'content 3',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
})

describe('test backspace command', () => {

  test('test case 1', () => {
    store.data.getPrevVisibleBulletPoint = jest.fn()
    store.data.getSameLevelPrevBulletPoint = jest.fn()
    const prevFn = store.data.getPrevVisibleBulletPoint as any
    const sameLevelPrevFn = store.data.getSameLevelPrevBulletPoint as any

    prevFn.mockReturnValue({
      id: '2',
      content: mockContentState,
    })

    sameLevelPrevFn.mockReturnValue({
      id: '2',
      content: ContentState.createFromText('abc'),
      children: [],
    })

    const mockEditorState = EditorState.createWithContent(ContentState.createFromText(''))

    const action = generateBackspaceAction({
      currentId: '1',
      editorState: mockEditorState,
      index: 1,
    })

    expect(action).toHaveLength(1)
    expect(action[0].type).toEqual('DELETE')
    expect(action[0].data.id).toEqual('1')

  })

  test('test case 3', () => {
    store.data.getPrevVisibleBulletPoint = jest.fn()
    store.data.getSameLevelPrevBulletPoint = jest.fn()
    const prevFn = store.data.getPrevVisibleBulletPoint as any
    const sameLevelPrevFn = store.data.getSameLevelPrevBulletPoint as any

    prevFn.mockReturnValue({
      id: '2',
      content: mockContentState,
    })

    sameLevelPrevFn.mockReturnValue({
      id: '2',
      content: ContentState.createFromText('abc'),
      children: [],
    })

    const mockSelectionState = new SelectionState({
      anchorKey: '427gk',
      anchorOffset: 0,
      focusKey: '427gk',
      focusOffset: 0,
    })

    let mockEditorState = EditorState.createWithContent(mockContentState)
    mockEditorState = EditorState.forceSelection(mockEditorState, mockSelectionState)

    const action = generateBackspaceAction({
      currentId: '1',
      editorState: mockEditorState,
      index: 1,
    })

    expect(action).toHaveLength(2)
    expect(action[0].type).toEqual('DELETE')
    expect(action[1].type).toEqual('EDIT')
    expect(action[0].data.id).toEqual('2')
    expect(action[1].data.id).toEqual('1')

  })
})
