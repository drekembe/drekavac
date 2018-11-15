import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

class Event extends React.Component {
  componentDidMount() {
    this.props.eventStore.fetchEvent('ha')
  }
  render() {
    const { routerStore, userStore, eventStore } = this.props
    return (
      <div>
        hello {userStore.name}! <Link to="/">link</Link>. {routerStore.location.pathname}
        <br />
        <input
          type="text"
          value={userStore.name}
          onChange={e => userStore.setName(e.target.value)}
        />
        <input type="text" value={userStore.dci} onChange={e => userStore.setDci(e.target.value)} />
        <pre>{JSON.stringify(eventStore.eventObject, null, 2)}</pre>
      </div>
    )
  }
}

export default inject(({ rootStore }) => ({
  routerStore: rootStore.routerStore,
  userStore: rootStore.userStore,
  eventStore: rootStore.eventStore,
}))(observer(Event))
