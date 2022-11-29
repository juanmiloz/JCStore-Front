import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSide from './components/SignInSide';
import SignUp from './components/SingUp';
import Album from './components/Album';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInSide/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Test' element={<Album/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
