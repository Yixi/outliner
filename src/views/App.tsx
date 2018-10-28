import * as React from 'react'
import HeaderBar from '@root/views/header'
import EditArea from '@root/views/editor-area/index'

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderBar/>
        <EditArea/>
      </div>
    )
  }
}
