import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@root/views/App'
import './styles/base.less'

const mountNode = document.getElementById('MainApp')

ReactDOM.render(<App />, mountNode)
