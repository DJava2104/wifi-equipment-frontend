# Wi-Fi Routers — фронтенд (лабораторная работа №5)

SPA на **React + TypeScript + Vite** для гостя: просмотр каталога Wi-Fi роутеров. Повторяет две страницы из лабораторной №1 — **ленту** и **плитку** — в том же стиле (фиолетовый `#4F46E5`, розовый hover `#FFE4EC`, корпус «телефона» 9:16).

Бэкенд в этой лабораторной **не используется**: карточки берутся только из mock-коллекции, а изображение и видео по умолчанию лежат в самом проекте (`public/`). Веб-сервис FastAPI из репозитория [wifi-equipment](https://github.com/DJava2104/wifi-equipment) будет подключён в следующей лабораторной.

## Технологии

| Пакет | Версия | Зачем |
|---|---|---|
| react, react-dom | 19 | компоненты и состояние |
| typescript | 7 | типы `Router`, props компонентов |
| vite + @vitejs/plugin-react | 8 / 6 | сборка, dev-сервер на порту 3000 |
| react-router-dom | 7 | маршруты `/` и `/feed/:id?` |
| react-bootstrap, bootstrap | 2.10 / 5.3 | `Card`, `Row`/`Col`, `Form.Range`, `Button`, `Spinner` |

Redux и React Context не используются.

## Запуск

```bash
npm install
npm run dev
```

Приложение: <http://localhost:3000>. Production-сборка: `npm run build`.

Для работы не нужны ни бэкенд, ни MinIO, ни база данных. Данные — mock-коллекция `src/modules/mock.ts`, функции `getRouters` и `getRouterFeed` в `src/modules/routersApi.ts` фильтруют её так же, как это делает веб-сервис. Во вкладке Network видны только загрузки страниц, скриптов и двух файлов из `public/`: `DefaultImage.svg` и `DefaultVideo.mp4`.

## Страницы

Приложение отображается как экран телефона. Снизу на всех страницах — панель навигации из 4 пунктов.

### Нижняя панель навигации (`TabBar`)

| Пункт | Состояние | Действие |
|---|---|---|
| 📱 Лента | доступен | открывает ленту с первой карточки текущей плитки (`/feed/{id}`), если плитка ещё не загружена — `/feed` |
| ➕ Добавление | недоступен (серый) | будет доступен создателю после входа |
| 📒 Плитка | доступен | открывает плитку `/` |
| 👤 Вход | недоступен (серый) | будет в следующей лабораторной |

Активный пункт подсвечен цветом `#4F46E5`.

### Плитка — `/` (`TilePage`)

Список опубликованных роутеров в 2 столбца.

- **Фильтр по частоте** (`FrequencyFilter`):
  - ползунок **«от … ГГц»** — минимальная частота, 2.4–6 ГГц, шаг 0.1;
  - ползунок **«до … ГГц»** — максимальная частота;
  - кнопка **«По частоте»** — применяет фильтр: значения записываются в адрес (`/?freq_min=2.4&freq_max=5`) и mock-коллекция фильтруется по частоте (`getRouters`). Фильтр сохраняется после поиска и при возврате на страницу; на время загрузки кнопка неактивна.
- **«Найдено: N»** — количество найденных роутеров.
- **Карточка роутера** (`RouterCard`): изображение, название, стандарт Wi-Fi, диапазон и антенны, макс. скорость, количество лайков ♥. Нажатие на карточку открывает ленту с этого роутера `/feed/{id}`.
- Если ничего не найдено — надпись «Оборудование не найдено».

### Лента — `/feed/:id?` (`FeedPage`)

Один роутер на весь экран: видео в вертикальной развёртке проигрывается автоматически (без звука, по кругу), поверх видео — информация.

- Справа:
  - **Частота** — диапазон роутера;
  - **Макс. скорость** — Мбит/с;
  - кнопка **➡️ «Следующий»** — переход к следующему роутеру коллекции по кругу (`getRouterFeed(id, true)`);
  - **♥ N** — количество лайков (у гостя лайк не ставится).
- Внизу: название, стандарт Wi-Fi и описание в 2 строки, кнопка **«Ещё» / «Меньше»** раскрывает и сворачивает описание.
- Без `id` (из панели навигации) открывается первый роутер коллекции.

## Изображение и видео по умолчанию

Файлы лежат в самом проекте: `public/DefaultImage.svg` и `public/DefaultVideo.mp4` (`src/modules/defaults.ts`). Они показываются:

- если поле `image_url` / `video_url` пустое — `src={router.image_url || DEFAULT_IMAGE}`;
- если файл по ссылке не загрузился — обработчики `onImageError` / `onVideoError` подменяют `src` на файл по умолчанию.

В mock-коллекции поля `image_url` и `video_url` пустые у всех роутеров, поэтому на плитке у всех карточек одно изображение по умолчанию, а в ленте — одно видео по умолчанию.

## Структура

```text
public/
  DefaultImage.svg, DefaultVideo.mp4   изображение и видео по умолчанию
src/
  main.tsx              точка входа, подключение bootstrap.min.css
  App.tsx               BrowserRouter и маршруты
  Routes.tsx            ROUTES и ROUTE_LABELS
  AppLayout.tsx         корпус телефона, <Outlet context>, TabBar
  MobileApp.css         общие стили (цвета из лаб. 1)
  components/
    RouterCard.tsx      карточка роутера (react-bootstrap Card)
    FrequencyFilter.tsx фильтр по частоте (Form.Range ×2 + Button)
    TabBar.tsx          нижняя панель из 4 пунктов
  modules/
    routersApi.ts       тип Router, getRouters, getRouterFeed (данные из mock)
    mock.ts             ROUTERS_MOCK — mock-коллекция роутеров
    defaults.ts         DEFAULT_IMAGE, DEFAULT_VIDEO, onImageError, onVideoError
  pages/
    TilePage.tsx        плитка
    FeedPage.tsx        лента
```

## Компоненты и props

| Компонент | Props | Назначение |
|---|---|---|
| `FrequencyFilter` | `freqMin`, `freqMax`, `setFreqMin`, `setFreqMax`, `onSubmit`, `loading?`, `buttonTitle?` | управляемые ползунки: значения хранит страница, компонент вызывает сеттеры и `onSubmit` |
| `RouterCard` | `router: Router`, `onClick(id)` | отображение карточки, клик передаёт `id_routers` наверх |
| `TabBar` | `routers: Router[]` | по первому роутеру из плитки строит ссылку «Лента» |

## Хуки

| Хук | Где | Для чего |
|---|---|---|
| `useState` | `AppLayout`, `TilePage`, `FeedPage` | список роутеров, значения ползунков, загруженный фильтр, текущий роутер ленты, раскрытое описание |
| `useEffect` | `TilePage`, `FeedPage` | загрузка списка при смене фильтра в адресе; загрузка роутера при смене `id` |
| `useSearchParams` | `TilePage` | фильтр `freq_min`/`freq_max` в адресе страницы |
| `useParams` | `FeedPage` | `id` роутера из `/feed/:id?` |
| `useNavigate` | `TilePage`, `FeedPage`, `TabBar` | переходы по карточке, «Следующий», пунктам панели |
| `useLocation` | `TabBar` | подсветка активного пункта |
| `useOutletContext` | `TilePage` | передача загруженного списка в `AppLayout` для пункта «Лента» |

## Mock-коллекция

`src/modules/mock.ts` — 6 опубликованных роутеров с полями как в ответах веб-сервиса (`id_routers`, `title`, `standard`, `max_speed`, `band`, `antennas`, `frequency`, `image_url`, `video_url`, `description`, `like_count`, `is_liked`, `is_creator`). Аналоги методов будущего API:

| Функция | Аналог метода веб-сервиса | Где |
|---|---|---|
| `getRouters(freqMin, freqMax)` | `GET /api/routers?freq_min=&freq_max=` | плитка, фильтр по частоте |
| `getRouterFeed(id, next)` | `GET /api/router?id_routers=&next=` | лента: без `id` — первый, с `id` — указанный, `next=true` — следующий |
