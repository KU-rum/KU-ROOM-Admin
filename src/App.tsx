function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">KU-ROOM Admin</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">관리자 대시보드</h2>
        <p className="mt-2 text-gray-600">
          KU-ROOM 관리자 페이지에 오신 것을 환영합니다.
        </p>
      </main>
    </div>
  );
}

export default App;
