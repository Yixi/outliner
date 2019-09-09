import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import { IActionBuildParams } from '@root/command-action/buildAction'

export const generateExpandAction = (
  {currentId, expand}: Partial<IActionBuildParams>
) => {
  return [
    actionLog.generateLog(
      ACTION_TYPE.EDIT,
      {expand, id: currentId},
      {expand: !expand}
    ),
  ]

}
