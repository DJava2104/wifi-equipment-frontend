# Wi-Fi Routers — фронтенд (лабораторная работа №6)

SPA на **React + TypeScript + Vite** для каталога Wi-Fi роутеров: интерфейс гостя и интерфейс пользователя. Страницы — **плитка**, **лента**, **добавление** и **вход** — в стиле лабораторной №1 (фиолетовый `#4F46E5`, розовый hover `#FFE4EC`, корпус «телефона» 9:16).

Карточки загружаются из веб-сервиса FastAPI [wifi-equipment](https://github.com/DJava2104/wifi-equipment) (ветка `lab4`). Состояние приложения хранится в **Redux Toolkit**, запросы к доменам услуг выполняются через **redux-thunk** и **сгенерированный из Swagger клиент axios**.

## Технологии

| Пакет | Версия | Зачем |
|---|---|---|
| react, react-dom | 19 | компоненты |
| typescript | 7 | типы, в том числе сгенерированные из Swagger |
| vite + @vitejs/plugin-react | 8 / 6 | сборка, dev-сервер на порту 3000, обратный прокси |
| react-router-dom | 7 | маршруты `/`, `/feed/:id?`, `/add`, `/login` |
| react-bootstrap, bootstrap | 2.10 / 5.3 | `Card`, `Form`, `Button`, `Spinner`, `Alert` |
| @reduxjs/toolkit, react-redux | 2 / 9 | store, слайсы, `createAsyncThunk` (redux-thunk подключён в `configureStore`) |
| axios | 1 | HTTP-клиент (сгенерированный `Api.ts` и авторизация) |
| swagger-typescript-api | 13 | кодогенерация `src/api/Api.ts` из `/openapi.json` |

## Запуск

1. Запустить веб-сервис (PostgreSQL, Redis, MinIO и FastAPI на `http://localhost:8000`) из репозитория бэкенда, ветка `lab4`.
2. Запустить фронтенд:

```bash
npm install
npm run dev
```

Приложение: <http://localhost:3000>. Production-сборка: `npm run build`.

Если веб-сервис не запущен, **гость** видит карточки из mock-коллекции (на плитке рядом с «Найдено» появляется метка `mock`).

## Обратный прокси (CORS)

SPA обращается только к своему origin `http://localhost:3000`, а dev-сервер Vite пересылает запросы дальше (`vite.config.ts`):

| Маршрут SPA | Куда проксируется | Что |
|---|---|---|
| `/api/...` | `http://localhost:8000/api/...` | AJAX-запросы к веб-сервису |
| `/minio/...` | `http://localhost:9000/...` | изображения и видео из MinIO (S3) |

Веб-сервис возвращает адреса файлов вида `http://localhost:9000/<bucket>/<file>`, функция `toProxyUrl` (`src/modules/media.ts`) переводит их на маршрут `/minio/<bucket>/<file>`. Кука сессии `sessionId` ставится на тот же origin, поэтому браузер отправляет её со всеми запросами `/api`.

## Кодогенерация

```bash
npm run generate-api
```

Скрипт `scripts/generate-api.mjs` скачивает `http://localhost:8000/openapi.json` и создаёт `src/api/Api.ts` (`httpClientType: 'axios'`). Методы сгруппированы по пути, имя метода берётся из имени обработчика FastAPI:

| Сгенерированный метод | Запрос | Thunk |
|---|---|---|
| `api.routers.getRouters` | `GET /api/routers?freq_min=&freq_max=` | `getRoutersList` |
| `api.router.getRouter` | `GET /api/router?id_routers=&next=` | `getRouterFeed` |
| `api.router.getDraft` | `GET /api/router/draft` | `getRouterDraft` |
| `api.router.createRouter` | `POST /api/router` (multipart) | `createRouterDraft` |
| `api.router.publishRouter` | `PUT /api/router/{id}` | `publishRouterDraft` |
| `api.router.deleteRouter` | `DELETE /api/router/{id}` | `deleteRouterItem` |
| `api.router.likeRouter` | `POST /api/router/{id}` | `likeRouterItem` |

Экземпляр клиента — `src/api/index.ts` (`new Api({ baseURL: '', withCredentials: true })`).

## Авторизация

Вход, регистрация и выход — **только axios** (`authClient` в `src/api/index.ts`), без кодогенерации и thunk. Ответ сервера вручную передаётся в Redux:

- `POST /api/login` → `dispatch(setUser(user))` — интерфейс пользователя: в меню появляется **«Выход»** с логином, становится доступно **«Добавление»**, лайки и удаление своих роутеров;
- `POST /api/logout` → `dispatch(resetUser())` — интерфейс гостя, фильтр по частоте сбрасывается (`extraReducers` в `routersSlice`).

Состояние Redux не сохраняется между перезагрузками: после **F5** приложение возвращается в состояние гостя, а HttpOnly-кука `sessionId` остаётся в браузере (вкладка Application → Cookies).

## Состояние Redux

| Слайс | Состояние | Действия |
|---|---|---|
| `user` | `id_user`, `username`, `isAuthenticated` | `setUser`, `resetUser` |
| `routers` | `freqMin`, `freqMax` (фильтр), `routers`, `loading`, `isMock`, `error` | `setFreqMin`, `setFreqMax`, thunk `getRoutersList`, `deleteRouterItem` |
| `feed` | `router` (текущая карточка ленты), `loading`, `error` | thunk `getRouterFeed`, `likeRouterItem` |
| `draft` | `draft` (черновик), `loading`, `error` | thunk `getRouterDraft`, `createRouterDraft`, `publishRouterDraft` |

Пока выполняется любой запрос (`loading` в слайсах), поверх экрана показывается анимация `Spinner`, которая блокирует кнопки пользователя (`AppLayout`).

## Страницы

| Страница | Маршрут | Гость | Пользователь |
|---|---|---|---|
| Плитка (`TilePage`) | `/` | список и фильтр по частоте | + кнопка 🗑️ на своих карточках (`is_creator = 1`) |
| Лента (`FeedPage`) | `/feed/:id?` | карточка, «Следующий», счётчик ♥ | + лайк / снятие лайка, удаление своего роутера |
| Добавление (`AddPage`) | `/add` | недоступно | шаг 1: название, изображение, видео → «Далее» (черновик); шаг 2: частота, скорость, стандарт, антенны, описание → «Опубликовать» |
| Вход (`LoginPage`) | `/login` | вход и регистрация | — (в меню «Выход») |

## Структура

```text
scripts/
  generate-api.mjs      кодогенерация клиента из Swagger
src/
  api/
    Api.ts              сгенерированный клиент (не редактировать вручную)
    index.ts            экземпляр api и authClient (axios)
  store/index.ts        configureStore, RootState, useAppDispatch, useAppSelector
  slices/               userSlice, routersSlice, feedSlice, draftSlice
  components/           RouterCard, FrequencyFilter, TabBar
  pages/                TilePage, FeedPage, AddPage, LoginPage
  modules/
    routersApi.ts       тип Router, mock-функции getRoutersMock, getRouterFeedMock
    mock.ts             ROUTERS_MOCK — mock-коллекция роутеров
    media.ts            toProxyUrl — адреса MinIO через прокси
    defaults.ts         изображение и видео по умолчанию
```
