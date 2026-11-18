export const ROUTES = {
  FEED: '/feed',
  ADD: '/add',
  TILE: '/',
  LOGIN: '/login',
}
export type RouteKeyType = keyof typeof ROUTES | 'LOGOUT'
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  FEED: 'Лента',
  ADD: 'Добавление',
  TILE: 'Плитка',
  LOGIN: 'Вход',
  LOGOUT: 'Выход',
}
