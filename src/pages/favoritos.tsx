import React, { useContext } from 'react'
import { ImageContext } from '../context/ImageContext'
import { CardImage } from '../components/CardsImage'
import { FaSpinner } from 'react-icons/fa'

export default function FavoritosPage() {
  const { favorites, loading, error } = useContext(ImageContext)

  if (loading)
    return (
      <div className="w-full h-full flex items-center mt-14 gap-3 justify-center">
        <p className="text-3xl font-bold text-emerald-800">Carregando</p>
        <FaSpinner size={30} className="text-emerald-700 animate-spin" />
      </div>
    )
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-lg font-medium text-red-800">
          Error: {error.message}
        </p>
      </div>
    )
  return (
    <div className="w-full  lg:px-28 px-10 mt-10 space-y-10 ">
      <div className="w-full bg-zinc-50 rounded-md border px-3 py-4">
        <h1 className="text-emerald-950 font-bold text-3xl">Favoritos</h1>
      </div>
      <div className="w-full h-full  grid grid-cols-6 gap-4 p-3">
        {favorites.length === 0 ? (
          <div className="w-full  flex items-center  gap-3 justify-center">
            <p className="text-emerald-700 font-bold text-xl text-center w-full ">
              Nenhuma imagem favoritada
            </p>
          </div>
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
