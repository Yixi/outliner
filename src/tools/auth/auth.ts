const TOKEN_NAME = 'OUTLINER_AUTH_TOKEN'

const Auth = {
  KEY: TOKEN_NAME,
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_NAME, token)
    return true
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_NAME)
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_NAME)
    return true
  },
  isLoggedIn() {
    return !!Auth.getToken()
  },
}

export default Auth
