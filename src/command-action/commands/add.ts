import { EditorState } from 'draft-js'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import uuid = require('uuid')

export const generateCreateAction = (
  {
    editorState, currentId, parentId, index, expand, haveChildren,
  }: {
    editorState?: EditorState,
    currentId: string,
    parentId: string,
    index: number,
    expand: boolean,
    haveChildren: boolean,
  }) => {

  const startOffset = editorState.getSelection().getStartOffset()
  const content = editorState.getCurrentContent().getPlainText()
  const leftContent = content.substr(0, startOffset)
  const rightContent = content.substr(startOffset, content.length)

  const newId = uuid()

  const isCase1 = haveChildren && rightContent.length === 0 && expand
  const isCase2 = rightContent.length === 0 && (!haveChildren || (haveChildren && !expand))

  if (isCase1) {
    console.log('case 1')
    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId: currentId, index: 0}),
    ]

  } else if (isCase2) {
    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId, index: index + 1}),
    ]
  } else {

    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId, index}),
      actionLog.generateLog(ACTION_TYPE.EDIT, {id: newId, content: leftContent}, {content: ''}),
      actionLog.generateLog(ACTION_TYPE.EDIT, {id: currentId, content: rightContent}, {content}),
    ]
  }

}
