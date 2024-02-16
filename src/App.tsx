import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Sidebar } from './components/Sidebar';

import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
