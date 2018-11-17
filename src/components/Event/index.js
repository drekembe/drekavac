import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable, decorate } from 'mobx'

let Debug = observer(({ children }) => <pre>{JSON.stringify(children, null, 2)}</pre>)

class MyMatch_ extends React.Component {
  result = {}
  render() {
    const { match, reportResult } = this.props
    return (
      <div>
        Table: {match.table}
        <br />
        Your opponent is: {match.opponent.firstName} {match.opponent.lastName}.
        <Debug>{this.result}</Debug>
        <br />
        <button onClick={() => reportResult(match.round, 2, 0)}>2-0</button>
        <button onClick={() => reportResult(match.round, 2, 1)}>2-1</button>
        <button onClick={() => reportResult(match.round, 1, 2)}>1-2</button>
        <button onClick={() => reportResult(match.round, 0, 2)}>0-2</button>
      </div>
    )
  }
}

decorate(MyMatch_, {
  result: observable,
})

const MyMatch = inject(({ rootStore }) => ({
  reportResult: rootStore.eventStore.reportResult,
}))(observer(MyMatch_))

let Match = observer(({ match }) =>
  !match.outcome ? (
    <MyMatch match={match} />
  ) : (
    <div>
      Your opponent was: {match.opponent.firstName} {match.opponent.lastName}
      <br />
      Result: {match.win}-{match.loss}
    </div>
  )
)
let Matches = observer(({ matches }) => <Debug>{matches}</Debug>)
let Round = observer(({ round }) => (
  <div>
    <h2>{round.number}</h2>
    {round.match ? <Match match={round.match} /> : <Matches matches={round.matches} />}
  </div>
))

let RoundList = observer(({ rounds }) =>
  rounds.map(round => <Round key={round.number} round={round} />)
)

class Event extends React.Component {
  componentDidMount() {
    this.props.eventStore.fetchEvent(this.props.match.params.id)
  }
  render() {
    const { routerStore, userStore, eventStore } = this.props
    const e = eventStore.pEvent
    if (eventStore.status === 'LOADING') {
      return <div>Loading...</div>
    }
    return (
      <div>
        hello {userStore.user.name}! <Link to="/">link</Link>. {routerStore.location.pathname}
        <br />
        <input
          type="text"
          value={userStore.user.name}
          onChange={e => userStore.setName(e.target.value)}
        />
        <input
          type="text"
          value={userStore.user.dci}
          onChange={e => userStore.setDci(e.target.value)}
        />
        <div>
          {e.slug}
          <br />
          {e.date}
          <br />
        </div>
        <RoundList rounds={e.rounds} />
      </div>
    )
  }
}

export default inject(({ rootStore }) => ({
  routerStore: rootStore.routerStore,
  userStore: rootStore.userStore,
  eventStore: rootStore.eventStore,
}))(observer(Event))
