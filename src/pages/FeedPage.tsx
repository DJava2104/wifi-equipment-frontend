import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DEFAULT_IMAGE, DEFAULT_VIDEO, onImageError, onVideoError } from '../modules/defaults'
import { getRouterFeed, type Router } from '../modules/routersApi'
import { ROUTES } from '../Routes'
import './FeedPage.css'

export const FeedPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [router, setRouter] = useState<Router>()
  // id роутера, у которого раскрыто описание («Ещё»/«Меньше»); у следующего снова свёрнуто
  const [expandedId, setExpandedId] = useState<number>()

  // при смене id в адресе загружаем роутер: без id — первый опубликованный
  useEffect(() => {
    getRouterFeed(id).then(setRouter)
  }, [id])

  const handleNext = () => {
    if (!router) return
    getRouterFeed(router.id_routers, true).then((next) => navigate(`${ROUTES.FEED}/${next.id_routers}`))
  }

  if (!router) {
    return (
      <div className="feed-loader">
        <Spinner animation="border" />
      </div>
    )
  }

  const expanded = expandedId === router.id_routers

  return (
    <>
      <header className="screen-header">
        <h1>Телеметрия</h1>
      </header>

      <div className="feed-screen">
        <div className="feed-card">
          <div className="feed-media">
            <img className="feed-img" src={router.image_url || DEFAULT_IMAGE} alt={router.title} onError={onImageError} />
            <video
              key={router.id_routers}
              src={router.video_url || DEFAULT_VIDEO}
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
                <Button className="btn-next" title="Следующий роутер" onClick={handleNext}>
                  ➡️
                </Button>
                <span className={`like-btn ${router.is_liked ? 'like-btn-active' : ''}`}>
                  ♥ {router.like_count ?? 0}
                </span>
              </div>
            </div>

            <div className="feed-info">
              <h2 className="feed-title">{router.title}</h2>
              <p className="feed-standard">{router.standard || 'Wi-Fi'}</p>
              <p className={`feed-desc-text ${expanded ? 'feed-desc-open' : ''}`}>{router.description}</p>
              <button type="button" className="desc-toggle" onClick={() => setExpandedId(expanded ? undefined : router.id_routers)}>
                {expanded ? 'Меньше' : 'Ещё'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
