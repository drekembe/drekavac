import { observable, action, decorate, reaction, computed, flow, toJS } from 'mobx'
import orderBy from 'lodash/orderBy'
import * as api from 'api'

window.toJS = toJS

class EventStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  status = 'LOADING' // LOADING, READY, ERROR
  currentEvent = { rounds: [] }
  results = JSON.parse(window.localStorage.getItem('results')) || {}

  init = () => {}

  addResult = (id, round, win, lose, draw) => {
    const key = `${id}/${round}`
    this.results[key] = {
      win,
      lose,
      draw,
    }
    window.localStorage.setItem('results', JSON.stringify(toJS(this.results)))
    // TODO: upload result to server
  }

  fetchEvent = flow(function*(slug) {
    this.status = 'LOADING'
    this.currentEvent = yield api.fetchEvent(slug)
    this.currentEvent.rounds = orderBy(this.currentEvent.rounds, 'number', 'desc')
    this.status = 'READY'
  })

  reportResult = flow(function*(round, win, loss) {
    console.log(`${round}: ${win} - ${loss}`)
    // api.reportResult(this.currentEvent.id, this.rootStore.userStore.user)
  })

  get pEvent() {
    return {
      ...this.currentEvent,
      rounds: this.currentEvent.rounds.map(round => {
        const user = this.rootStore.userStore.user
        const isUser = ({ dci, firstName, lastName }) =>
          (user.dci.length > 0 && dci === user.dci) ||
          (user.name.length > 0 &&
            `${firstName} ${lastName}`.toLowerCase().includes(user.name.toLowerCase()))
        const match = round.matches.filter(
          match => isUser(match.person) || isUser(match.opponent)
        )[0]
        if (!match) {
          return round
        } else {
          return {
            ...round,
            match: {
              ...match,
              round: round.number,
              ...(isUser(match.person)
                ? {}
                : {
                    person: match.opponent,
                    opponent: match.person,
                    win: match.loss,
                    loss: match.win,
                  }),
            },
          }
        }
      }),
    }
  }
}

decorate(EventStore, {
  status: observable,
  currentEvent: observable,
  results: observable,
  init: action.bound,
  fetchEvent: action.bound,
  addResult: action.bound,
  reportResult: action.bound,
  pEvent: computed,
})

export default EventStore
