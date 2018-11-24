import { action, observable } from 'mobx'
import { ACTION_TYPE, IActionLog } from '@root/command-action/actionLog'
import { clone , findIndex, indexOf } from 'lodash'
import { ContentState } from 'draft-js'

export interface IBulletPoint {
  id: string,
  content: ContentState,
  parentId: string,
  expand: boolean,
  children: IBulletPoint[]
}

const BULLET_POINT_TEMP: IBulletPoint = {
  id: '',
  content: ContentState.createFromText(''),
  parentId: '',
  children: [],
  expand: true,
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
      [ACTION_TYPE.MOVE]: this.processMoveLog,
      [ACTION_TYPE.DELETE]: this.processDeleteLog,
    }

    processMap[log.type](log)

  }

  getPrevBulletPointById = (bulletPointId: string, index: number) => {
    return this.getChildrenById(this.treeHash[bulletPointId].parentId)[index - 1]
  }

  getBulletPointInfoById = (bulletPointId: string): [string, number] => {
    const currentBulletPoint = this.treeHash[bulletPointId]

    return [
      currentBulletPoint.parentId,
      indexOf(this.getChildrenById(currentBulletPoint.parentId), currentBulletPoint),
    ]

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
    const newBulletPoint = clone(BULLET_POINT_TEMP)
    const parentChildren = this.getChildrenById(log.data.parentId)

    Object.assign(newBulletPoint, log.data)

    parentChildren.splice(log.data.index, 0, newBulletPoint)

    this.treeHash[newBulletPoint.id] = parentChildren[log.data.index]

  }

  private processEditLog = (log: IActionLog) => {
    const touchedBulletPoint = this.treeHash[log.data.id]
    Object.assign(touchedBulletPoint, log.data)
  }

  private processMoveLog = (log: IActionLog) => {
    const touchedBulletPoint = this.treeHash[log.data.id]
    touchedBulletPoint.parentId = log.data.parentId

    const prevParentChildren = this.getChildrenById(log.prevData.parentId)
    prevParentChildren.splice(log.prevData.index, 1)

    const currentParentChildren = this.getChildrenById(log.data.parentId)
    currentParentChildren.splice(log.data.index, 0, touchedBulletPoint)

  }

  private processDeleteLog = (log: IActionLog) => {
    const touchedBulletPoint = this.treeHash[log.data.id]
    const parentChildren = this.getChildrenById(touchedBulletPoint.parentId)

    const index = findIndex(parentChildren, {id: log.data.id})
    parentChildren.splice(index, 1)
  }

}

export default new Data()
