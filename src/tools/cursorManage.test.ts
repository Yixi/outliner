import cursorMange from '@root/tools/cursorManage'

jest.useFakeTimers()
describe('test cursor manager', () => {
  test('should set next cursor correct', () => {
    const mockCursorInfo = {
      editorId: '1',
    }

    cursorMange.setNextCursor(mockCursorInfo)

    expect(cursorMange.getCursor()).toEqual(mockCursorInfo)

  })

  test('should listen cursor change correct', () => {
    const mockFn = jest.fn()
    const mockCursorInfo = {
      editorId: '1',
    }

    cursorMange.onChange(mockFn)

    cursorMange.setNextCursor(mockCursorInfo)
    cursorMange.applyStackCursor()

    jest.advanceTimersByTime(100)

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledWith(mockCursorInfo)

  })
})
