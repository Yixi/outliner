interface IGlobalConfig {
  api: string
}

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    CONFIG: IGlobalConfig
  }
}

export default function getConfig() {
  return window.CONFIG || {}
}
