import React from 'react'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'

class Match extends React.Component {
  render() {
    const { match, roundNumber } = this.props
    return (
      <div className={classnames(style.wrapper)}>
        {!match.outcome ? (
          <MyMatch match={match} roundNumber={roundNumber} />
        ) : (
          <div>
            Your opponent was: {match.opponent.firstName} {match.opponent.lastName}
            <br />
            Result: {match.win}-{match.loss}
          </div>
        )}
      </div>
    )
  }
}

export default inject(({ rootStore: { eventStore, userStore } }) => ({
  eventStore,
  userStore,
}))(observer(Match))

