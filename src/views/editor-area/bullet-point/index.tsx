import * as React from 'react'
import { IBulletPoint } from '@root/store/data'
import { observer } from 'mobx-react'

import './index.less'
import Editor from '@root/components/editor'
import { COMMAND } from '@root/components/editor/keyBinding'
import { EditorState } from 'draft-js'

interface IProps {
  bulletPoint: IBulletPoint
}

@observer
export default class BulletPoint extends React.Component<IProps> {

  handleContentEditorCommand = (command: COMMAND, editorState: EditorState) => {
    console.log(command, editorState)
  }

  render() {
    return (
      <div className="bullet-point">
        <div className="bullet-point-action">
          <div className="bullet-point-action-handle"/>
        </div>
        <div className="bullet-point-content">
          <Editor
            content={this.props.bulletPoint.content}
            onCommandEvent={this.handleContentEditorCommand}
          />
        </div>
        <div className="bullet-point-children">
          {this.props.bulletPoint.children.map(
            (bulletPoint) => <BulletPoint bulletPoint={bulletPoint} key={bulletPoint.id}/>,
          )}
        </div>
      </div>
    )
  }
}
