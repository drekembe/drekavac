import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer } from 'mobx-react'

import Debug from 'components/Debug'

class AllMatches extends React.Component {
  render() {
    return (
      <div className={classnames(style.wrapper)}>
        <Debug>{this.props.matches}</Debug>
      </div>
    )
  }
}

export default observer(AllMatches)
