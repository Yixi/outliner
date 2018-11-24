import { IActionBuildParams } from '@root/command-action/buildAction'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import store from '@root/store'
import cursorMange from '@root/tools/cursorManage'

export const generateIndentAction = ({currentId, parentId, index, editorState}: Partial<IActionBuildParams>) => {

  const prevBulletPoint = store.data.getSameLevelPrevBulletPointById(currentId, index)

  if (prevBulletPoint) {

    cursorMange.setNextCursor({
      editorId: currentId,
      selectionState: editorState.getSelection(),
    })

    return [
      actionLog.generateLog(
        ACTION_TYPE.MOVE,
        {
          id: currentId,
          parentId: prevBulletPoint.id,
          index: prevBulletPoint.children.length,
        },
        {
          index,
          parentId,
        },
      ),
    ]
  }

  return []

}
