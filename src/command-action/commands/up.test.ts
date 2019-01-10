import { generateUpAction } from '@root/command-action/commands/up'
import store from '@root/store'

describe('test up command', () => {
  test('test up command generate a empty action', () => {

    store.data.getPrevVisibleBulletPoint = jest.fn()
    const prevFn = store.data.getPrevVisibleBulletPoint as any

    prevFn.mockReturnValue({id: '0'})

    const action = generateUpAction({currentId: '1', index: 0})

    expect(action).toEqual([])
  })
})
