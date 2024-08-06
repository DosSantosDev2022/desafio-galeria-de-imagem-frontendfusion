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
  favorites: Image[]
  addFavorite: (image: Image) => void
  removeFavorite: (imageId: string) => void
}

// Define um valor padrão para o contexto
const defaultValue: ImageContextProps = {
  images: [],
  filteredImages: [],
  loading: true,
  error: null,
  searchImages: () => {},
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
}

export const ImageContext = createContext<ImageContextProps>(defaultValue)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>([])
  const [filteredImages, setFilteredImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [favorites, setFavorites] = useState<Image[]>([])

  // Fetch images from API
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

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      try {
        const parsedFavorites: Image[] = JSON.parse(storedFavorites)
        setFavorites(parsedFavorites)
      } catch (error) {
        console.error('Error parsing favorites:', error)
      }
    }
  }, [])

  const addFavorite = (image: Image) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === image.id)
      if (isAlreadyFavorite) return prevFavorites // Evita adicionar duplicados

      const updatedFavorites = [...prevFavorites, image]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  const removeFavorite = (imageId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (image) => image.id !== imageId,
      )
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

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
      value={{
        images,
        filteredImages,
        loading,
        error,
        searchImages,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}
