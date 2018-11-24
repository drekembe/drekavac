import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'

/**
 * A component for scrolling to the top of the viewport, best used just
 * below a <Router /> component.
 */
class ScrollToTop extends React.Component {
  componentDidMount() {
    this.props.setRoute(this.props.location, this.props.history)
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.setRoute(this.props.location, this.props.history)
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(
  inject(({ rootStore: { routerStore } }) => ({
    setRoute: routerStore.setRoute,
  }))(ScrollToTop)
)
