import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

function Event() {
  return (
    <div>
      hello! <Link to="/">link</Link>. {this.props.routerStore.location.pathname}
    </div>
  )
}

export default inject(({ rootStore }) => ({ routerStore: rootStore.routerStore }))(observer(Event))
