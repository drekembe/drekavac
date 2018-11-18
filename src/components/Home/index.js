import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { decorate, observable, action } from 'mobx'

class Home extends React.Component {
  slugTextField = this.props.eventStore.eventSlug
  updateSlugTextField = ({ target }) => {
    this.slugTextField = target.value
  }
  handleSubmit = () => {
    this.props.routerStore.history.push(`/${this.slugTextField}`)
  }
  render() {
    const { slugTextField, updateSlugTextField, handleSubmit } = this
    return (
      <Fragment>
        <div>hello! {slugTextField}</div>
        <input type="text" onChange={updateSlugTextField} value={slugTextField} />
        <button onClick={handleSubmit}>go</button>
      </Fragment>
    )
  }
}

decorate(Home, {
  slugTextField: observable,
  updateSlugTextField: action.bound,
  handleSubmit: action.bound,
})

export default inject(({ rootStore: { eventStore, routerStore } }) => ({
  eventStore,
  routerStore,
}))(observer(Home))
