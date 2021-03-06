import { ContentState } from 'draft-js'
import { ACTION_TYPE, actionLog } from '@root/command-action/actionLog'
import cursorMange from '@root/tools/cursorManage'
import { IActionBuildParams } from '@root/command-action/buildAction'
import * as uuid from 'uuid'
import { splitContentState } from '@root/tools/splitContentState'

export const generateCreateAction = (
  {
    editorState, currentId, parentId, index, expand, haveChildren,
  }: Partial<IActionBuildParams>) => {

  const currentContentState = editorState.getCurrentContent()

  const [leftContentState, rightContentState] = splitContentState(editorState)

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
