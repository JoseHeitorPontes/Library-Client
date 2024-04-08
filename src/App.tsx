import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { NewUser } from './pages/NewUser';
import { ForgotPassword } from './pages/ForgotPassword';
import { Categories } from './pages/Categories';

import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/novo-usuario" element={<NewUser />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />

          <Route element={
              <AuthProvider>
                <Sidebar />

                <Outlet />
              </AuthProvider>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categorias" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
