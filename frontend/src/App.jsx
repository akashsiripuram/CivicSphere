import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layouts/layout'
import {useDispatch, useSelector} from "react-redux";
import Login from './pages/Auth/Login';
import { useEffect } from 'react';
import { checkAuth } from './components/redux/authSlice';
import { Toaster, toast } from 'sonner';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );


  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
