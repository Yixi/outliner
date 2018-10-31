export interface ICursorInfo {
  editorId: string,
  offset?: number,
}

type ICursorListener = (cursor?: ICursorInfo) => void

class CursorManage {

  private listeners: ICursorListener[] = []

  private cursor: ICursorInfo = {
    editorId: null,
    offset: 0,
  }

  onChange(listener: ICursorListener) {
    this.listeners.push(listener)
  }

  setNextCursor(cursor: ICursorInfo) {
    this.cursor = cursor
  }

  applyStackCursor() {
    this.listeners.forEach((listener) => {
      listener(this.cursor)
    })
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