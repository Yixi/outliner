import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { IActionBuildParams } from '@root/command-action/buildAction'

export const generateEditAction = (
  {editorState, currentId}: Partial<IActionBuildParams>,
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
