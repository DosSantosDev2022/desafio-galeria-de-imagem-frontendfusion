import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout.tsx'
import CategoriasPage from './pages/categorias.tsx'
import FavoritosPage from './pages/favoritos.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
)
