import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'
import { Button } from '../components/ui/button'

export default function PhotoDetails() {
  const { id } = useParams<{ id: string }>()
  const { images } = useContext(ImageContext)
  const image = images.find((img) => img.id === id)

  if (!image) return <p>Image not found</p>
  return (
    <div className="w-full container px-28 mt-10 space-y-10">
      <div className="w-full border-b px-3 py-4">
        <h1 className="text-emerald-950 font-bold text-2xl">
          Detalhes da foto
        </h1>
      </div>
      <div className="w-full h-full  px-2 py-3">
        <img
          className="w-full rounded-md"
          src={image.download_url}
          alt={image.author}
        />
        <div className="p-6 w-full ">
          <h2 className="text-3xl font-bold">{image.author}</h2>
          <div className="space-y-1 mt-4">
            <p className="text-base font-light">Width: {image.width}</p>
            <p className="text-base font-light">Height: {image.height}</p>
            <Button variant="primary" sizes="full" asChild>
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                Ver imagem no unsplash
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
