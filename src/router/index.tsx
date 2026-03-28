import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import HakkimizdaPage from '../pages/HakkimizdaPage'
import HizmetlerPage from '../pages/HizmetlerPage'
import UrunlerPage from '../pages/UrunlerPage'
import GaleriPage from '../pages/GaleriPage'
import IletisimPage from '../pages/IletisimPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/hakkimizda', element: <HakkimizdaPage /> },
      { path: '/hizmetler', element: <HizmetlerPage /> },
      { path: '/urunler', element: <UrunlerPage /> },
      { path: '/galeri', element: <GaleriPage /> },
      { path: '/iletisim', element: <IletisimPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
