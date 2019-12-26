import * as React from 'react'
import { useState } from 'react'
import { Button, Grid, Header, Segment, Form } from 'semantic-ui-react'
import { httpRequest } from '@root/hooks/useRequest'
import Auth from '@root/tools/auth/auth'

const signinFlow = async (usernameOrEmail: string, password: string) => {
  const {data} = await httpRequest.post<{ accessToken: string }>('/auth/signin', {
    usernameOrEmail, password,
  })
  Auth.setToken(data.accessToken)
  window.location.reload()
}

export default function Login() {

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
      <Grid.Column style={{maxWidth: 450}}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form
          size="large"
          onSubmit={() => signinFlow(usernameOrEmail, password)}
        >
          <Segment stacked>
            <Form.Input
              fluid icon="user"
              iconPosition="left"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(event) => {
                setUsernameOrEmail(event.target.value)
              }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}
