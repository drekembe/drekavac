import React from 'react'
import { withRouter } from 'react-router-dom'

/**
 * A component for scrolling to the top of the viewport, best used just
 * below a <Router /> component.
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
