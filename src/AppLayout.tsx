import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { TabBar } from './components/TabBar'
import type { Router } from './modules/routersApi'

export type AppOutletContext = {
  routers: Router[]
  setRouters: (routers: Router[]) => void
}

export const AppLayout = () => {
  const [routers, setRouters] = useState<Router[]>([])

  return (
    <div className="app-body">
      <div className="phone">
        <Outlet context={{ routers, setRouters } satisfies AppOutletContext} />
        <TabBar routers={routers} />
      </div>
    </div>
  )
}
