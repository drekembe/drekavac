import { observable, action, decorate, reaction } from 'mobx'

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  /** Observables */
  user = {
    dci: window.localStorage.getItem('dci') || '',
    name: window.localStorage.getItem('name') || '',
  }

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
}

decorate(UserStore, {
  user: observable,
  init: action,
  setName: action,
  setDci: action,
})

export default UserStore
