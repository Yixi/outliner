import { convertFromRaw, EditorState } from 'draft-js'
import { generateIndentAction } from '@root/command-action/commands/indent'
import store from '@root/store'

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

describe('test indent command', () => {
  test('test can indent',() => {

    store.data.getPrevBulletPointById = jest.fn()

    const fn = store.data.getPrevBulletPointById as any

    fn.mockReturnValue({id: '1', children: []})

    const mockEditorState = EditorState.createWithContent(mockContentState)
    const action = generateIndentAction({
      currentId: '2',
      parentId: null,
      index: 1,
      editorState: mockEditorState,
    })

    expect(action).toHaveLength(1)
    expect(action[0].type).toEqual('MOVE')
    expect(action[0].data.id).toEqual('2')
    expect(action[0].data.parentId).toEqual('1')
    expect(action[0].data.index).toEqual(0)
  })

  test('test can not indent', () => {
    store.data.getPrevBulletPointById = jest.fn()

    const fn = store.data.getPrevBulletPointById as any

    fn.mockReturnValue(null)

    const mockEditorState = EditorState.createWithContent(mockContentState)
    const action = generateIndentAction({
      currentId: '2',
      parentId: null,
      index: 1,
      editorState: mockEditorState,
    })

    expect(action).toEqual([])

  })
})
