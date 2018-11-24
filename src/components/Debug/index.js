import React from 'react'
import { observer } from 'mobx-react'

class Debug extends React.Component {
  render() {
    return <pre>{JSON.stringify(this.props.children, null, 2)}</pre>
  }
}

export default observer(Debug)
