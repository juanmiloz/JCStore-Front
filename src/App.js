import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSide from './components/SignInSide';
import SignUp from './components/SingUp';
import Album from './components/Album';
import AddItem from './components/AddItem';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInSide/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Test' element={<Album/>} />
        <Route path='/AddItem' element={<AddItem/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
