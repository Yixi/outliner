import { KEY_CODE } from '@root/constant/keyCode'
import { getDefaultKeyBinding } from 'draft-js'
import { COMMAND } from '@root/constant/commands'

export enum DRAFT_HANDLE_VALUE {
  HANDLED = 'handled',
  NOT_HANDLE = 'not-handled',

}

export const keyBinding: (event: React.KeyboardEvent) => string = (event) => {
  switch (event.keyCode) {
    case KEY_CODE.ENTER:
      return COMMAND.ADD
    case KEY_CODE.TAB:
      if (event.shiftKey) {
        return COMMAND.OUTDENT
      } else {
        return COMMAND.INDENT
      }
    case KEY_CODE.UP:
      return COMMAND.UP
    case KEY_CODE.DOWN:
      return COMMAND.DOWN
    default:
      return getDefaultKeyBinding(event)
  }
}
