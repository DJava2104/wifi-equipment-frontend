import { useLocation, useNavigate } from 'react-router-dom'
import type { Router } from '../modules/routersApi'
import { ROUTES, ROUTE_LABELS } from '../Routes'
import './TabBar.css'

interface Props {
  routers: Router[]
}

export const TabBar = ({ routers }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isFeed = location.pathname.startsWith(ROUTES.FEED)
  const isTile = location.pathname === ROUTES.TILE

  const goFeed = () => {
    navigate(routers.length ? `${ROUTES.FEED}/${routers[0].id_routers}` : ROUTES.FEED)
  }

  return (
    <nav className="tab-bar">
      <button type="button" className={`tab-bar-item ${isFeed ? 'tab-bar-item-active' : ''}`} onClick={goFeed}>
        <span className="tab-bar-icon">📱</span>
        {ROUTE_LABELS.FEED}
      </button>
      <button type="button" className="tab-bar-item" disabled title="Доступно после входа">
        <span className="tab-bar-icon">➕</span>
        {ROUTE_LABELS.ADD}
      </button>
      <button
        type="button"
        className={`tab-bar-item ${isTile ? 'tab-bar-item-active' : ''}`}
        onClick={() => navigate(ROUTES.TILE)}
      >
        <span className="tab-bar-icon">📒</span>
        {ROUTE_LABELS.TILE}
      </button>
      <button type="button" className="tab-bar-item" disabled title="Будет в следующей лабораторной">
        <span className="tab-bar-icon">👤</span>
        {ROUTE_LABELS.LOGIN}
      </button>
    </nav>
  )
}
