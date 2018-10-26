import * as React from 'react'
import './index.less'
import Editor from '@root/views/editor-area/editor'

export default class EditorArea extends React.PureComponent {
  render() {
    return (
      <div className="editor-area">
        <Editor/>
      </div>
    )
  }
}
