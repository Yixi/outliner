import * as React from 'react'
import { ContentState, Editor as DraftEditor, EditorState } from 'draft-js'
import { DRAFT_HANDLE_VALUE, keyBinding } from '@root/components/editor/keyBinding'
import { COMMAND } from '@root/constant/commands'
import { observer } from 'mobx-react'
import cursorMange from '@root/tools/cursorManage'

interface IProps {
  content?: string
  id: string
  onCommandEvent: (command: COMMAND, editorState: EditorState) => void
}

interface IState {
  editorState: EditorState
  prevPropsContent: string  // TODO: use for trigger new content , need find a better way
}

@observer
export default class Editor extends React.Component<IProps, IState> {

  static defaultProps = {
    content: '',
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.content !== state.prevPropsContent) {
      return {
        editorState: EditorState.push(
          state.editorState,
          ContentState.createFromText(props.content),
          'apply-entity',
        ),
        prevPropsContent: props.content,
      }
    }
    return null
  }

  state: IState = {
    editorState: EditorState.createWithContent(ContentState.createFromText(this.props.content)),
    prevPropsContent: this.props.content,
  }

  onChange = (editorState: EditorState) => {
    this.setState({editorState})
  }

  handleKeyCommand = (command: COMMAND, editorState: EditorState) => {

    console.info('Handle command', command)

    if (COMMAND[command]) {
      this.props.onCommandEvent(command, editorState)
      return DRAFT_HANDLE_VALUE.HANDLED
    }

    return DRAFT_HANDLE_VALUE.NOT_HANDLE
  }

  render() {
    return (
      <div>
        <DraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={keyBinding}
        />
      </div>
    )
  }
}
