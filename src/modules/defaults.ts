import type { SyntheticEvent } from 'react'

// Изображение и видео по умолчанию лежат в public/ самого проекта
export const DEFAULT_IMAGE = '/DefaultImage.svg'
export const DEFAULT_VIDEO = '/DefaultVideo.mp4'

// Если файл по url недоступен (например, MinIO выключен) — подменяем на файл по умолчанию
export const onImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget
  if (!img.src.endsWith(DEFAULT_IMAGE)) img.src = DEFAULT_IMAGE
}

export const onVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
  const video = event.currentTarget
  if (!video.src.endsWith(DEFAULT_VIDEO)) video.src = DEFAULT_VIDEO
}
