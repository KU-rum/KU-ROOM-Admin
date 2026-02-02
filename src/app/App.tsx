import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { PlaceContentPage } from '@/pages/place-content';
import { PlaceImagePage } from '@/pages/place-image';
import { PlaceSubnamePage } from '@/pages/place-subname';
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
