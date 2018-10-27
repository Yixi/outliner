import { KEY_CODE } from '@root/constant/keyCode'
import { getDefaultKeyBinding } from 'draft-js'

export enum COMMAND {
  ADD = 'ADD',
}

export enum DRAFT_HANDLE_VALUE {
  HANDLED = 'handled',
  NOT_HANDLE = 'not-handled',

}

export const keyBinding: (event: React.KeyboardEvent) => string = (event) => {
  if (event.keyCode === KEY_CODE.ENTER) {
    return COMMAND.ADD
  }

  return getDefaultKeyBinding(event)
}
