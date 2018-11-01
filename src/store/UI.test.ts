import { UI } from '@root/store/UI'

describe('UI store', () => {
  test('should init debug config', () => {
    const uiStore = new UI()

    uiStore.initDebugConfig({debugMode: true, showBulletPointId: true})

    expect(uiStore.debugMode).toBeTruthy()
    expect(uiStore.showBulletPointId).toBeTruthy()

  })
})
