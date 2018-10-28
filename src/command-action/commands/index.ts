import { COMMAND } from '@root/constant/commands'
import { generateCreateAction } from '@root/command-action/commands/add'
import { IActionCommand } from '@root/command-action/buildAction'
import { EditorState } from 'draft-js'

export const actionGenerate: {
  [key: string]: (editorState: EditorState, currentId: string, parentId: string, index: number) => IActionCommand,
} = {
  [COMMAND.ADD]: generateCreateAction,
}
