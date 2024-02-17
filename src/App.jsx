import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Examen from './pages/Examen';
import Admin from './pages/Admin';
// import Home from "./pages/Home"
import Alumno from './pages/Alumno';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Examen />} />
          <Route path="/examen" element={<Examen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/alumno" element={<Alumno />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
