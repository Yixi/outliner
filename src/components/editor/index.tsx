import * as React from 'react'
import { ContentState, Editor as DraftEditor, EditorState, SelectionState } from 'draft-js'
import { DRAFT_HANDLE_VALUE, keyBinding } from '@root/components/editor/keyBinding'
import { COMMAND, DRAFT_JS_COMMAND } from '@root/constant/commands'
import { observer } from 'mobx-react'
import cursorMange, { ICursorInfo } from '@root/tools/cursorManage'
import { debounce } from 'lodash'
import { EDITOR_SYNC_TIME } from '@root/constant/editor'
import { splitContentState } from '@root/tools/splitContentState'

interface IProps {
  contentState?: ContentState
  id: string
  onCommandEvent: (command: COMMAND, editorState: EditorState) => void
}

interface IState {
  editorState: EditorState
  prevPropsContentContentState: ContentState  // TODO: use for trigger new content , need find a better way
}

@observer
export default class Editor extends React.Component<IProps, IState> {
  static defaultProps = {
    contentState: ContentState.createFromText(''),
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.contentState !== state.prevPropsContentContentState) {
      return {
        editorState: EditorState.push(state.editorState, props.contentState, 'change-block-data'),
        prevPropsContentContentState: props.contentState,
      }
    }
    return null
  }

  editorContentRef: DraftEditor
  destroyCursorListener: () => void

  state: IState = {
    editorState: EditorState.createWithContent(this.props.contentState),
    prevPropsContentContentState: this.props.contentState,
  }

  debounceContentChange = debounce((editorState: EditorState) => {
    this.syncContent(editorState)
  }, EDITOR_SYNC_TIME)

  componentDidMount() {
    this.destroyCursorListener = cursorMange.onChange(this.setCursor)
    // init cursor if component mount
    this.setCursor(cursorMange.getCursor())
  }

  componentWillUnmount() {
    this.forceSyncContent()
    this.destroyCursorListener()
  }

  setCursor = (cursor: ICursorInfo) => {
    if (cursor.editorId === this.props.id) {
      this.editorContentRef.focus()
      // TODO: need fina a right way to set the cursor
      if (cursor.selectionState) {
        this.setState({
          editorState: EditorState.forceSelection(this.state.editorState, cursor.selectionState),
        })
      } else if (cursor.offset) {
        this.setState({
          editorState: EditorState.forceSelection(
            this.state.editorState,
            this.state.editorState.getSelection().merge({
              anchorOffset: cursor.offset,
              focusOffset: cursor.offset,
            }) as SelectionState
          ),
        })
      }
      cursorMange.resetCursor()
    }
  }

  onChange = (editorState: EditorState) => {
    this.setState({editorState}, () => {
      this.debounceContentChange(editorState)
    })
  }

  syncContent = (editorState: EditorState) => {
    if (this.state.prevPropsContentContentState !== editorState.getCurrentContent()) {
      this.props.onCommandEvent(COMMAND.EDIT, this.state.editorState)
    }
  }

  forceSyncContent = () => {
    this.debounceContentChange.cancel()
    this.syncContent(this.state.editorState)
  }

  setEditorRef = (editor: DraftEditor) => {
    this.editorContentRef = editor
  }

  handleKeyCommand = (command: COMMAND, editorState: EditorState) => {

    console.info('Handle command', command)

    if ([COMMAND.OUTDENT, COMMAND.INDENT].includes(command)) {
      this.forceSyncContent()
    }

    if (command.toString() === DRAFT_JS_COMMAND.BACKSPACE) {
      const [leftContentState] = splitContentState(editorState)
      if (leftContentState.getPlainText().length === 0) {
        command = COMMAND.BACKSPACE
      }
    }

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
          tabIndex={-1}
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={keyBinding}
          ref={this.setEditorRef}
        />
      </div>
    )
  }
}
