import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { useNavigate } from 'react-router-dom'

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

  const handleClick = () => {
    navigate(`/photo/${id}`)
  }
  return (
    <Card
      className="col-span-2 h-full w-full cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="w-full h-full space-y-3">
        <img
          className="w-full h-[300px] border rounded-md"
          src={ImageUrl}
          alt={alt}
        />
        <CardFooter className="space-y-3 flex flex-col">
          <div className="flex gap-1 text-sm font-light text-emerald-900">
            <span className="">Width: {width}</span>
            <span>X</span>
            <span className="">Height: {height}</span>
          </div>
          <span className="text-emerald-50 font-light bg-emerald-700 px-2 py-3 rounded-md">
            {tag}
          </span>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
