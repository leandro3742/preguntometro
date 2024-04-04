import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './components/header';
import Examen from './pages/Examen';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Alumno from './pages/Alumno';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:client" element={<ProtectedRoutes />}>
            <Route index element={<Examen />} />
            <Route path="examen" element={<Examen />} />
            <Route path="admin" element={<Admin />} />
            <Route path="alumno" element={<Alumno />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
