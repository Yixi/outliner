import { IActionLog } from './actionLog'
import { COMMAND } from '../constant/commands'
import { EditorState } from 'draft-js'
import { actionGenerate } from '@root/command-action/commands'

export type IActionCommand = IActionLog[]

export const buildAction = (
  command: COMMAND,
  editorState: EditorState,
  currentId: string,
  parentId?: string,
  index?: number,
) => {
  return actionGenerate[command](editorState, currentId, parentId, index)
}
