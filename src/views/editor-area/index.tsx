import * as React from 'react'
import OutlinerDocument from '@root/views/editor-area/outlinerDocument'
import { Data, IBulletPoint } from '@root/store/data'
import { inject } from 'mobx-react'
import './index.less'
import storageLocal from '@root/storage/local'

interface IProps {
  data?: Data
}

@inject('data')
export default class EditArea extends React.PureComponent<IProps> {

  componentDidMount() {

    this.props.data.setTree(storageLocal.getData())

  }

  render() {
    return (
      <div className="editor-area">
        <OutlinerDocument/>
      </div>
    )
  }
}
