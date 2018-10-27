import * as React from 'react'
import { ContentState, Editor as DraftEditor, EditorState } from 'draft-js'
import { COMMAND, DRAFT_HANDLE_VALUE, keyBinding } from '@root/components/editor/keyBinding'

interface IProps {
  content?: string
  onCommandEvent: (command: COMMAND, editorState: EditorState) => void
}

interface IState {
  editorState: EditorState
}

export default class Editor extends React.Component<IProps, IState> {

  static defaultProps = {
    content: '',
  }

  state: IState = {
    editorState: EditorState.createWithContent(ContentState.createFromText(this.props.content)),
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
