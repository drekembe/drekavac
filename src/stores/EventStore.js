import { observable, action, decorate, reaction, flow, toJS } from 'mobx'
import * as api from 'api'

window.toJS = toJS

class EventStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  status = 'LOADING' // LOADING, READY, ERROR, NOT_FOUND
  eventObject = {}
  resultsById = JSON.parse(window.localStorage.getItem('resultsById')) || {}

  init = () => {
    reaction(() => this.resultsById, a => console.log('woo'))
  }

  addResult = (id, round, win, lose, draw) => {
    if (!this.resultsById[id]) {
      this.resultsById[id] = {}
    }
    if (!this.resultsById[id][round]) {
      this.resultsById[id][round] = {}
    }
    this.resultsById[id][round].win = win
    this.resultsById[id][round].lose = lose
    this.resultsById[id][round].draw = draw
    window.localStorage.setItem('resultsById', JSON.stringify(toJS(this.resultsById)))
    // upload result to server
  }

  fetchEvent = flow(function*(slug) {
    this.status = 'LOADING'
    this.eventObject = yield api.fetchEvent(slug)
    this.status = 'READY'
  })
}

decorate(EventStore, {
  status: observable,
  eventObject: observable,
  resultsById: observable,
  init: action,
  fetchEvent: action.bound,
  addResult: action.bound,
})

export default EventStore
