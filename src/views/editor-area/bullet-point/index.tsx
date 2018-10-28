import * as React from 'react'
import { IBulletPoint } from '@root/store/data'
import { observer } from 'mobx-react'

import './index.less'
import Editor from '@root/components/editor'
import { EditorState } from 'draft-js'
import { COMMAND } from '@root/constant/commands'
import { buildAction } from '@root/command-action/buildAction'
import { actionProcess } from '@root/action-log/actionProcess'

interface IProps {
  bulletPoint: IBulletPoint,
  index: number,
  parentId?: string
}

@observer
export default class BulletPoint extends React.Component<IProps> {

  handleContentEditorCommand = (command: COMMAND, editorState: EditorState) => {
    const {bulletPoint, index, parentId} = this.props
    actionProcess(buildAction(command, editorState, bulletPoint.id, parentId, index))
  }

  renderChild = (bulletPoint: IBulletPoint, index: number) => {
    return (
      <BulletPoint
        bulletPoint={bulletPoint}
        key={bulletPoint.id}
        index={index}
        parentId={this.props.bulletPoint.id}
      />
    )
  }

  render() {
    console.log('render', this.props.bulletPoint)
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
          {this.props.bulletPoint.children.map(this.renderChild)}
        </div>
      </div>
    )
  }
}
