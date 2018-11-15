import { observable, action, decorate, reaction } from 'mobx'

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  /** Observables */
  dci = window.localStorage.getItem('dci') || ''
  name = window.localStorage.getItem('name') || ''

  /** Actions */
  init = () => {
    return this
  }

  setName = name => {
    this.name = name
    window.localStorage.setItem('name', name)
  }

  setDci = dci => {
    this.dci = dci
    window.localStorage.setItem('dci', dci)
  }
}

decorate(UserStore, {
  dci: observable,
  name: observable,
  init: action,
  setName: action,
  setDci: action,
})

export default UserStore
