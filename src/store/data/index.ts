import { observable } from 'mobx'

export interface IBulletPoint {
  id: string,
  content: string,
  children: IBulletPoint[]
}

const mockData: IBulletPoint[] = [
  {
    id: '1',
    content: 'content 1',
    children: [],
  },
  {
    id: '2',
    content: 'content 2 ',
    children: [
      {
        id: '2-1',
        content: 'content 2-1',
        children: [],
      },
      {
        id: '2-2',
        content: 'content 2-2',
        children: [],
      },
      {
        id: '2-3',
        content: 'content 2-3',
        children: [],
      },
    ],
  },
  {
    id: '3',
    content: 'content 3',
    children: [],
  },
]

export class Data {
  @observable tree: IBulletPoint[] = mockData
}

export default new Data()
