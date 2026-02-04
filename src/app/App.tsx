import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AddLocationPage } from '@/pages/add-location';
import { HomePage } from '@/pages/home';
import { PlaceContentPage } from '@/pages/place-content';
import { PlaceImagePage } from '@/pages/place-image';
import { PlaceSubnamePage } from '@/pages/place-subname';
import { UpdateLocationPage } from '@/pages/update-location';
import { Header } from '@/widgets/header';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/place-content" element={<PlaceContentPage />} />
            <Route path="/place-image" element={<PlaceImagePage />} />
            <Route path="/place-subname" element={<PlaceSubnamePage />} />
            <Route path="/add-location" element={<AddLocationPage />} />
            <Route path="/update-location" element={<UpdateLocationPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
