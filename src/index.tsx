import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@root/views/App'
import { Provider } from 'mobx-react'
import store from './store'
import './styles/base.less'

const mountNode = document.getElementById('MainApp')

ReactDOM.render(<Provider {...store}><App/></Provider>, mountNode)
