import * as React from 'react'
import HeaderBar from '@root/views/header'
import Index from '@root/views/editor-area/index'

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderBar/>
        <Index/>
      </div>
    )
  }
}
