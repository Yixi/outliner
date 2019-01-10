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

    expect(dataStore.getPrevVisibleBulletPoint('1', 0).id).toEqual('1')
    expect(dataStore.getPrevVisibleBulletPoint('3', 0).id).toEqual('2')
    expect(dataStore.getPrevVisibleBulletPoint('4', 1).id).toEqual('3')

  })

  test('should get next bulletPoint correct', () => {
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
        expand: false,
      },
      {
        id: '5',
        content: ContentState.createFromText('5'),
        parentId: null,
        children: [
          {
            id: '6',
            content: ContentState.createFromText('6'),
            parentId: '5',
            children: [],
            expand: true,
          },
          {
            id: '7',
            content: ContentState.createFromText('7'),
            parentId: '5',
            children: [],
            expand: true,
          },
        ],
        expand: true,
      },
      {
        id: '8',
        content: ContentState.createFromText('8'),
        parentId: null,
        children: [
          {
            id: '9',
            content: ContentState.createFromText('9'),
            parentId: '8',
            children: [
              {
                id: '10',
                content: ContentState.createFromText('10'),
                parentId: '9',
                children: [],
                expand: true,
              },
            ],
            expand: true,
          },
        ],
        expand: true,
      },
      {
        id: '11',
        content: ContentState.createFromText('11'),
        parentId: null,
        children: [],
        expand: true,
      },
    ]

    const dataStore =  new Data()
    dataStore.setTree(treeData)

    expect(dataStore.getNextVisibleBulletPoint('1', 0).id).toEqual('2')
    expect(dataStore.getNextVisibleBulletPoint('2', 1).id).toEqual('5')
    expect(dataStore.getNextVisibleBulletPoint('5', 2).id).toEqual('6')
    expect(dataStore.getNextVisibleBulletPoint('7', 1).id).toEqual('8')
    expect(dataStore.getNextVisibleBulletPoint('10', 0).id).toEqual('11')
    expect(dataStore.getNextVisibleBulletPoint('11', 4).id).toEqual('11')

  })

})
