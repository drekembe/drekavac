import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable, decorate, action, flow } from 'mobx'

let Debug = observer(({ children }) => <pre>{JSON.stringify(children, null, 2)}</pre>)

class MyMatch extends React.Component {
  result = '00' // 00, 01, 10, 21, 12 etc
  report = flow(function*(win, loss) {
    yield this.props.eventStore.reportResult(this.props.roundNumber, win, loss)
    this.result = `${win}${loss}`
  })
  render() {
    const { match } = this.props
    const { reportingResult } = this.props.eventStore
    return (
      <div>
        Table: {match.table}
        <br />
        Your opponent is: {match.opponent.firstName} {match.opponent.lastName}.
        <br />
        {reportingResult && '...'}
        <br />
        <button disabled={reportingResult} onClick={() => this.report(2, 1)}>
          {(this.result === '21' && '[2-1]') || '2-1'}
        </button>
        <button disabled={reportingResult} onClick={() => this.report(2, 0)}>
          {(this.result === '20' && '[2-0]') || '2-0'}
        </button>
        <button disabled={reportingResult} onClick={() => this.report(1, 2)}>
          {(this.result === '12' && '[1-2]') || '1-2'}
        </button>
        <button disabled={reportingResult} onClick={() => this.report(0, 2)}>
          {(this.result === '02' && '[0-2]') || '0-2'}
        </button>
      </div>
    )
  }
}

decorate(MyMatch, {
  result: observable,
  report: action.bound,
})

MyMatch = inject(({ rootStore: { eventStore } }) => ({
  eventStore,
}))(observer(MyMatch))

let Match = observer(({ match, roundNumber }) =>
  !match.outcome ? (
    <MyMatch match={match} roundNumber={roundNumber} />
  ) : (
    <div>
      Your opponent was: {match.opponent.firstName} {match.opponent.lastName}
      <br />
      Result: {match.win}-{match.loss}
    </div>
  )
)
let Matches = observer(({ matches }) => <Debug>{matches}</Debug>)

const Round = observer(({ round }) => (
  <div>
    <h2>{round.number}</h2>
    {round.match ? (
      <Match roundNumber={round.number} match={round.match} />
    ) : (
      <Matches matches={round.matches} />
    )}
  </div>
))

let RoundList = observer(({ rounds }) =>
  rounds.map(round => <Round key={round.number} round={round} />)
)

class Event extends React.Component {
  componentDidMount() {
    this.props.eventStore.setEventSlug(this.props.match.params.id)
    this.props.eventStore.fetchEvent(this.props.match.params.id)
  }
  render() {
    const { userStore, eventStore } = this.props
    const e = eventStore.pEvent
    if (eventStore.status === 'LOADING') {
      return <div>Loading...</div>
    }
    return (
      <div>
        hello {userStore.user.name}! <Link to="/">link</Link>.
        <br />
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
  userStore: rootStore.userStore,
  eventStore: rootStore.eventStore,
}))(observer(Event))
