import * as React from 'react'
import { IBulletPoint } from '@root/store/data'
import { observer } from 'mobx-react'
import './index.less'
import Editor from '@root/components/editor'
import { EditorState } from 'draft-js'
import { COMMAND } from '@root/constant/commands'
import { buildAction } from '@root/command-action/buildAction'
import { actionProcess } from '@root/action-log/actionProcess'
import classNames from 'classnames'
import cursorMange from '@root/tools/cursorManage'

interface IProps {
  bulletPoint: IBulletPoint,
  index: number,
  parentId?: string
}

@observer
export default class BulletPoint extends React.Component<IProps> {

  handleContentEditorCommand = (command: COMMAND, editorState: EditorState) => {
    const {bulletPoint, index, parentId} = this.props
    actionProcess(buildAction({
      command,
      editorState,
      currentId:
      bulletPoint.id,
      parentId,
      index,
      expand: bulletPoint.expand,
      haveChildren: bulletPoint.children.length > 0,
    }))

    cursorMange.applyStackCursor()
    console.log('apply')
  }

  handleExpandCommand = () => {

    const {bulletPoint} = this.props

    actionProcess(buildAction({
      command: COMMAND.EXPAND,
      currentId: bulletPoint.id,
      expand: !bulletPoint.expand,
    }))
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

  renderAction = () => {

    const {bulletPoint} = this.props

    const cls = classNames('bullet-point-action-handle', {
      'bullet-point-action-handle-expand': bulletPoint.expand,
      'bullet-point-action-handle-collapse': !bulletPoint.expand,
    })

    return (
      <div className="bullet-point-action">
        {bulletPoint.children.length > 0 && <div className={cls} onClick={this.handleExpandCommand}/>}
        {bulletPoint.children.length === 0 && <div className="bullet-point-action-handle"/>}
      </div>
    )
  }

  render() {

    const {bulletPoint} = this.props

    return (
      <div className="bullet-point">
        {this.renderAction()}
        <div className="bullet-point-content">
          <Editor
            id={bulletPoint.id}
            content={bulletPoint.content}
            onCommandEvent={this.handleContentEditorCommand}
          />
        </div>
        <div className="bullet-point-children">
          {bulletPoint.expand && bulletPoint.children.map(this.renderChild)}
        </div>
      </div>
    )
  }
}
