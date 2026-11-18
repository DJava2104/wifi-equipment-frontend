import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { ROUTES } from './Routes'
import { AddPage } from './pages/AddPage'
import { FeedPage } from './pages/FeedPage'
import { LoginPage } from './pages/LoginPage'
import TilePage from './pages/TilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.TILE} element={<TilePage />} />
          <Route path={`${ROUTES.FEED}/:id?`} element={<FeedPage />} />
          <Route path={ROUTES.ADD} element={<AddPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
