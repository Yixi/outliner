import { COMMAND } from '@root/constant/commands'
import { generateCreateAction } from '@root/command-action/commands/add'
import { IActionBuildParams, IActionCommand } from '@root/command-action/buildAction'
import { generateExpandAction } from '@root/command-action/commands/expand'
import { generateEditAction } from '@root/command-action/commands/edit'
import { generateIndentAction } from '@root/command-action/commands/indent'
import { generateOutdentAction } from '@root/command-action/commands/outdent'
import { generateBackspaceAction } from '@root/command-action/commands/backspace'

export const actionGenerate: {
  [key: string]: (buildParams: IActionBuildParams) => IActionCommand,
} = {
  [COMMAND.ADD]: generateCreateAction,
  [COMMAND.EXPAND]: generateExpandAction,
  [COMMAND.EDIT]: generateEditAction,
  [COMMAND.INDENT]: generateIndentAction,
  [COMMAND.OUTDENT]: generateOutdentAction,
  [COMMAND.BACKSPACE]: generateBackspaceAction,
}
