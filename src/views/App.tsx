import * as React from 'react'
import HeaderBar from '@root/views/header'
import EditArea from '@root/views/editor-area/index'
import DebugBar from '@root/views/DebugBar'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ProtectedRouter from '@root/tools/auth/ProtectedRouter'
import OutlinerList from '@root/views/OutlinerList'

export default class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Switch>
          <ProtectedRouter path="/:outlinerId">
            <HeaderBar/>
            <EditArea/>
            <DebugBar/>
          </ProtectedRouter>
          <ProtectedRouter path="/" exact>
            <OutlinerList/>
          </ProtectedRouter>
        </Switch>
      </HashRouter>
    )
  }
}
