import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer } from 'mobx-react'

class AllMatches extends React.Component {
  render() {
    return (
      <div className={classnames(style.wrapper)}>
        {this.props.matches.map(match => (
          <div>
            {match.person.firstName} {match.person.lastName} vs. {match.opponent.firstName}{' '}
            {match.opponent.lastName}
          </div>
        ))}
      </div>
    )
  }
}

export default observer(AllMatches)
