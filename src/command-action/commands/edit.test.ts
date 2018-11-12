import { convertFromRaw, EditorState } from 'draft-js'
import { generateEditAction } from '@root/command-action/commands/edit'

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
describe('test edit command', () => {
  test('test edit log', () => {
    const mockEditorState = EditorState.createWithContent(mockContentState)

    const actions = generateEditAction({
      currentId: '2',
      editorState: mockEditorState,
    })

    expect(actions).toHaveLength(1)
    expect(actions[0].type).toEqual('EDIT')
    expect(actions[0].data.id).toEqual('2')
    expect(actions[0].data.content.getPlainText()).toEqual('content 2')
  })
})
