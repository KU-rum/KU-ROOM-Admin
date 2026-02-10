import { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { AddLocationPage } from '@/pages/add-location';
import { HomePage } from '@/pages/home';
import { Login } from '@/pages/login';
import { PlaceContentPage } from '@/pages/place-content';
import { PlaceImagePage } from '@/pages/place-image';
import { PlaceSubnamePage } from '@/pages/place-subname';
import { UpdateLocationPage } from '@/pages/update-location';
import { cn } from '@/shared';
import { Header } from '@/widgets/header';

function AppLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoginPage = pathname === '/login';
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token && !isLoginPage) {
      navigate('/login');
    }
  }, [pathname, token, isLoginPage, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Header />}

      <main
        className={
          (cn('mx-auto max-w-7xl sm:px-6 lg:px-8'),
          isLoginPage ? '' : 'px-4 py-8')
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/place-content" element={<PlaceContentPage />} />
          <Route path="/place-image" element={<PlaceImagePage />} />
          <Route path="/place-subname" element={<PlaceSubnamePage />} />
          <Route path="/add-location" element={<AddLocationPage />} />
          <Route path="/update-location" element={<UpdateLocationPage />} />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
