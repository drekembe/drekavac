import React, { Component } from 'react'
import { action, configure, observable, decorate } from 'mobx'
import { observer, Provider, inject } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import './App.scss'

import RootStore from 'stores/RootStore'

import Landing from 'components/Landing'
import Event from 'components/Event'

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

const SmartRoute = props => <Route {...props} component={withRouterStore(props.component)} />

const history = createBrowserHistory()
const rootStore = new RootStore().init()
const routerStore = rootStore.routerStore

window.store = rootStore

class App extends Component {
  render = () => (
    <Provider rootStore={rootStore}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <SmartRoute path="/" exact component={Landing} />
          <SmartRoute path="/:id" component={Event} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
