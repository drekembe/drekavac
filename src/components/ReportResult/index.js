import React from 'react'
import style from './style.module.scss'
import { inject, observer } from 'mobx-react'

import Button from 'react-bulma-components/lib/components/button'
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class ReportButton extends React.Component {
  report = () => this.props.reportResult(this.props.win, this.props.loss)
  render = () => (
    <Button onClick={this.report} className={style.reportButton} color="info">
      {this.props.win} - {this.props.loss}
    </Button>
  )
}

class ReportResult extends React.Component {
  render() {
    const { onClose, reportResult } = this.props
    return (
      <div className={style.resultReporter}>
        <div className={style.closeContainer}>
          <div className={style.closeIcon} onClick={onClose}>
            <Fa icon={faTimes} />
          </div>
        </div>
        <ReportButton reportResult={reportResult} win={2} loss={0} />
        <ReportButton reportResult={reportResult} win={2} loss={1} />
        <ReportButton reportResult={reportResult} win={1} loss={0} />
        <ReportButton reportResult={reportResult} win={1} loss={1} />
        <ReportButton reportResult={reportResult} win={0} loss={0} />
        <ReportButton reportResult={reportResult} win={0} loss={1} />
        <ReportButton reportResult={reportResult} win={1} loss={2} />
        <ReportButton reportResult={reportResult} win={0} loss={2} />
      </div>
    )
  }
}

export default inject(({ rootStore: { eventStore } }) => ({
  eventStore,
}))(observer(ReportResult))
