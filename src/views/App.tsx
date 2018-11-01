import * as React from 'react'
import HeaderBar from '@root/views/header'
import EditArea from '@root/views/editor-area/index'
import DebugBar from '@root/views/DebugBar'

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderBar/>
        <EditArea/>
        <DebugBar/>
      </div>
    )
  }
}
