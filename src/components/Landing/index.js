import React from 'react'
import { inject, observer } from 'mobx-react'

function Landing({ routerStore }) {
  return <div>hello! {routerStore.location.pathname}</div>
}

export default inject(({ rootStore }) => ({ routerStore: rootStore.routerStore }))(
  observer(Landing)
)
