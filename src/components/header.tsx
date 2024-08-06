import React, { useState, useContext } from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import { ComponentInput, InputIcon, InputRoot } from './ui/input'
import { CiSearch } from 'react-icons/ci'
import { ImageContext } from '../context/ImageContext'
import { Link } from 'react-router-dom'
import {
  DropDownContainer,
  DropDownContent,
  DropDownItem,
  DropDownList,
  DropDownProvider,
  DropDownTrigger,
} from './ui/dropdown'

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
      name: 'Favoritos',
      url: '/favoritos',
    },
  ]
  const dropdownLinks = [
    {
      label: 'Paisagens',
      url: '/paisagens',
    },
    {
      label: 'Tecnologias',
      url: '/tecnologias',
    },
    {
      label: 'outros',
      url: '/outros',
    },
  ]

  return (
    <header className="w-full lg:h-24 bg-zinc-50 flex flex-col gap-8 lg:flex-row items-center justify-between px-10 lg:px-28 py-4">
      <div className="flex w-full items-center">
        <MdAddAPhoto size={50} className="text-emerald-950" />
        <nav className="w-full flex justify-around items-center">
          <ul className="flex items-center justify-center gap-6">
            {links.map((link) => (
              <li
                className="text-emerald-900 font-normal hover:bg-emerald-600 px-2 py-2.5 rounded-md duration-500 hover:text-zinc-50"
                key={link.name}
              >
                <Link to={link.url}>{link.name}</Link>
              </li>
            ))}

            <>
              <DropDownProvider>
                <DropDownContainer>
                  <DropDownTrigger>Categorias</DropDownTrigger>
                  <DropDownContent>
                    <DropDownList>
                      {dropdownLinks.map((link) => (
                        <DropDownItem key={link.label}>
                          <Link className="w-full" to={link.url}>
                            {link.label}{' '}
                          </Link>
                        </DropDownItem>
                      ))}
                    </DropDownList>
                  </DropDownContent>
                </DropDownContainer>
              </DropDownProvider>
            </>
          </ul>
        </nav>
      </div>

      <InputRoot className="w-[426px] ">
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
