import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { Image } from '../types/image'

// Define a interface para o contexto
interface ImageContextProps {
  images: Image[]
  filteredImages: Image[]
  loading: boolean
  error: Error | null
  searchImages: (term: string) => void
}

// Define um valor padrão para o contexto
const defaultValue: ImageContextProps = {
  images: [],
  filteredImages: [],
  loading: true,
  error: null,
  searchImages: () => {},
}

export const ImageContext = createContext<ImageContextProps>(defaultValue)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>([])
  const [filteredImages, setFilteredImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Image[]>(
          'https://picsum.photos/v2/list',
        )
        setImages(response.data)
        setFilteredImages(response.data) // Inicialmente, exibe todas as imagens
        setLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error)
        setError(error as Error)
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const searchImages = (term: string) => {
    if (!term) {
      setFilteredImages(images) // Quando o termo está vazio, exibe todas as imagens
    } else {
      const filtered = images.filter((image) =>
        image.author.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredImages(filtered)
    }
  }

  return (
    <ImageContext.Provider
      value={{ images, filteredImages, loading, error, searchImages }}
    >
      {children}
    </ImageContext.Provider>
  )
}
