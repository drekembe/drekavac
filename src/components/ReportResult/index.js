import React from 'react'
import style from './style.module.scss'
import { inject, observer } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
import classnames from 'classnames'

import Button from 'react-bulma-components/lib/components/button'
import Heading from 'react-bulma-components/lib/components/heading'
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Loading from 'components/Loading'

const WinsPicker = ({ chosen, chooseNumber, title }) => (
  <div className={style.winsPicker}>
    <Heading size={2}>{title}</Heading>
    <div className={style.winButtons}>
      <Button
        size="large"
        onClick={() => chooseNumber(2)}
        className={classnames({ [style.chosen]: chosen === 2 })}>
        2
      </Button>
      <Button
        size="large"
        onClick={() => chooseNumber(1)}
        className={classnames({ [style.chosen]: chosen === 1 })}>
        1
      </Button>
      <Button
        size="large"
        onClick={() => chooseNumber(0)}
        className={classnames({ [style.chosen]: chosen === 0 })}>
        0
      </Button>
    </div>
  </div>
)

class ReportResult extends React.Component {
  win = null
  loss = null
  setWin = n => {
    this.win = n
  }
  setLoss = n => {
    this.loss = n
  }
  render() {
    const { onClose, reportResult, userStore, eventStore } = this.props
    return (
      <div className={classnames(style.wrapper, style[userStore.theme])}>
        <div className={style.closeIcon} onClick={onClose}>
          <Fa icon={faTimes} size="lg" />
        </div>
        <div>
          <WinsPicker chosen={this.win} chooseNumber={this.setWin} title="Won" />
          <WinsPicker chosen={this.loss} chooseNumber={this.setLoss} title="Lost" />
          <Button
            color="info"
            fullwidth={true}
            size="large"
            onClick={() => reportResult(this.win, this.loss)}
            disabled={this.win === null || this.loss === null}>
            Report
          </Button>
          {eventStore.reportingResult && <Loading fullscreen={true} />}
        </div>
      </div>
    )
  }
}

decorate(ReportResult, {
  win: observable,
  loss: observable,
  setWin: action,
  setLoss: action,
})

export default inject(({ rootStore }) => ({
  eventStore: rootStore.eventStore,
  userStore: rootStore.userStore,
}))(observer(ReportResult))
