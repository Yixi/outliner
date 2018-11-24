import { IActionBuildParams } from '@root/command-action/buildAction'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { splitContentState } from '@root/tools/splitContentState'
import store from '@root/store'
import cursorMange from '@root/tools/cursorManage'
import { EditorState } from 'draft-js'

export const generateBackspaceAction = (
  {currentId, editorState, index}: Partial<IActionBuildParams>) => {

  const currentContentState = editorState.getCurrentContent()
  const [leftContentState, rightContentState] = splitContentState(editorState)

  const cursorBulletPoint = store.data.getPrevBulletPointById(currentId, index)

  if (cursorBulletPoint) {
    let tempEditorState = EditorState.createWithContent(cursorBulletPoint.content)
    tempEditorState = EditorState.moveFocusToEnd(tempEditorState)

    cursorMange.setNextCursor({
      editorId: cursorBulletPoint.id,
      selectionState: tempEditorState.getSelection(),
    })
  }

  const isCase1 = currentContentState.getPlainText().length === 0

  if (isCase1) {
    console.log('case 1')
    return [
      actionLog.generateLog(ACTION_TYPE.DELETE, {id: currentId}),
    ]
  } else {

    return []
  }
}
