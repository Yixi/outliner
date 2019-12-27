import * as React from 'react'
import { useHistory } from 'react-router-dom'
import useRequest, { IPagedResource } from '@root/hooks/useRequest'
import { Icon } from 'semantic-ui-react'
import * as dayjs from 'dayjs'
import './index.less'

export interface IOutliner {
  id: number,
  title: string,
  description: string,
  createdAt: string
}

export default function OutlinerList() {
  const history = useHistory()

  const {data} = useRequest<IPagedResource<IOutliner>>({
    url: '/outliner',
    params: {
      pageSize: 100,
      pageIndex: 1,
    },
  })

  return (
    <div className="outliner-list">
      {data?.resource.map((outliner) => (
        <div
          key={outliner.id}
          className="outliner-list-item"
          onClick={() => history.push(`/${outliner.id}`)}
        >
          <Icon name="file alternate outline" size="large"/>
          <div className="outliner-list-item-title">{outliner.title}</div>
          <div>{dayjs(outliner.createdAt).format('YYYY-MM-DD')}</div>
        </div>
      ))}
    </div>
  )
}
