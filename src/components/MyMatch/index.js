import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer } from 'mobx-react'

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

const Match = observer(({ match, win, loss }) => {
  return (
    <div className={style.wrapper}>
      <div>
        {match.opponent.firstName} {match.opponent.lastName}
      </div>
      <Result win={match.win || win} loss={match.loss || loss} />
    </div>
  )
})

export default Match
