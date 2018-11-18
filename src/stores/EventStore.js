import { observable, action, decorate, computed, flow, toJS } from 'mobx'
import orderBy from 'lodash/orderBy'
import * as api from 'api'

window.toJS = toJS

class EventStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  status = 'LOADING' // LOADING, READY, ERROR
  eventSlug = window.localStorage.getItem('eventSlug') || ''
  currentEvent = { rounds: [] }

  init = () => {}

  fetchEvent = flow(function*(slug) {
    this.status = 'LOADING'
    this.currentEvent = yield api.fetchEvent(slug)
    this.status = 'READY'
  })

  reportResult = flow(function*(round, win, loss) {
    return yield api.reportResult(
      this.currentEvent.id,
      this.rootStore.userStore.user.name,
      this.rootStore.userStore.user.dci,
      round,
      win,
      loss
    )
  })

  setEventSlug = slug => {
    this.eventSlug = slug
    window.localStorage.setItem('eventSlug', slug)
  }

  get pEvent() {
    const user = this.rootStore.userStore.user
    const isUser = ({ dci, firstName, lastName }) =>
      (user.dci.length > 0 && dci === user.dci) ||
      (user.name.length > 0 &&
        `${firstName} ${lastName}`.toLowerCase().includes(user.name.toLowerCase()))
    const newEvent = { ...this.currentEvent }
    newEvent.rounds = this.currentEvent.rounds.map(round => {
      const match = round.matches.filter(match => isUser(match.person) || isUser(match.opponent))[0]
      if (!match) {
        return round
      }
      if (isUser(match.person)) {
        return { ...round, match }
      } else {
        return {
          ...round,
          match: {
            person: match.opponent,
            opponent: match.person,
            win: match.loss,
            loss: match.win,
          },
        }
      }
    })
    newEvent.rounds = orderBy(newEvent.rounds, 'number', 'desc')
    return newEvent
  }
}

decorate(EventStore, {
  status: observable,
  eventSlug: observable,
  currentEvent: observable,
  results: observable,
  init: action.bound,
  fetchEvent: action.bound,
  addResult: action.bound,
  reportResult: action.bound,
  setEventSlug: action.bound,
  pEvent: computed,
})

export default EventStore
