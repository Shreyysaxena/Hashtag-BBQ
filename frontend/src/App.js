function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrderTypePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </div>
  );
}
