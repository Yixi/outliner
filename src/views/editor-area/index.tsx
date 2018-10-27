import * as React from 'react'
import './index.less'
import OutlinerDocument from '@root/views/editor-area/outlinerDocument'

export default class Index extends React.PureComponent {
  render() {
    return (
      <div className="editor-area">
        <OutlinerDocument/>
      </div>
    )
  }
}
