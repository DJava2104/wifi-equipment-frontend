import { useEffect } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FrequencyFilter } from '../components/FrequencyFilter'
import { RouterCard } from '../components/RouterCard'
import { ROUTES } from '../Routes'
import { deleteRouterItem, getRoutersList, setFreqMax, setFreqMin } from '../slices/routersSlice'
import { useAppDispatch, useAppSelector } from '../store'
import './TilePage.css'

const TilePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // фильтр и список — из Redux: значения фильтра сохраняются при переходах между страницами
  const { freqMin, freqMax, routers, loading, isMock, error } = useAppSelector((state) => state.routers)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(getRoutersList())
  }, [dispatch, isAuthenticated])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Удалить роутер?')) return
    await dispatch(deleteRouterItem(id))
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
          setFreqMin={(value) => dispatch(setFreqMin(value))}
          setFreqMax={(value) => dispatch(setFreqMax(value))}
          onSubmit={() => dispatch(getRoutersList())}
          loading={loading}
        />

        <p className="filter-result">
          Найдено: {routers.length}
          {isMock && <span className="mock-badge">mock</span>}
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        {routers.length ? (
          <Row xs={2} className="g-3">
            {routers.map((item) => (
              <Col key={item.id_routers}>
                <RouterCard
                  router={item}
                  onClick={(id) => navigate(`${ROUTES.FEED}/${id}`)}
                  onDelete={isAuthenticated && item.is_creator === 1 ? handleDelete : undefined}
                  disabled={loading}
                />
              </Col>
            ))}
          </Row>
        ) : (
          !loading && <p className="empty-hint">Оборудование не найдено</p>
        )}
      </main>
    </>
  )
}

export default TilePage
