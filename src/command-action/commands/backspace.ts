import { IActionBuildParams } from '@root/command-action/buildAction'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { splitContentState } from '@root/tools/splitContentState'

export const generateBackspaceAction = (
  {currentId, editorState}: Partial<IActionBuildParams>) => {

  const currentContentState = editorState.getCurrentContent()
  const [leftContentState, rightContentState] = splitContentState(editorState)

  const isCase1 = currentContentState.getPlainText().length === 0

  console.log('backspace action')

  if (isCase1) {
    console.log('case 1')
    return [
      actionLog.generateLog(ACTION_TYPE.DELETE, {id: currentId}),
    ]
  } else {

    return []
  }
}
