import { IActionBuildParams } from '@root/command-action/buildAction'
import { IActionLog } from '@root/command-action/actionLog'

export const generateUpAction = (
  {currentId}: Partial<IActionBuildParams>,
) => {

  console.log(currentId)

  return [] as IActionLog[]
}
