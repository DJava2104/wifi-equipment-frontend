import { isAxiosError } from 'axios'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../api'
import { ROUTES } from '../Routes'
import { setUser } from '../slices/userSlice'
import { useAppDispatch } from '../store'
import './LoginPage.css'

interface AuthResponse {
  user: { id_user: number; username: string }
}

// Авторизация: только axios (без кодогенерации и thunk).
// Ответ сервера вручную передаётся в Redux через dispatch(setUser(...)).
export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toForm = () => new URLSearchParams(formData)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.username || !formData.password) return
    setLoading(true)
    setError(null)
    setInfo(null)
    try {
      // сервер создаёт сессию в Redis и ставит HttpOnly-куку sessionId
      const response = await authClient.post<AuthResponse>('/login', toForm())
      dispatch(setUser(response.data.user))
      navigate(ROUTES.TILE)
    } catch (err) {
      setError(isAxiosError(err) && err.response?.status === 401 ? 'Неверный логин или пароль' : 'Сервер недоступен')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!formData.username || !formData.password) return
    setLoading(true)
    setError(null)
    setInfo(null)
    try {
      await authClient.post('/register', toForm())
      setInfo('Пользователь создан, теперь нажмите «Войти»')
    } catch (err) {
      setError(isAxiosError(err) && err.response?.status === 409 ? 'Логин уже занят' : 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="screen-header">
        <h1>Вход</h1>
      </header>

      <main className="screen-scroll">
        <Form className="login-form" onSubmit={handleLogin}>
          {error && <Alert variant="danger">{error}</Alert>}
          {info && <Alert variant="success">{info}</Alert>}
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </Form.Group>
          <Button type="submit" className="login-btn" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Войти'}
          </Button>
          <Button type="button" variant="link" className="register-btn" disabled={loading} onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </Form>
      </main>
    </>
  )
}
