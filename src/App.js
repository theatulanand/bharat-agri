import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Pages/Login/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './Pages/Home/Home';
import { Private } from './Components/Private';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Private><Home /></Private>} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
