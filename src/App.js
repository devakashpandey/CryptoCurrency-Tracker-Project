import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <div className='main-div'>
      <ToastContainer position='top-center'/>
     <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
      </Routes>
    </div>
    </>
  );
}

export default App;