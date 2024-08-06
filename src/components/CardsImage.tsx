import React, { useContext } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

import { ImageContext } from '../context/ImageContext'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

interface CardImage {
  ImageUrl: string
  alt: string
  width: number
  height: number
  tag: string
  id: string
}

export function CardImage({
  ImageUrl,
  alt,
  tag,
  width,
  height,
  id,
}: CardImage) {
  const navigate = useNavigate()
  const { favorites, addFavorite, removeFavorite } = useContext(ImageContext)
  const isFavorite = favorites.some((image) => image.id === id)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(id)
    } else {
      addFavorite({
        id,
        width,
        height,
        author: tag,
        url: ImageUrl,
        download_url: ImageUrl,
      })
    }
  }

  const handleClick = () => {
    navigate(`/photo/${id}`)
  }
  return (
    <Card className="col-span-2 h-full w-full ">
      <CardContent className="w-full h-full space-y-3">
        <img
          onClick={handleClick}
          className="w-full h-[300px] border rounded-md cursor-pointer hover:scale-95 duration-500"
          src={ImageUrl}
          alt={alt}
        />
        <CardFooter className="space-y-3 flex flex-col">
          <div className="flex gap-1 text-sm font-light text-emerald-900">
            <span className="">Width: {width}</span>
            <span>X</span>
            <span className="">Height: {height}</span>
          </div>
          <span className="text-emerald-50 font-light bg-emerald-900 px-2 py-3 rounded-md">
            {tag}
          </span>

          <Button variant="primary" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <MdFavorite className="text-red-500" size={24} />
            ) : (
              <MdFavoriteBorder className="text-gray-500" size={24} />
            )}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
