import { action, observable } from 'mobx'
import { ACTION_TYPE, IActionLog } from '@root/command-action/actionLog'
import { cloneDeep } from 'lodash-es'
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
    const parentChildren = this.getChildrenById(log.data.parentId)

    Object.assign(newBulletPoint, log.data)

    parentChildren.splice(log.data.index, 0, newBulletPoint)

    this.treeHash[newBulletPoint.id] = parentChildren[log.data.index]

  }

  private processEditLog = (log: IActionLog) => {
    const bulletPoint = this.treeHash[log.data.id]
    Object.assign(bulletPoint, log.data)
  }

}

export default new Data()
