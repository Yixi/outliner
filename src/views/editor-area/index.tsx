import * as React from 'react'
import OutlinerDocument from '@root/views/editor-area/outlinerDocument'
import { Data, IBulletPoint } from '@root/store/data'
import { inject } from 'mobx-react'
import './index.less'

interface IProps {
  data?: Data
}

const mockData: IBulletPoint[] = [
  {
    id: '1',
    content: 'content 1',
    children: [],
    parentId: null,
    expand: true,
  },
  {
    id: '2',
    content: 'content 2 ',
    parentId: null,
    expand: true,
    children: [
      {
        id: '2-1',
        content: 'content 2-1',
        children: [],
        parentId: '2',
        expand: true,
      },
      {
        id: '2-2',
        content: 'content 2-2',
        children: [],
        parentId: '2',
        expand: true,
      },
      {
        id: '2-3',
        content: 'content 2-3',
        children: [],
        parentId: '2',
        expand: true,
      },
    ],
  },
  {
    id: '3',
    content: 'content 3',
    children: [],
    parentId: null,
    expand: true,
  },
]

@inject('data')
export default class EditArea extends React.PureComponent<IProps> {

  componentDidMount() {
    this.props.data.setTree(mockData)
  }

  render() {
    return (
      <div className="editor-area">
        <OutlinerDocument/>
      </div>
    )
  }
}
