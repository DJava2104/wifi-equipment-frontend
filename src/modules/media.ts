// Адреса файлов из MinIO (http://localhost:9000/<bucket>/<file>) переводятся
// на второй маршрут прокси: /minio/<bucket>/<file>.
const MINIO_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1):9000/

export const toProxyUrl = (url?: string | null) => (url ? url.replace(MINIO_ORIGIN, '/minio') : '')
