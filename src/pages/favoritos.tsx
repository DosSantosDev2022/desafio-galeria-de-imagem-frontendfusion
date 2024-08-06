import React, { useContext } from 'react'

import { ImageContext } from '../context/ImageContext'
import { CardImage } from '../components/CardsImage'

export default function FavoritosPage() {
  const { favorites, loading, error } = useContext(ImageContext)
  console.log(favorites)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="w-full container px-28 mt-10 space-y-10">
      <div className="w-full border px-3 py-4">
        <h1 className="text-emerald-950 font-bold text-2xl">Favoritos</h1>
      </div>
      <div className="w-full h-full border grid grid-cols-6 gap-4 p-3">
        {favorites.length === 0 ? (
          <p>Nenhuma imagem favoritada</p>
        ) : (
          favorites.map((image) => (
            <CardImage
              key={image.id}
              ImageUrl={image.download_url}
              alt={image.author}
              tag={image.author}
              width={image.width}
              height={image.height}
              id={image.id}
            />
          ))
        )}
      </div>
    </div>
  )
}
