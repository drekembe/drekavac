import { observable, action, decorate } from 'mobx'

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  static colorSchemes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'aqua', label: 'Aqua' },
  ]

  /** Observables */
  user = {
    dci: window.localStorage.getItem('dci') || '',
    name: window.localStorage.getItem('name') || '',
  }

  colorScheme = window.localStorage.getItem('colorScheme') || 'dark'

  /** Actions */
  init = () => {
    return this
  }

  setName = name => {
    this.user.name = name
    window.localStorage.setItem('name', name)
  }

  setDci = dci => {
    this.user.dci = dci
    window.localStorage.setItem('dci', dci)
  }

  setColorScheme = colorScheme => {
    this.colorScheme = colorScheme
    window.localStorage.setItem('colorScheme', colorScheme)
  }
}

decorate(UserStore, {
  user: observable,
  colorScheme: observable,
  init: action,
  setName: action,
  setDci: action,
})

export default UserStore
