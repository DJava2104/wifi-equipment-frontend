import { Spinner } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import { useAppSelector } from './store'

export const AppLayout = () => {
  // пока выполняется любой запрос — анимация поверх экрана блокирует кнопки пользователя
  const busy = useAppSelector((state) => state.routers.loading || state.feed.loading || state.draft.loading)

  return (
    <div className="app-body">
      <div className="phone">
        <Outlet />
        <TabBar />
        {busy && (
          <div className="busy-overlay" aria-busy="true">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </div>
  )
}
