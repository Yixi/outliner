import { generateDownAction } from '@root/command-action/commands/down'
import store from '@root/store'

describe('test down command', () => {
  test('test down command generate a empty action', () => {
    store.data.getNextVisibleBulletPoint = jest.fn()
    const nextFn = store.data.getNextVisibleBulletPoint as any

    nextFn.mockReturnValue({id: '2'})

    const action = generateDownAction({currentId: '1', index: 0})
    expect(action).toEqual([])
  })
})
