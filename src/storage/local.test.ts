import store from '@root/store'
import { IBulletPoint } from '@root/store/data'
import { ContentState } from 'draft-js'
import storageLocal from '@root/storage/local'

describe('test storage for local', () => {
  test('test store data and get', () => {
    const mockData: IBulletPoint[] = [
      {
        id: '10',
        content: ContentState.createFromText('123'),
        parentId: null,
        children: [],
        expand: true,
      },
    ]

    storageLocal.init()

    store.data.setTree(mockData)

    storageLocal.store(mockData)

    const tree = storageLocal.getData()

    expect(tree).toHaveLength(1)
    expect(tree[0].id).toEqual('10')
    expect(tree[0].content.getPlainText()).toEqual('123')

  })
})
