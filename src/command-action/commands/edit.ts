import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import cursorMange from '@root/tools/cursorManage'
import { EditorState } from 'draft-js'

export const generateEditAction = (
  {editorState, currentId}: {
    editorState: EditorState,
    currentId: string,
  },
) => {

  cursorMange.setNextCursor({
    editorId: currentId,
    offset: editorState.getSelection().getStartOffset(),
  })

  return [
    actionLog.generateLog(
      ACTION_TYPE.EDIT,
      {
        id: currentId,
        content: editorState.getCurrentContent().getPlainText(),
      },
    ),
  ]
}
