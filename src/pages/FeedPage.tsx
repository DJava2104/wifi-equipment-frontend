import { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DEFAULT_IMAGE, DEFAULT_VIDEO, onImageError, onVideoError } from '../modules/defaults'
import { toProxyUrl } from '../modules/media'
import { ROUTES } from '../Routes'
import { getRouterFeed, likeRouterItem } from '../slices/feedSlice'
import { deleteRouterItem } from '../slices/routersSlice'
import { useAppDispatch, useAppSelector } from '../store'
import './FeedPage.css'

export const FeedPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { router, loading, error } = useAppSelector((state) => state.feed)
  const { isAuthenticated, username } = useAppSelector((state) => state.user)
  const [expandedId, setExpandedId] = useState<number>()

  useEffect(() => {
    dispatch(getRouterFeed({ id }))
  }, [dispatch, id, isAuthenticated])

  const handleNext = async () => {
    if (!router) return
    const result = await dispatch(getRouterFeed({ id: router.id_routers, next: true }))
    if (getRouterFeed.fulfilled.match(result)) navigate(`${ROUTES.FEED}/${result.payload.id_routers}`)
  }

  const handleLike = () => {
    if (!router) return
    dispatch(likeRouterItem({ idRouters: router.id_routers, like: router.is_liked ? 0 : 1 }))
  }

  const handleDelete = async () => {
    if (!router || !window.confirm('Удалить роутер?')) return
    const result = await dispatch(deleteRouterItem(router.id_routers))
    if (deleteRouterItem.fulfilled.match(result)) navigate(ROUTES.TILE)
  }

  if (!router) {
    return (
      <>
        <header className="screen-header">
          <h1>Телеметрия</h1>
        </header>
        <main className="screen-scroll">{error && <Alert variant="danger">{error}</Alert>}</main>
      </>
    )
  }

  const expanded = expandedId === router.id_routers
  const isMine = isAuthenticated && router.creator === username

  return (
    <>
      <header className="screen-header">
        <h1>Телеметрия</h1>
      </header>

      <div className="feed-screen">
        <div className="feed-card">
          <div className="feed-media">
            <img
              className="feed-img"
              src={toProxyUrl(router.image_url) || DEFAULT_IMAGE}
              alt={router.title}
              onError={onImageError}
            />
            <video
              key={router.id_routers}
              src={toProxyUrl(router.video_url) || DEFAULT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              onError={onVideoError}
            />
          </div>
          <div className="feed-gradient" />

          <div className="feed-bottom">
            <div className="feed-side">
              <div className="stat">
                <span className="stat-label">Частота</span>
                <span className="stat-value">{router.band || `${router.frequency ?? '—'} ГГц`}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Макс. скорость</span>
                <span className="stat-value">{router.max_speed ?? '—'} Мбит/с</span>
              </div>
              <div className="feed-actions">
                <Button className="btn-next" title="Следующий роутер" disabled={loading} onClick={handleNext}>
                  ➡️
                </Button>
                <button
                  type="button"
                  className={`like-btn ${router.is_liked ? 'like-btn-active' : ''}`}
                  disabled={!isAuthenticated || loading}
                  title={isAuthenticated ? (router.is_liked ? 'Убрать лайк' : 'Поставить лайк') : 'Лайк доступен после входа'}
                  onClick={handleLike}
                >
                  ♥ {router.like_count ?? 0}
                </button>
                {isMine && (
                  <Button className="btn-delete" title="Удалить" disabled={loading} onClick={handleDelete}>
                    🗑️
                  </Button>
                )}
              </div>
            </div>

            <div className="feed-info">
              <h2 className="feed-title">{router.title}</h2>
              <p className="feed-standard">{router.standard || 'Wi-Fi'}</p>
              <p className={`feed-desc-text ${expanded ? 'feed-desc-open' : ''}`}>{router.description}</p>
              <button
                type="button"
                className="desc-toggle"
                onClick={() => setExpandedId(expanded ? undefined : router.id_routers)}
              >
                {expanded ? 'Меньше' : 'Ещё'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
