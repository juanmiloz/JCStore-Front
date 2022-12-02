import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSide from './components/SignInSide';
import SignUp from './components/SingUp';
import JCStore from './components/JCStore';
import AddItem from './components/AddItem';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Orders from './components/Orders';
import NewOrder from './components/NewOrder';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInSide />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/JCStore/*' element={<JCStore />}>
          <Route path='AddItem' element={<AddItem />} />
          <Route path='Products' element={<Products />} />
          <Route path='MyOrders' element={<Orders />} />
          <Route path='NewOrder' element={<NewOrder />}/>
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
