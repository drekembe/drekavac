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
  win = 0
  loss = 0
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
      <MyMatch match={round.match} win={this.win} loss={this.loss} />
    ) : (
      <AllMatches matches={round.matches} />
    )
    const reportButtonText = this.win === 0 && this.loss === 0 ? 'Report result' : 'Change result'
    return (
      <div className={classnames(style.wrapper, style[userStore.theme])}>
        <Heading size={5} className={style.heading}>
          Round {round.number}
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
          <ReportResult onClose={this.closeResultReporter} reportResult={this.reportResult} />
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
