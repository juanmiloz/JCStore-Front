import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSide from './components/SignInSide';
import SignUp from './components/SingUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInSide/>} />
        <Route path='/SignUp' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
