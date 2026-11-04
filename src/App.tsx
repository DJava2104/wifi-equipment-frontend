import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { ROUTES } from './Routes'
import { FeedPage } from './pages/FeedPage'
import TilePage from './pages/TilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.TILE} element={<TilePage />} />
          <Route path={`${ROUTES.FEED}/:id?`} element={<FeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
