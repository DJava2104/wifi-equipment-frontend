import { Card } from 'react-bootstrap'
import { DEFAULT_IMAGE, onImageError } from '../modules/defaults'
import type { Router } from '../modules/routersApi'
import './RouterCard.css'

interface Props {
  router: Router
  onClick: (id: number) => void
}

// Карточка роутера на странице «Плитка»
export const RouterCard = ({ router, onClick }: Props) => (
  <Card className="router-card" onClick={() => onClick(router.id_routers)}>
    <Card.Img
      className="router-card-img"
      variant="top"
      src={router.image_url || DEFAULT_IMAGE}
      alt={router.title}
      onError={onImageError}
    />
    <Card.Body className="router-card-body">
      <Card.Title className="router-card-title">{router.title}</Card.Title>
      <Card.Text className="router-card-params">{router.standard || '—'}</Card.Text>
      <Card.Text className="router-card-params">
        {router.band || `${router.frequency ?? '—'} ГГц`} · {router.antennas || '—'}
      </Card.Text>
      <Card.Text className="router-card-speed">{router.max_speed ?? '—'} Мбит/с</Card.Text>
      <Card.Text className="router-card-likes">♥ {router.like_count ?? 0}</Card.Text>
    </Card.Body>
  </Card>
)
