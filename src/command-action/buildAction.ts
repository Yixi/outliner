import { IActionLog } from './actionLog'
import { COMMAND } from '../constant/commands'
import { EditorState } from 'draft-js'
import { actionGenerate } from '@root/command-action/commands'

export type IActionCommand = IActionLog[]

export interface IActionBuildParams {
  currentId: string,
  editorState?: EditorState,
  parentId?: string,
  index?: number,
  expand?: boolean,
  haveChildren?: boolean,
}

export const buildAction = (buildParams: { command: COMMAND } & IActionBuildParams) => {
  return actionGenerate[buildParams.command]({...buildParams})
}
