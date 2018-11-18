import React from 'react'
import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
//import classnames from 'classnames'

import Menu from 'components/Menu'

import style from './style.module.scss'

export default function Layout({ children }) {
  return (
    <Section className={style.wrapper}>
      <Container className={style.container}>{children}</Container>
      <Menu />
    </Section>
  )
}
