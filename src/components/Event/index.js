import React from 'react'
import { inject, observer } from 'mobx-react'

import Round from 'components/Round'
import Loading from 'components/Loading'

import style from './style.module.scss'

const RoundList = observer(({ rounds }) =>
  rounds.map(round => <Round key={round.number} round={round} />)
)

class Event extends React.Component {
  componentDidMount() {
    this.props.eventStore.setEventSlug(this.props.match.params.id)
    this.props.eventStore.fetchEvent(this.props.match.params.id)
  }
  render() {
    const { eventStore } = this.props
    const e = eventStore.pEvent
    if (eventStore.status === 'LOADING') {
      return <Loading fullscreen={true} />
    }
    return (
      <div className={style.wrapper}>
        <RoundList rounds={e.rounds} />
      </div>
    )
  }
}

export default inject(({ rootStore }) => ({
  eventStore: rootStore.eventStore,
}))(observer(Event))
