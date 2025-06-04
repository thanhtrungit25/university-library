"use client";

import config from '@/lib/config'
import { ImageKitProvider, IKVideo } from 'imagekitio-next'

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKVideo path={videoUrl} controls={true} className='w-full rounded-xl' />
    </ImageKitProvider>
  )
}

export default BookVideo
