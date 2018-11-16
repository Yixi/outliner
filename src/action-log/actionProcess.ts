import { IActionCommand } from '@root/command-action/buildAction'
import data from '../store/data'

export const actionProcess = (actionLog: IActionCommand) => {
  console.info(actionLog)
  actionLog.forEach(data.processLog)
}
