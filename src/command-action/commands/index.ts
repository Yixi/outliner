import { COMMAND } from '@root/constant/commands'
import { generateCreateAction } from '@root/command-action/commands/add'
import { IActionBuildParams, IActionCommand } from '@root/command-action/buildAction'
import { generateExpandAction } from '@root/command-action/commands/expand'
import { generateEditAction } from '@root/command-action/commands/edit'

export const actionGenerate: {
  [key: string]: (buildParams: IActionBuildParams) => IActionCommand,
} = {
  [COMMAND.ADD]: generateCreateAction,
  [COMMAND.EXPAND]: generateExpandAction,
  [COMMAND.EDIT]: generateEditAction,
}
