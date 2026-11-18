import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authClient } from '../api'
import { ROUTES, ROUTE_LABELS } from '../Routes'
import { resetUser } from '../slices/userSlice'
import { useAppDispatch, useAppSelector } from '../store'
import './TabBar.css'

export const TabBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const routers = useAppSelector((state) => state.routers.routers)
  const { isAuthenticated, username } = useAppSelector((state) => state.user)
  const [exiting, setExiting] = useState(false)

  const isFeed = location.pathname.startsWith(ROUTES.FEED)
  const isTile = location.pathname === ROUTES.TILE
  const isAdd = location.pathname === ROUTES.ADD
  const isLogin = location.pathname === ROUTES.LOGIN

  const goFeed = () => {
    navigate(routers.length ? `${ROUTES.FEED}/${routers[0].id_routers}` : ROUTES.FEED)
  }

  // Выход: только axios, состояние в Redux передаётся вручную (без thunk)
  const handleLogout = async () => {
    setExiting(true)
    try {
      await authClient.post('/logout')
    } catch {
      // сессия могла истечь — интерфейс всё равно переводится в состояние гостя
    } finally {
      dispatch(resetUser()) // сбрасывает и фильтр плитки (extraReducers в routersSlice)
      setExiting(false)
      navigate(ROUTES.TILE)
    }
  }

  return (
    <nav className="tab-bar">
      <button type="button" className={`tab-bar-item ${isFeed ? 'tab-bar-item-active' : ''}`} onClick={goFeed}>
        <span className="tab-bar-icon">📱</span>
        {ROUTE_LABELS.FEED}
      </button>
      <button
        type="button"
        className={`tab-bar-item ${isAdd ? 'tab-bar-item-active' : ''}`}
        disabled={!isAuthenticated}
        title={isAuthenticated ? 'Добавить роутер' : 'Доступно после входа'}
        onClick={() => navigate(ROUTES.ADD)}
      >
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
      {isAuthenticated ? (
        <button type="button" className="tab-bar-item" disabled={exiting} title={username} onClick={handleLogout}>
          <span className="tab-bar-icon">🚪</span>
          {ROUTE_LABELS.LOGOUT}
          <span className="tab-bar-user">{username}</span>
        </button>
      ) : (
        <button
          type="button"
          className={`tab-bar-item ${isLogin ? 'tab-bar-item-active' : ''}`}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          <span className="tab-bar-icon">👤</span>
          {ROUTE_LABELS.LOGIN}
        </button>
      )}
    </nav>
  )
}
