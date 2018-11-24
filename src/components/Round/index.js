import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer, inject } from 'mobx-react'

import MyMatch from 'components/MyMatch'
import AllMatches from 'components/AllMatches'
import Heading from 'react-bulma-components/lib/components/heading'

class Round extends React.Component {
  render() {
    const { round, userStore } = this.props
    const match = round.match ? (
      <MyMatch roundNumber={round.number} match={round.match} />
    ) : (
      <AllMatches matches={round.matches} />
    )
    return (
      <div className={classnames(style.wrapper, style[userStore.theme])}>
        <Heading size={5} className={style.heading}>
          Round {round.number}
        </Heading>
        <div className={style.matchContainer}>{match}</div>
      </div>
    )
  }
}

export default inject(({ rootStore }) => ({
  userStore: rootStore.userStore,
}))(observer(Round))
