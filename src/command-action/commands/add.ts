import { ContentState, Modifier } from 'draft-js'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import cursorMange from '@root/tools/cursorManage'
import { indexOf } from 'lodash-es'
import { IActionBuildParams } from '@root/command-action/buildAction'
import uuid = require('uuid')

export const generateCreateAction = (
  {
    editorState, currentId, parentId, index, expand, haveChildren,
  }: Partial<IActionBuildParams>) => {

  const currentContentState = editorState.getCurrentContent()
  const splitContent = Modifier.splitBlock(currentContentState, editorState.getSelection())
  const blockArray = splitContent.getBlocksAsArray()
  const selectBlockStartIndex = indexOf(
    blockArray, splitContent.getBlockForKey(splitContent.getSelectionBefore().getStartKey()))
  const leftContentState = ContentState.createFromBlockArray(blockArray.slice(0, selectBlockStartIndex + 1))
  const rightContentState = ContentState.createFromBlockArray(blockArray.slice(selectBlockStartIndex + 1))
  const newId = uuid()

  const isCase1 = haveChildren && rightContentState.getPlainText().length === 0 && expand
  const isCase2 = rightContentState.getPlainText().length === 0 && (!haveChildren || (haveChildren && !expand))

  if (isCase1) {
    cursorMange.setNextCursor({editorId: newId})
    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId: currentId, index: 0}),
    ]

  } else if (isCase2) {
    cursorMange.setNextCursor({editorId: newId})
    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId, index: index + 1}),
      actionLog.generateLog(ACTION_TYPE.EDIT,  {id: currentId, content: leftContentState}),
    ]
  } else {

    return [
      actionLog.generateLog(ACTION_TYPE.CREATE, {id: newId, parentId, index}),
      actionLog.generateLog(ACTION_TYPE.EDIT,
        {id: newId, content: leftContentState},
        {content: ContentState.createFromText('')}),
      actionLog.generateLog(ACTION_TYPE.EDIT,
        {id: currentId, content: rightContentState},
        {content: currentContentState}),
    ]
  }

}
