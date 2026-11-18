import { Button, Card } from 'react-bootstrap'
import { DEFAULT_IMAGE, onImageError } from '../modules/defaults'
import { toProxyUrl } from '../modules/media'
import type { Router } from '../modules/routersApi'
import './RouterCard.css'

interface Props {
  router: Router
  onClick: (id: number) => void
  onDelete?: (id: number) => void
  disabled?: boolean
}

export const RouterCard = ({ router, onClick, onDelete, disabled }: Props) => (
  <Card className="router-card" onClick={() => onClick(router.id_routers)}>
    <Card.Img
      className="router-card-img"
      variant="top"
      src={toProxyUrl(router.image_url) || DEFAULT_IMAGE}
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
      <div className="router-card-footer">
        {/* в списке GET /api/routers счётчика лайков нет — он есть только в ленте */}
        <span className="router-card-likes">{router.like_count !== undefined ? `♥ ${router.like_count}` : ''}</span>
        {onDelete && (
          <Button
            className="router-card-delete"
            size="sm"
            variant="outline-danger"
            title="Удалить"
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation()
              onDelete(router.id_routers)
            }}
          >
            🗑️
          </Button>
        )}
      </div>
    </Card.Body>
  </Card>
)
