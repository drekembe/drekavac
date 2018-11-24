import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { decorate, observable, action } from 'mobx'
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'

class Home extends React.Component {
  slugTextField = this.props.eventStore.eventSlug
  updateSlugTextField = ({ target }) => {
    this.slugTextField = target.value
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.routerStore.history.push(`/${this.slugTextField}`)
  }
  render() {
    const { slugTextField, updateSlugTextField, handleSubmit } = this
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Field>
            <Control>
              <Input
                type="text"
                placeholder="Enter event ID"
                value={slugTextField}
                onChange={updateSlugTextField}
                className="is-large"
              />
            </Control>
          </Field>
          <Button fullwidth={true} type="submit" className="is-large" color="primary">
            Go
          </Button>
        </form>
      </div>
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
