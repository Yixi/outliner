import { action, observable } from 'mobx'
import { ACTION_TYPE, IActionLog } from '@root/command-action/actionLog'
import { cloneDeep, merge } from 'lodash-es'

export interface IBulletPoint {
  id: string,
  content: string,
  parentId: string,
  children: IBulletPoint[]
}

const BULLET_POINT_TEMP: IBulletPoint = {
  id: '',
  content: '',
  parentId: '',
  children: [],
}

export class Data {

  @observable tree: IBulletPoint[] = []

  private treeHash: { [id: string]: IBulletPoint } = {}

  @action setTree = (tree: IBulletPoint[]) => {
    this.tree = tree
    this.buildHash(this.tree)
  }

  @action processLog = (log: IActionLog) => {
    const processMap: { [key: string]: (log: IActionLog) => void } = {
      [ACTION_TYPE.CREATE]: this.processCreateLog,
      [ACTION_TYPE.EDIT]: this.processEditLog,
    }

    processMap[log.type](log)

  }

  private buildHash = (tree: IBulletPoint[]) => {
    tree.forEach((bulletPoint) => {

      this.treeHash[bulletPoint.id] = bulletPoint

      if (bulletPoint.children.length > 0) {
        this.buildHash(bulletPoint.children)
      }
    })
  }

  private getChildrenById = (bulletPointId: string) => {
    if (bulletPointId) {
      return this.treeHash[bulletPointId].children
    }
    return this.tree
  }

  private processCreateLog = (log: IActionLog) => {
    const newBulletPoint = cloneDeep(BULLET_POINT_TEMP)
    const parentChilren = this.getChildrenById(log.data.parentId)

    merge(newBulletPoint, log.data)

    console.log(newBulletPoint)

  }

  private processEditLog = (log: IActionLog) => {

  }

}

export default new Data()
