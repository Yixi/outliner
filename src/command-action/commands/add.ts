import { EditorState } from 'draft-js'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import uuid = require('uuid')

export const generateCreateAction = (
  {
    editorState, currentId, parentId, index,
  }: {
    editorState?: EditorState,
    currentId: string,
    parentId?: string,
    index?: number,
  }) => {

  const startOffset = editorState.getSelection().getStartOffset()
  const content = editorState.getCurrentContent().getPlainText()
  const leftContent = content.substr(0, startOffset)
  const rightContent = content.substr(startOffset, content.length)

  const newId = uuid()

  return [
    actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId, index}),
    actionLog.generateLog(ACTION_TYPE.EDIT, {id: newId, content: leftContent}, {content: ''}),
    actionLog.generateLog(ACTION_TYPE.EDIT, {id: currentId, content: rightContent}, {content}),
  ]

}
