import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { Image } from '../types/image'

// Define a interface para o contexto
interface ImageContextProps {
  images: Image[]
  loading: boolean
  error: Error | null
}

// Define um valor padrão para o contexto
const defaultValue: ImageContextProps = {
  images: [],
  loading: true,
  error: null,
}

export const ImageContext = createContext<ImageContextProps>(defaultValue)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Image[]>(
          'https://picsum.photos/v2/list',
        )
        setImages(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error)
        setError(error as Error)
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <ImageContext.Provider value={{ images, loading, error }}>
      {children}
    </ImageContext.Provider>
  )
}
