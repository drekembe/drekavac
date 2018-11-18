import React from 'react'
import { NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faCog } from '@fortawesome/free-solid-svg-icons'
import posed, { PoseGroup } from 'react-pose'

import style from './style.module.scss'

const PNavLink = posed.div({
  enter: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
})

function Menu({ children, eventStore }) {
  const displayEventLink = eventStore.eventSlug !== ''
  return (
    <div className={style.wrapper}>
      <PoseGroup>
        <PNavLink key="1">
          <NavLink exact to="/" activeClassName={style.active}>
            <Fa icon={faHome} size="lg" />
          </NavLink>
        </PNavLink>
        {displayEventLink && (
          <PNavLink key="2">
            <NavLink exact to={`/${eventStore.eventSlug}`} activeClassName={style.active}>
              <Fa icon={faUsers} size="lg" />
            </NavLink>
          </PNavLink>
        )}
        <PNavLink key="3">
          <NavLink exact to="/settings" activeClassName={style.active}>
            <Fa icon={faCog} size="lg" />
          </NavLink>
        </PNavLink>
      </PoseGroup>
    </div>
  )
}

export default inject(({ rootStore: { eventStore, routerStore } }) => ({
  eventStore,
  routerStore,
  location: routerStore.location, // to prevent update blocking
}))(observer(Menu))
