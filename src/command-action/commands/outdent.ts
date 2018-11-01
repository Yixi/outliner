import { IActionBuildParams } from '@root/command-action/buildAction'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import store from '@root/store'
import cursorMange from '@root/tools/cursorManage'

export const generateOutdentAction = (
  {currentId, index, parentId, editorState}: Partial<IActionBuildParams>) => {

  if (parentId) {
    const [newParentId, newIndex] = store.data.getBulletPointInfoById(parentId)

    cursorMange.setNextCursor({
      editorId: currentId,
      selectionState: editorState.getSelection(),
    })

    return [
      actionLog.generateLog(
        ACTION_TYPE.MOVE,
        {
          id: currentId,
          parentId: newParentId,
          index: newIndex + 1,
        },
        {
          index, parentId,
        },
      ),
    ]
  }

  return []
}
