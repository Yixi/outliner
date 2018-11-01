import { action, observable } from 'mobx'

export class UI {
  @observable debugMode = false
  @observable showBulletPointId = false

  @action setShowBulletPoint = (isShow: boolean) => {
    this.showBulletPointId = isShow
  }

  @action initDebugConfig = (config: {debugMode?: boolean, showBulletPointId?: boolean}) => {
    this.debugMode = config.debugMode
    this.showBulletPointId = config.showBulletPointId
  }
}

export default new UI()
