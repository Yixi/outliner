import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@root/views/App'
import { Provider } from 'mobx-react'
import store from './store'
import './styles/base.less'
import storageLocal from '@root/storage/local'

const mountNode = document.getElementById('MainApp')

if (process.env.NODE_ENV === 'development') {
  store.ui.initDebugConfig({
    debugMode: true,
  })
}

storageLocal.init()

ReactDOM.render(<Provider {...store}><App/></Provider>, mountNode)
