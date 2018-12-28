import store from '@root/store'
import { BULLET_POINT_TEMP, IBulletPoint } from '@root/store/data'
import { autorun, toJS } from 'mobx'
import { debounce } from 'lodash'
import { convertFromRaw, convertToRaw, RawDraftContentState } from 'draft-js'

const STORE_KEY = 'Y_OUTLINER_DOCUMENT'

interface IBulletPointLocal extends Pick<IBulletPoint, Exclude<keyof IBulletPoint, 'content' | 'children'>> {
  content: RawDraftContentState
  children: IBulletPointLocal[]
}


class StorageLocal {

  init() {
    console.info('start local storage')

    this.initWatchTree()

  }

  store(tree: IBulletPoint[]) {
    console.info('[info] Store Tree Data To Local')
    const treeWithRawContent = this.treeContentToRaw(tree)
    localStorage.setItem(STORE_KEY, JSON.stringify(treeWithRawContent))
  }

  getData(): IBulletPoint[] {

    const treeWithRawContent = JSON.parse(localStorage.getItem(STORE_KEY)) as IBulletPointLocal[]

    console.log(treeWithRawContent)

    if (treeWithRawContent) {
      return this.treeRawToContent(treeWithRawContent)
    } else {
      return [{
        ...BULLET_POINT_TEMP,
        id: '1',
      }]
    }

  }

  private initWatchTree() {

    const debounceTreeChange = debounce((tree: IBulletPoint[]) => {
      this.store(tree)
    }, 3 * 1000)

    autorun(() => {
      debounceTreeChange(toJS(store.data.tree))
    })
  }

  private treeContentToRaw(tree: IBulletPoint[]): IBulletPointLocal[] {
    return tree.map((bulletPoint) => {
      return {
        ...bulletPoint,
        content: convertToRaw(bulletPoint.content),
        children: this.treeContentToRaw(bulletPoint.children),
      }
    })
  }

  private treeRawToContent(tree: IBulletPointLocal[]): IBulletPoint[] {
    return tree.map((bulletPoint) => {
      return {
        ...bulletPoint,
        content: convertFromRaw(bulletPoint.content),
        children: this.treeRawToContent(bulletPoint.children),
      }
    })
  }

}

const storageLocal = new StorageLocal()
export default storageLocal
