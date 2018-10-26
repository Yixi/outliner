import * as React from 'react'
import HeaderBar from '@root/views/header'
import EditorArea from '@root/views/editor-area'

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderBar/>
        <EditorArea/>
      </div>
    )
  }
}
