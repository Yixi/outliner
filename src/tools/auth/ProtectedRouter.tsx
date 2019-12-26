import { Route, RouteProps } from 'react-router-dom'
import * as React from 'react'
import Auth from '@root/tools/auth/auth'
import Login from '@root/views/Login'
import { FunctionComponent, useEffect, useState } from 'react'
import useRequest from '@root/hooks/useRequest'
import { Loader } from 'semantic-ui-react'

const AuthLoading: FunctionComponent<{}> = (props) => {
  const [isAuthOk, setIsAuthOk] = useState(false)

  const {response} = useRequest({
    url: '/auth/auth',
  }, {
    shouldRetryOnError: false,
  })

  useEffect(() => {
    if (response?.status === 200) {
      setIsAuthOk(true)
    }

  }, [response?.status])

  return isAuthOk ? <>{props.children}</> : (
    <div style={{paddingTop: '100px'}}>
      <Loader active inline="centered"/>
    </div>
  )
}

export default function ProtectedRouter({children, ...rest}: RouteProps) {
  return (
    <Route
      {...rest}
      render={() => Auth.isLoggedIn() ? <AuthLoading>{children}</AuthLoading> : <Login/>}
    />
  )
}
