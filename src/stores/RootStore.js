import RouterStore from './RouterStore'
import EventStore from './EventStore'
import UserStore from './UserStore'

export default class RootStore {
  stores = []
  constructor() {
    this.stores.push((this.routerStore = new RouterStore(this)))
    this.stores.push((this.userStore = new UserStore(this)))
    this.stores.push((this.eventStore = new EventStore(this)))
  }
  init() {
    this.stores.forEach(store => store.init())
    return this
  }
}
