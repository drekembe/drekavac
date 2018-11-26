import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer, inject } from 'mobx-react'
import { decorate, action, observable, flow } from 'mobx'

import Heading from 'react-bulma-components/lib/components/heading'
import Button from 'react-bulma-components/lib/components/button'

import MyMatch from 'components/MyMatch'
import AllMatches from 'components/AllMatches'
import ReportResult from 'components/ReportResult'

class Round extends React.Component {
  win = null
  loss = null
  resultReporterOpen = false
  openResultReporter = () => {
    this.resultReporterOpen = true
  }
  closeResultReporter = () => {
    this.resultReporterOpen = false
  }
  reportResult = flow(function*(win, loss) {
    yield this.props.eventStore.reportResult(this.props.round.number, win, loss)
    this.resultReporterOpen = false
    this.win = win
    this.loss = loss
  })
  render() {
    const { round, userStore } = this.props
    const match = round.match ? (
      <MyMatch match={round.match} win={this.win || 0} loss={this.loss || 0} />
    ) : (
      <AllMatches matches={round.matches} />
    )
    const alreadyReported = this.win !== null || this.loss !== null
    const reportButtonText = !alreadyReported ? 'Report result' : 'Change result'
    const displayTable = round.match && !round.match.finished && round.match.table
    return (
      <div className={classnames(style.wrapper, style[userStore.theme])}>
        <Heading size={5} className={style.heading}>
          Round {round.number}
          {displayTable && <span> table {round.match.table}</span>}
        </Heading>
        <div className={style.matchWrapper}>{match}</div>
        {round.match && !round.match.finished && (
          <Button
            fullwidth={true}
            color="info"
            onClick={this.openResultReporter}
            className={style.reportButton}>
            {reportButtonText}
          </Button>
        )}
        {this.resultReporterOpen && (
          <ReportResult
            onClose={this.closeResultReporter}
            reportResult={this.reportResult}
            initialWin={this.win}
            initialLoss={this.loss}
          />
        )}
      </div>
    )
  }
}

decorate(Round, {
  win: observable,
  loss: observable,
  resultReporterOpen: observable,
  closeResultReporter: action.bound,
  openResultReporter: action.bound,
  reportResult: action.bound,
})

export default inject(({ rootStore }) => ({
  userStore: rootStore.userStore,
  eventStore: rootStore.eventStore,
}))(observer(Round))
