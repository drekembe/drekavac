import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer } from 'mobx-react'

class AllMatches extends React.Component {
  render() {
    return (
      <div className={classnames(style.wrapper)}>
        {this.props.matches.map(match => (
          <div className={style.match} key={`${match.person.dci}`}>
            {match.table && <div className={style.table}>{match.table}</div>}
            <div className={style.vs}>
              <div>
                {match.person.firstName} {match.person.lastName}
              </div>
              <div>
                {match.opponent.firstName} {match.opponent.lastName}
              </div>
            </div>
            <div className={style.scores}>
              <div>{match.win}</div>
              <div>{match.loss}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default observer(AllMatches)
