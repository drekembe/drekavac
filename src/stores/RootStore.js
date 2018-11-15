import RouterStore from './RouterStore'

export default class RootStore {
  stores = []
  constructor() {
    this.stores.push((this.routerStore = new RouterStore(this)))
  }
  init() {
    this.stores.forEach(store => store.init())
    return this
  }
}
