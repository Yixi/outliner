import { Data, IBulletPoint } from '@root/store/data/index'
import { ContentState } from 'draft-js'
import { ACTION_TYPE } from '@root/command-action/actionLog'

describe('Data store test', () => {

  test('should init tree correct', () => {
    const treeData: IBulletPoint[] = [
      {
        id: '1',
        content: ContentState.createFromText('1'),
        parentId:null,
        children: [],
        expand: true,
      },
      {
        id: '2',
        content: ContentState.createFromText('2'),
        parentId: null,
        children: [
          {
            id: '3',
            content: ContentState.createFromText('3'),
            parentId: '2',
            children: [],
            expand: true,
          },
        ],
        expand: true,
      },
    ]

    const dataStore = new Data()

    dataStore.setTree(treeData)

    expect(dataStore.tree).toEqual(treeData)
  })

  test('should porcess create log', () => {
    const treeData: IBulletPoint[] = [
      {
        id: '1',
        content: ContentState.createFromText('1'),
        parentId:null,
        children: [],
        expand: true,
      },
      {
        id: '2',
        content: ContentState.createFromText('2'),
        parentId: null,
        children: [
          {
            id: '3',
            content: ContentState.createFromText('3'),
            parentId: '2',
            children: [],
            expand: true,
          },
        ],
        expand: true,
      },
    ]

    const dataStore = new Data()
    dataStore.setTree(treeData)

    dataStore.processLog({
      type: ACTION_TYPE.CREATE,
      data: {
        id: 'new id',
        parentId: null,
        index: 2,
      },
      time: 0,
    })

    expect(dataStore.tree[2].id).toEqual('new id')

  })

})
