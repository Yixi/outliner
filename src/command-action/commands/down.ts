import { IActionBuildParams } from '@root/command-action/buildAction'
import { IActionLog } from '@root/command-action/actionLog'
import store from '@root/store'
import cursorMange from '@root/tools/cursorManage'

export const generateDownAction = (
  {currentId, index}: Partial<IActionBuildParams>,
) => {

  const cursorBulletPoint = store.data.getNextVisibleBulletPoint(currentId, index)

  cursorMange.setNextCursor({
    editorId: cursorBulletPoint.id,
  })

  return [] as IActionLog[]
}
