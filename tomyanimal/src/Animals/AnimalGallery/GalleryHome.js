import React from 'react'
import GalleryGrid from './GalleryGrid'
import GalleryUpload from './GalleryUpload'

const GalleryHome = () => {
  return (
    <div>
        <GalleryUpload />
        <GalleryGrid />
    </div>
  )
}

export default GalleryHome