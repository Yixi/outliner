import { SelectionState } from 'draft-js'

export interface ICursorInfo {
  editorId: string,
  selectionState?: SelectionState
  offset?: number,
}

type ICursorListener = (cursor?: ICursorInfo) => void

class CursorManage {

  private listeners: ICursorListener[] = []

  private cursor: ICursorInfo = {
    editorId: null,
    offset: 0,
    selectionState: null,
  }

  onChange(listener: ICursorListener) {
    this.listeners.push(listener)
    let isListened = true
    return () => {
      if (!isListened) { return }
      isListened = false
      this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
  }

  setNextCursor(cursor: ICursorInfo) {
    this.cursor = cursor
  }

  applyStackCursor() {
    console.info('Apply cursor', this.cursor)
    setTimeout(() => {
      this.listeners.forEach((listener) => {
        listener(this.cursor)
      })
    }, 0)
  }

  getCursor() {
    return this.cursor
  }

  resetCursor() {
    this.cursor = {editorId: null, offset: 0}
  }

}

const cursorMange = new CursorManage()
export default cursorMange
