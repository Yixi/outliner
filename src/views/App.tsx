import * as React from 'react'
import HeaderBar from '@root/views/header'
import EditArea from '@root/views/editor-area/index'
import DebugBar from '@root/views/DebugBar'
import { HashRouter, Switch } from 'react-router-dom'
import ProtectedRouter from '@root/tools/auth/ProtectedRouter'

export default class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Switch>
          <ProtectedRouter path="/">
            <HeaderBar/>
            <EditArea/>
            <DebugBar/>
          </ProtectedRouter>
        </Switch>
      </HashRouter>
    )
  }
}
