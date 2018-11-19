import store from '@root/store'
import { convertFromRaw, EditorState } from 'draft-js'
import { generateOutdentAction } from '@root/command-action/commands/outdent'

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

describe('test outdent command', () => {
  test('test can outdent', () => {
    store.data.getBulletPointInfoById = jest.fn()

    const fn = store.data.getBulletPointInfoById as any

    fn.mockReturnValue(['3', 0])

    const mockEditorState = EditorState.createWithContent(mockContentState)

    const action = generateOutdentAction({
      currentId: '2',
      index: 2,
      parentId: '1',
      editorState: mockEditorState,
    })

    expect(action).toHaveLength(1)
    expect(action[0].type).toEqual('MOVE')
    expect(action[0].data.id).toEqual('2')
    expect(action[0].data.parentId).toEqual('3')
    expect(action[0].data.index).toEqual(1)
    expect(action[0].prevData.index).toEqual(2)
    expect(action[0].prevData.parentId).toEqual('1')
  })

  test('test can note outdent', () => {
    store.data.getBulletPointInfoById = jest.fn()

    const fn = store.data.getBulletPointInfoById as any

    fn.mockReturnValue([null, null])

    const mockEditorState = EditorState.createWithContent(mockContentState)

    const action = generateOutdentAction({
      currentId: '2',
      index: 2,
      parentId: null,
      editorState: mockEditorState,
    })

    expect(action).toEqual([])
  })
})
