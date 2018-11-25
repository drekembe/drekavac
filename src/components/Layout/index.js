import React from 'react'
import classnames from 'classnames'

import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'

import Menu from 'components/Menu'

import style from './style.module.scss'

function Layout({ children, userStore, routerStore }) {
  return (
    <Section className={classnames(style.wrapper, style[userStore.theme])}>
      <Container className={style.container}>{children}</Container>
      <Menu />
    </Section>
  )
}

//export default Layout

export default withRouter(
  inject(({ rootStore: { userStore, routerStore } }) => ({
    userStore,
    routerStore,
  }))(observer(Layout))
)
