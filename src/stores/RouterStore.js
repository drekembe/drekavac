import { observable, action, decorate } from 'mobx'

class RouterStore {
  location = {}
  history = {}

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  init = () => {
    return this
  }

  setRoute = (location, history) => {
    this.location = location
    this.history = history
    window.scrollTo(0, 0)
  }
}

decorate(RouterStore, {
  location: observable,
  history: observable,

  setRoute: action,
  init: action,
})

export default RouterStore
