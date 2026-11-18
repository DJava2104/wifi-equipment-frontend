import { ROUTERS_MOCK } from './mock'

// Карточка роутера во фронтенде. Совместима с типами из src/api/Api.ts
// (RouterListItemSchema, FeedItemSchema) и с mock-объектами.
export interface Router {
  id_routers: number
  title: string
  standard?: string | null
  max_speed?: number | null
  band?: string | null
  antennas?: string | null
  frequency?: number | null
  image_url?: string | null
  video_url?: string | null
  description?: string | null
  status?: string
  creator?: string
  like_count?: number
  is_liked?: number
  is_creator?: number
}

export const FREQ_MIN = 2.4
export const FREQ_MAX = 6

// mock-коллекция: используется гостем, когда веб-сервис недоступен
export const getRoutersMock = (freqMin = FREQ_MIN, freqMax = FREQ_MAX): Router[] =>
  ROUTERS_MOCK.filter(
    (item) => item.frequency != null && item.frequency >= freqMin && item.frequency <= freqMax,
  )

export const getRouterFeedMock = (id?: number | string, next = false): Router => {
  const index = Math.max(0, ROUTERS_MOCK.findIndex((item) => String(item.id_routers) === String(id)))
  return ROUTERS_MOCK[next ? (index + 1) % ROUTERS_MOCK.length : index]
}
