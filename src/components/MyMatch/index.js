import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { inject, observer } from 'mobx-react'
import { observable, action, decorate } from 'mobx'

import Button from 'react-bulma-components/lib/components/button'

const Result = ({ win, loss }) => {
  let result = 'draw'
  if (win > loss) result = 'win'
  if (win < loss) result = 'loss'
  return (
    <div className={classnames(style.result, style[result])}>
      {win} - {loss}
    </div>
  )
}

const PastMatch = observer(({ match }) => {
  return (
    <div className={style.pastMatch}>
      <div>
        {match.opponent.firstName} {match.opponent.lastName}
      </div>
      <Result win={match.win} loss={match.loss} />
    </div>
  )
})

class ResultReporter extends React.Component {
  render() {
    return (
      <div className={style.resultReporter}>
        ok
        <Button onClick={this.props.onClose}>Close</Button>
      </div>
    )
  }
}

ResultReporter = inject(({ rootStore }) => ({
  eventStore: rootStore.eventStore,
}))(observer(ResultReporter))

class CurrentMatch extends React.Component {
  win = 0
  loss = 0
  resultReporterOpen = false
  openResultReporter = () => {
    this.resultReporterOpen = true
  }
  closeResultReporter = () => {
    this.resultReporterOpen = false
  }
  render() {
    const { match } = this.props
    return (
      <div className={classnames(style.currentMatch)}>
        {this.resultReporterOpen && <ResultReporter onClose={this.closeResultReporter} />}
        <div className={style.pastMatch}>
          <div>
            {match.opponent.firstName} {match.opponent.lastName}
            {match.table && <span className={style.table}> @ table {match.table}</span>}
          </div>
          <Result win={this.win} loss={this.loss} />
        </div>
        <Button
          color="info"
          fullwidth={true}
          className={style.reportButton}
          onClick={this.openResultReporter}>
          Report result
        </Button>
      </div>
    )
  }
}

decorate(CurrentMatch, {
  win: observable,
  loss: observable,
  resultReporterOpen: observable,
  report: action.bound,
  closeResultReporter: action.bound,
  openResultReporter: action.bound,
})

CurrentMatch = inject(({ rootStore: { eventStore } }) => ({
  eventStore,
}))(observer(CurrentMatch))

const MyMatch = ({ match, userStore, roundNumber }) => (
  <div className={classnames(style.wrapper, style[userStore.theme])}>
    {match.outcome && match.outcome === 1 ? (
      <PastMatch match={match} roundNumber={roundNumber} />
    ) : (
      <CurrentMatch match={match} roundNumber={roundNumber} />
    )}
  </div>
)

export default inject(({ rootStore }) => ({
  userStore: rootStore.userStore,
}))(observer(MyMatch))
