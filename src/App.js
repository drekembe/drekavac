import React, { Component } from 'react'
import { configure } from 'mobx'
import { Provider, inject } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

import RootStore from 'stores/RootStore'

import ScrollToTop from 'components/ScrollToTop'
import Layout from 'components/Layout'
import Home from 'components/Home'
import Event from 'components/Event'
import Settings from 'components/Settings'

import posed, { PoseGroup } from 'react-pose'

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 200,
    beforeChildren: true,
    transition: {
      duration: 200,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 200,
    },
  },
})

//configure({ enforceActions: 'observed' })

const withRouterStore = WrappedComponent => {
  class WithRouterStore extends React.Component {
    componentWillMount() {
      this.props.setRoute(this.props.location, this.props.match, this.props.history)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return inject(({ rootStore }) => ({
    setRoute: rootStore.routerStore.setRoute,
  }))(WithRouterStore)
}

const rootStore = new RootStore().init()

const history = createBrowserHistory()

window.store = rootStore

class App extends Component {
  render = () => (
    <Provider rootStore={rootStore}>
      <Router history={history}>
        <ScrollToTop>
          <Layout>
            <Route
              render={({ location }) => (
                <PoseGroup>
                  <RoutesContainer key={location.key || location.pathname}>
                    <Switch location={location}>
                      <Route path="/" exact component={withRouterStore(Home)} key="home" />
                      <Route
                        path="/settings"
                        exact
                        component={withRouterStore(Settings)}
                        key="settings"
                      />
                      <Route path="/:id" component={withRouterStore(Event)} key="event" />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              )}
            />
          </Layout>
        </ScrollToTop>
      </Router>
    </Provider>
  )
}

export default App
