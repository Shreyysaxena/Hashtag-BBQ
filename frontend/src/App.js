import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import OrderTypePage from './pages/OrderTypePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <div className="App">
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

export default App;