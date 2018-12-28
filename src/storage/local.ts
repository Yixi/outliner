import store from '@root/store'
import { IBulletPoint } from '@root/store/data'

const STORE_KEY = 'Y_OUTLINER_DOCUMENT'

class StorageLocal {
  // constructor() {
  //
  // }

  store() {
    const tree = this.dataToLocal(store.data.tree)
  }

  private dataToLocal(tree: IBulletPoint[]) {

    console.log(tree)
  }

}

const storageLocal = new StorageLocal()
export default storageLocal
