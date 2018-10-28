import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'

export const generateExpandAction = (
  {currentId, expand}: {
    currentId: string,
    expand: boolean,
  },
) => {
  return [
    actionLog.generateLog(
      ACTION_TYPE.EDIT,
      {expand, id: currentId},
      {expand: !expand},
    ),
  ]

}
