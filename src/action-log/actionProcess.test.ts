import { IActionCommand } from '@root/command-action/buildAction'
import { ACTION_TYPE } from '@root/command-action/actionLog'
import { actionProcess } from '@root/action-log/actionProcess'
import data from '../store/data'

test('test action process', () => {

  data.processLog = jest.fn()

  const mockLog: IActionCommand = [
    {
      type: ACTION_TYPE.EDIT,
      data: {},
      time: 0,
    },
    {
      type: ACTION_TYPE.EDIT,
      data: {},
      time: 0,
    },
  ]

  actionProcess(mockLog)

  expect(data.processLog).toBeCalledTimes(2)

})
