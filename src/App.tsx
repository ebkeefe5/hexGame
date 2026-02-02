import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OnePlayerPage from './pages/OnePlayerPage';
import TwoPlayerPage from './pages/TwoPlayerPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
     <Layout>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/oneplayer" element={<OnePlayerPage />} />
          <Route path="/twoplayer" element={<TwoPlayerPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
