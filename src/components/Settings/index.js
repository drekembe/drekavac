import React from 'react'
import { inject, observer } from 'mobx-react'
import style from './style.module.scss'
import { Field, Control, Input, Label, Select } from 'react-bulma-components/lib/components/form'
import classnames from 'classnames'

class Settings extends React.Component {
  setName = ({ target }) => this.props.userStore.setName(target.value)
  setDci = ({ target }) => this.props.userStore.setDci(target.value)
  handleThemeChange = ({ target }) => this.props.userStore.setTheme(target.value)
  render() {
    const { userStore } = this.props
    return (
      <div className={classnames(style.wrapper, style[userStore.theme])}>
        <form>
          <Field>
            <Label>Name</Label>
            <Control>
              <Input
                type="text"
                value={userStore.user.name}
                onChange={this.setName}
                className="is-large"
              />
            </Control>
          </Field>
          <Field>
            <Label>DCI number</Label>
            <Control>
              <Input
                type="text"
                value={userStore.user.dci}
                onChange={this.setDci}
                className="is-large"
              />
            </Control>
          </Field>
          <Field>
            <Label>Theme</Label>
            <Control>
              <Select
                value={userStore.theme}
                onChange={this.handleThemeChange}
                name="color"
                className={classnames('is-large', 'is-fullwidth')}>
                {userStore.constructor.themes.map(({ value, label }) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Control>
          </Field>
        </form>
      </div>
    )
  }
}

export default inject(({ rootStore: { userStore } }) => ({
  userStore,
}))(observer(Settings))
