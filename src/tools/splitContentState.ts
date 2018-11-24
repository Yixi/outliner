import { ContentState, EditorState, Modifier } from 'draft-js'
import { indexOf } from 'lodash'

export const splitContentState = (editorState: EditorState) => {
  const currentContentState = editorState.getCurrentContent()
  const splitContent = Modifier.splitBlock(currentContentState, editorState.getSelection())
  const blockArray = splitContent.getBlocksAsArray()
  const selectBlockStartIndex = indexOf(
    blockArray, splitContent.getBlockForKey(splitContent.getSelectionBefore().getStartKey()))
  const leftContentState = ContentState.createFromBlockArray(blockArray.slice(0, selectBlockStartIndex + 1))
  const rightContentState = ContentState.createFromBlockArray(blockArray.slice(selectBlockStartIndex + 1))

  return [leftContentState, rightContentState]
}
