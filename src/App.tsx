import React, { useContext } from 'react'
import { CardImage } from './components/CardsImage'

import { ImageContext } from './context/ImageContext'

function App() {
  const { filteredImages } = useContext(ImageContext)
  return (
    <>
      <div className="w-full  lg:px-28 px-10 mt-10 space-y-10 ">
        <div className="w-full bg-zinc-50 rounded-md border px-3 py-4">
          <h1 className="text-emerald-950 font-bold text-3xl">
            Galeria de imagens
          </h1>
        </div>
        <div className="w-full h-full  grid grid-cols-6 gap-4 p-3">
          {filteredImages.map((image) => (
            <CardImage
              key={image.id}
              ImageUrl={image.download_url}
              alt={image.author}
              tag={image.author}
              width={image.width}
              height={image.height}
              id={image.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
