import * as React from 'react'
import { IBulletPoint } from '@root/store/data'
import { observer } from 'mobx-react'

import './index.less'

interface IProps {
  bulletPoint: IBulletPoint
}

@observer
export default class BulletPoint extends React.Component<IProps> {
  render() {
    return (
      <div className="bullet-point">
        <div className="bullet-point-action">
          <div className="bullet-point-action-handle"/>
        </div>
        <div className="bullet-point-content">{this.props.bulletPoint.content}</div>
        <div className="bullet-point-children">
          {this.props.bulletPoint.children.map(
            (bulletPoint) => <BulletPoint bulletPoint={bulletPoint} key={bulletPoint.id}/>,
          )}
        </div>
      </div>
    )
  }
}
