import { observable, action, decorate } from 'mobx'

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  static themes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'aqua', label: 'Aqua' },
  ]

  /** Observables */
  user = {
    dci: window.localStorage.getItem('dci') || '',
    name: window.localStorage.getItem('name') || '',
  }

  theme = window.localStorage.getItem('theme') || 'dark'

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

  setTheme = theme => {
    this.theme = theme
    window.localStorage.setItem('theme', theme)
  }
}

decorate(UserStore, {
  user: observable,
  theme: observable,
  init: action,
  setName: action,
  setDci: action,
  setTheme: action,
})

export default UserStore
