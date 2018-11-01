import { action, computed, observable } from 'mobx'

export class UI {
  @observable debugMode = true
  @observable showBulletPointId = true

  @action setShowBulletPoint = (isShow: boolean) => {
    this.showBulletPointId = isShow
  }
}

export default new UI()
