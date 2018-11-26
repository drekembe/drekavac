import React from 'react'
import classnames from 'classnames'
import style from './style.module.scss'
import { observer, inject } from 'mobx-react'
import { ReactComponent as Spin } from './tail-spin.svg'

class Loading extends React.Component {
  render() {
    return (
      <div
        className={classnames(style.wrapper, style[this.props.userStore.theme], {
          [style.fullscreen]: this.props.fullscreen,
        })}>
        <Spin />
      </div>
    )
  }
}

export default inject(({ rootStore }) => ({ userStore: rootStore.userStore }))(observer(Loading))
