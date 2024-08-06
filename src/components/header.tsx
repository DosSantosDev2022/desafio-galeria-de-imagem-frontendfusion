import React, { useState, useContext } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import { ComponentInput, InputIcon, InputRoot } from './ui/input'
import { CiSearch } from 'react-icons/ci'
import { ImageContext } from '../context/ImageContext'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const { searchImages } = useContext(ImageContext)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    searchImages(term)
  }

  const links = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Categorias',
      url: '/categorias',
    },
    {
      name: 'Favoritos',
      url: '/favoritos',
    },
  ]

  return (
    <header className="w-full h-20 bg-emerald-50 flex items-center justify-between px-28 py-4">
      <div className="flex w-full items-center">
        <MdAddAPhoto size={50} className="text-emerald-950" />
        <nav className="w-full">
          <ul className="flex items-center justify-center gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <InputRoot className="">
        <InputIcon>
          <CiSearch className="text-emerald-50" size={30} />
        </InputIcon>
        <ComponentInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Busque suas imagens"
        />
      </InputRoot>
    </header>
  )
}
