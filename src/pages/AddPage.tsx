import { useEffect, useState, type FormEvent } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { DEFAULT_IMAGE, onImageError } from '../modules/defaults'
import { toProxyUrl } from '../modules/media'
import { ROUTES } from '../Routes'
import { createRouterDraft, getRouterDraft, publishRouterDraft } from '../slices/draftSlice'
import { useAppDispatch, useAppSelector } from '../store'
import './AddPage.css'

// Добавление роутера, как в лаб. 2: шаг 1 — название, изображение и видео («Далее»),
// шаг 2 — параметры черновика и публикация.
export const AddPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const { draft, loading, error } = useAppSelector((state) => state.draft)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)

  const [frequency, setFrequency] = useState('')
  const [maxSpeed, setMaxSpeed] = useState('')
  const [standard, setStandard] = useState('')
  const [antennas, setAntennas] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isAuthenticated) dispatch(getRouterDraft())
  }, [dispatch, isAuthenticated])

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    if (!title || !image || !video) return
    dispatch(createRouterDraft({ title, image, video }))
  }

  const handlePublish = async (e: FormEvent) => {
    e.preventDefault()
    if (!draft) return
    const result = await dispatch(
      publishRouterDraft({
        idRouters: draft.id_routers,
        data: {
          description,
          frequency: Number(frequency),
          standard,
          max_speed: maxSpeed ? Number(maxSpeed) : null,
          antennas,
        },
      }),
    )
    if (publishRouterDraft.fulfilled.match(result)) navigate(`${ROUTES.FEED}/${result.payload.id_routers}`)
  }

  return (
    <>
      <header className="screen-header">
        <h1>Добавление</h1>
      </header>

      <main className="screen-scroll">
        {error && <Alert variant="danger">{error}</Alert>}

        {draft ? (
          <Form key="publish" className="add-form" onSubmit={handlePublish}>
            <div className="draft-preview">
              <img src={toProxyUrl(draft.image_url) || DEFAULT_IMAGE} alt={draft.title} onError={onImageError} />
              <div>
                <span className="draft-status">{draft.status}</span>
                <h2 className="draft-title">{draft.title}</h2>
              </div>
            </div>

            <p className="section-label">Параметры устройства</p>
            <Form.Group className="mb-2" controlId="frequency">
              <Form.Label>Частота, ГГц</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="5.0"
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="max_speed">
              <Form.Label>Макс. скорость, Мбит/с</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="1"
                value={maxSpeed}
                onChange={(e) => setMaxSpeed(e.target.value)}
                placeholder="2400"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="standard">
              <Form.Label>Стандарт</Form.Label>
              <Form.Control value={standard} onChange={(e) => setStandard(e.target.value)} placeholder="Wi-Fi 6 (802.11ax)" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="antennas">
              <Form.Label>Антенны</Form.Label>
              <Form.Control value={antennas} onChange={(e) => setAntennas(e.target.value)} placeholder="4 антенны" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание"
                required
              />
            </Form.Group>
            <Button type="submit" className="add-btn" disabled={loading}>
              Опубликовать
            </Button>
          </Form>
        ) : (
          <Form key="create" className="add-form" onSubmit={handleCreate}>
            <p className="section-label">Медиа</p>
            <Form.Group className="mb-2" controlId="image">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] ?? null)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="video">
              <Form.Label>Видео</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) => setVideo((e.target as HTMLInputElement).files?.[0] ?? null)}
                required
              />
            </Form.Group>

            <p className="section-label">Параметры устройства</p>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Название</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название устройства" required />
            </Form.Group>
            <Button type="submit" className="add-btn" disabled={loading}>
              Далее
            </Button>
          </Form>
        )}
      </main>
    </>
  )
}
