import { convertFromRaw, EditorState, SelectionState } from 'draft-js'
import { generateCreateAction } from '@root/command-action/commands/add'

const mockContentState = convertFromRaw({
  blocks: [
    {
      key: '427gk',
      text: 'content 2',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
})

describe('test add command', () => {
  test('test case 1', () => {
    let mockEditorState = EditorState.createWithContent(mockContentState)
    const mockSelectionState = new SelectionState({
      anchorKey: '427gk',
      anchorOffset: 9,
      focusKey: '427gk',
      focusOffset: 9,
    })
    mockEditorState = EditorState.forceSelection(mockEditorState, mockSelectionState)

    const actions = generateCreateAction({
      editorState: mockEditorState,
      currentId: '2',
      parentId: null,
      index: 1,
      expand: true,
      haveChildren: true,
    })

    expect(actions).toHaveLength(1)
    expect(actions[0].type).toEqual('CREATE')
    expect(actions[0].data.parentId).toEqual('2')
    expect(actions[0].data.index).toEqual(0)

  })
})
