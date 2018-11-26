import React from 'react'
import { withRouter } from 'react-router-dom'

class RouterStoreConnector extends React.Component {
  componentDidMount() {
    this.props.store.setRoute(this.props.location, this.props.history)
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.store.setRoute(this.props.location, this.props.history)
    }
  }
  render() {
    return this.props.children
  }
}

export default withRouter(RouterStoreConnector)
