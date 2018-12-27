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

    expect(dataStore.tree[0].id).toEqual('1')
    expect(dataStore.tree[1].id).toEqual('2')
    expect(dataStore.tree[1].children[0].id).toEqual('3')
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

  test('shoud get prev bulletPoint correct', () => {
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
          {
            id: '4',
            content: ContentState.createFromText('4'),
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

    expect(dataStore.getPrevBulletPoint('3', 0).id).toEqual('2')
    expect(dataStore.getPrevBulletPoint('4', 1).id).toEqual('3')

  })

})
