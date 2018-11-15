import React from 'react'
import { inject, observer } from 'mobx-react'

class Landing extends React.Component {
  render() {
    return <div>hello! {this.props.routerStore.location.pathname}</div>
  }
}

export default inject(({ rootStore }) => ({ routerStore: rootStore.routerStore }))(
  observer(Landing)
)
