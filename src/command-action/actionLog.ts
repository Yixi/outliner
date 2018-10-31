import * as dayjs from 'dayjs'
import { ContentState } from 'draft-js'

export enum ACTION_TYPE {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

interface IActionDataMeta {
  id?: string,
  parentId?: string,
  index?: number,
  content?: ContentState,
  expand?: boolean
}

export interface IActionLog {
  type: ACTION_TYPE,
  data: IActionDataMeta,
  prevData?: IActionDataMeta,
  time: number
}

class Log {

  private static generateCreateLog(currentData: IActionDataMeta): IActionLog {
    return {
      type: ACTION_TYPE.CREATE,
      data: currentData,
      time: dayjs().unix(),
    }

  }

  private static generateEditLog(currentData: IActionDataMeta, prvData: IActionDataMeta): IActionLog {
    return {
      type: ACTION_TYPE.EDIT,
      data: currentData,
      prevData: prvData,
      time: dayjs().unix(),
    }
  }

  generateLog(
    type: ACTION_TYPE,
    currentData: IActionDataMeta,
    prevData?: IActionDataMeta,
  ): IActionLog {
    const logCommand: { [key: string]: (currentData: IActionDataMeta, prevData?: IActionDataMeta) => IActionLog} = {
      [ACTION_TYPE.CREATE]: Log.generateCreateLog,
      [ACTION_TYPE.EDIT]: Log.generateEditLog,
    }

    if (logCommand[type]) {
      return logCommand[type](currentData, prevData)
    }
  }

}

export const actionLog = new Log()
