import React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

import RootStore from 'stores/RootStore'

import RouteReporter from 'components/RouteReporter'
import Layout from 'components/Layout'
import Home from 'components/Home'
import Event from 'components/Event'
import Settings from 'components/Settings'

configure({ enforceActions: 'observed' })
const rootStore = new RootStore().init()

window.store = rootStore

export default function App() {
  return (
    <Provider rootStore={rootStore}>
      <Router history={createBrowserHistory()}>
        <RouteReporter store={rootStore.routerStore}>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} key="home" />
              <Route path="/settings" exact component={Settings} key="settings" />
              <Route path="/:id" component={Event} key="event" />
            </Switch>
          </Layout>
        </RouteReporter>
      </Router>
    </Provider>
  )
}
