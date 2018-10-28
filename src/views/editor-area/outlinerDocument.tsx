import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Data } from '@root/store/data'
import BulletPoint from '@root/views/editor-area/bullet-point'

interface IProps {
  data?: Data
}

@inject('data')
@observer
export default class OutlinerDocument extends React.Component<IProps> {

  render() {
    return (
      <div>
        {this.props.data.tree.map(
          (bulletPoint, index) => <BulletPoint key={bulletPoint.id} bulletPoint={bulletPoint} index={index}/>,
        )}
      </div>
    )
  }
}
