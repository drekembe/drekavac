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
import style from './App.module.scss'

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
const rootStore = new RootStore().init()

window.store = rootStore

class App extends Component {
  render = () => (
    <Provider rootStore={new RootStore().init()}>
      <Router history={createBrowserHistory()}>
        <ScrollToTop>
          <Route
            render={({ location }) => (
              <Layout>
                <PoseGroup>
                  <RoutesContainer key={location.key || location.pathname}>
                    <Switch location={location}>
                      <Route path="/" exact component={Home} key="home" />
                      <Route path="/settings" exact component={Settings} key="settings" />
                      <Route path="/:id" component={Event} key="event" />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              </Layout>
            )}
          />
        </ScrollToTop>
      </Router>
    </Provider>
  )
}

export default App
