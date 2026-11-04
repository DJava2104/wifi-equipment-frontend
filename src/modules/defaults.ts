import type { SyntheticEvent } from 'react'

export const DEFAULT_IMAGE = '/DefaultImage.svg'
export const DEFAULT_VIDEO = '/DefaultVideo.mp4'

export const onImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget
  if (!img.src.endsWith(DEFAULT_IMAGE)) img.src = DEFAULT_IMAGE
}

export const onVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
  const video = event.currentTarget
  if (!video.src.endsWith(DEFAULT_VIDEO)) video.src = DEFAULT_VIDEO
}
