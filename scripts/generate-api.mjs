import { resolve } from 'path'

import { generateApi } from 'swagger-typescript-api'

// Кодогенерация клиента веб-сервиса Wi-Fi роутеров из Swagger (FastAPI /openapi.json).
// Методы группируются по второму сегменту пути: api.routers, api.router, api.login ...
// Имя метода берётся из имени обработчика FastAPI: get_routers_api_routers_get -> getRouters.
generateApi({
  fileName: 'Api.ts',
  output: resolve(process.cwd(), './src/api'),
  url: 'http://localhost:8000/openapi.json',
  httpClientType: 'axios',
  moduleNameIndex: 1,
  hooks: {
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {
      const handler = (rawRouteInfo.operationId ?? '').split('_api_')[0]
      if (!handler) return routeNameInfo
      const name = handler.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase())
      return { ...routeNameInfo, usage: name, original: name }
    },
  },
})
