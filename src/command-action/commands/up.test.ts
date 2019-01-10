import { generateUpAction } from '@root/command-action/commands/up'

describe('test up command', () => {
  test('test up command generate a empty action', () => {
    const action = generateUpAction({currentId: '1'})

    expect(action).toEqual([])
  })
})
