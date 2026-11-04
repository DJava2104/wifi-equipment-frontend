import { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import type { AppOutletContext } from '../AppLayout'
import { FrequencyFilter } from '../components/FrequencyFilter'
import { RouterCard } from '../components/RouterCard'
import { FREQ_MAX, FREQ_MIN, getRouters, type Router } from '../modules/routersApi'
import { ROUTES } from '../Routes'
import './TilePage.css'

const TilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const appliedMin = Number(searchParams.get('freq_min') ?? FREQ_MIN)
  const appliedMax = Number(searchParams.get('freq_max') ?? FREQ_MAX)

  const [freqMin, setFreqMin] = useState(appliedMin)
  const [freqMax, setFreqMax] = useState(appliedMax)
  const [routers, setRouterList] = useState<Router[]>([])
  const [loadedFilter, setLoadedFilter] = useState('')
  const filterKey = `${appliedMin}-${appliedMax}`
  const loading = loadedFilter !== filterKey

  const { setRouters } = useOutletContext<AppOutletContext>()
  const navigate = useNavigate()

  useEffect(() => {
    getRouters(appliedMin, appliedMax).then((list) => {
      setRouterList(list)
      setRouters(list)
      setLoadedFilter(`${appliedMin}-${appliedMax}`)
    })
  }, [appliedMin, appliedMax, setRouters])

  const handleSearch = () => {
    const [low, high] = [Math.min(freqMin, freqMax), Math.max(freqMin, freqMax)]
    setSearchParams({ freq_min: String(low), freq_max: String(high) })
  }

  return (
    <>
      <header className="screen-header">
        <h1>Плитка</h1>
      </header>

      <main className="screen-scroll">
        <FrequencyFilter
          freqMin={freqMin}
          freqMax={freqMax}
          setFreqMin={setFreqMin}
          setFreqMax={setFreqMax}
          onSubmit={handleSearch}
          loading={loading}
        />

        <p className="filter-result">Найдено: {routers.length}</p>

        {loading ? (
          <div className="tile-loader">
            <Spinner animation="border" />
          </div>
        ) : routers.length ? (
          <Row xs={2} className="g-3">
            {routers.map((item) => (
              <Col key={item.id_routers}>
                <RouterCard router={item} onClick={(id) => navigate(`${ROUTES.FEED}/${id}`)} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="empty-hint">Оборудование не найдено</p>
        )}
      </main>
    </>
  )
}

export default TilePage
