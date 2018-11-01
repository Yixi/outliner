import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { UI } from '@root/store/UI'
import './DebugBar.less'

interface IProps {
  ui?: UI
}

@inject('ui')
@observer
export default class DebugBar extends React.Component<IProps> {

  setBulletPointId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ui.setShowBulletPoint(event.target.checked)
  }

  render() {

    if (!this.props.ui.debugMode) { return null }
    return (
      <div className="debug-bar">
        <label>
          <input
            type="checkbox"
            checked={this.props.ui.showBulletPointId}
            onChange={this.setBulletPointId}
          />
          show bullet point id
        </label>
      </div>
    )
  }
}
