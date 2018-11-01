import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { EditorState } from 'draft-js'

export const generateEditAction = (
  {editorState, currentId}: {
    editorState: EditorState,
    currentId: string,
  },
) => {

  return [
    actionLog.generateLog(
      ACTION_TYPE.EDIT,
      {
        id: currentId,
        content: editorState.getCurrentContent(),
      },
    ),
  ]
}
