import { ROUTERS_MOCK } from './mock'

// Роутер (услуга) — поля как в ответах веб-сервиса GET /api/routers и GET /api/router
export interface Router {
  id_routers: number
  title: string
  standard: string | null
  max_speed: number | null
  band: string | null
  antennas: string | null
  frequency: number | null
  image_url: string | null
  video_url: string | null
  description: string | null
  like_count?: number
  is_liked?: 0 | 1
  is_creator?: 0 | 1
}

export const FREQ_MIN = 2.4
export const FREQ_MAX = 6

// В лаб. 5 бэкенд не используется: данные берутся только из mock-коллекции.
// Функции асинхронные, как будущие запросы к API, — страницам не придётся меняться.

// Список роутеров с фильтром по частоте (аналог GET /api/routers?freq_min=&freq_max=)
export const getRouters = async (freqMin = FREQ_MIN, freqMax = FREQ_MAX): Promise<Router[]> =>
  ROUTERS_MOCK.filter(
    (item) => item.frequency !== null && item.frequency >= freqMin && item.frequency <= freqMax,
  )

// Лента (аналог GET /api/router?id_routers=&next=): без id — первый роутер,
// с id — указанный, next=true — следующий после него по кругу
export const getRouterFeed = async (id?: number | string, next = false): Promise<Router> => {
  const index = Math.max(0, ROUTERS_MOCK.findIndex((item) => String(item.id_routers) === String(id)))
  return ROUTERS_MOCK[next ? (index + 1) % ROUTERS_MOCK.length : index]
}
