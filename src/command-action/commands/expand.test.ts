import { generateExpandAction } from '@root/command-action/commands/expand'

test('test expand command', ()=> {
  const action = generateExpandAction({
    currentId: '1',
    expand: true,
  })

  expect(action).toHaveLength(1)
  expect(action[0].type).toEqual('EDIT')
  expect(action[0].data).toEqual({expand: true, id: '1'})
  expect(action[0].prevData).toEqual({expand: false})
})
