import { IActionBuildParams } from '@root/command-action/buildAction'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { splitContentState } from '@root/tools/splitContentState'
import store from '@root/store'
import cursorMange from '@root/tools/cursorManage'
import { EditorState, ContentState } from 'draft-js'

export const generateBackspaceAction = (
  {currentId, editorState, index, haveChildren}: Partial<IActionBuildParams>) => {

  const currentContentState = editorState.getCurrentContent()
  const [leftContentState, rightContentState] = splitContentState(editorState)

  const cursorBulletPoint = store.data.getPrevVisibleBulletPoint(currentId, index)
  const sameLevelPrevBulletPoint = store.data.getSameLevelPrevBulletPoint(currentId, index)

  const isCase1 = currentContentState.getPlainText().length === 0 && !haveChildren
  const inCase3 = leftContentState.getPlainText().length === 0 &&
    rightContentState.getPlainText().length > 1 &&
    sameLevelPrevBulletPoint &&
    sameLevelPrevBulletPoint.children.length === 0

  if (isCase1) {
    console.info('case 1')

    if (cursorBulletPoint) {
      let tempEditorState = EditorState.createWithContent(cursorBulletPoint.content)
      tempEditorState = EditorState.moveFocusToEnd(tempEditorState)

      cursorMange.setNextCursor({
        editorId: cursorBulletPoint.id,
        selectionState: tempEditorState.getSelection(),
      })
    }

    return [
      actionLog.generateLog(ACTION_TYPE.DELETE, {id: currentId}),
    ]
  } else if (inCase3) {

    // const content = ContentState.createFromBlockArray([
    //   ...sameLevelPrevBulletPoint.content.getBlocksAsArray(),
    //   ...rightContentState.getBlocksAsArray(),
    // ])

    cursorMange.setNextCursor({
      editorId: currentId,
      offset: sameLevelPrevBulletPoint.content.getPlainText().length,
    })

    const content = ContentState.createFromText(
      `${sameLevelPrevBulletPoint.content.getPlainText()}${rightContentState.getPlainText()}`,
    )

    return [
      actionLog.generateLog(ACTION_TYPE.DELETE, {id: sameLevelPrevBulletPoint.id}),
      actionLog.generateLog(ACTION_TYPE.EDIT, {id: currentId, content}),

    ]
  } else {

    return []
  }
}
