import React from 'react'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import classnames from 'classnames'

import Menu from 'components/Menu'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import style from './style.module.scss'

function Layout({ children, colorScheme, routerStore }) {
  return (
    <Section className={classnames(style.wrapper, style[colorScheme])}>
      <Container className={style.container}>{children}</Container>
      <Menu />
    </Section>
  )
}

//export default Layout

export default inject(({ rootStore: { userStore, routerStore } }) => ({
  colorScheme: userStore.colorScheme,
  routerStore: routerStore,
}))(observer(Layout))
