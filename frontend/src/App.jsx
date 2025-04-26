// App.jsx
import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Login from './pages/Login';
import SignUp from './pages/signUp';
import { useAuthStore } from './store/Auth.store.js';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import WatchPage from './pages/WatchPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SearchHistoryPage from './pages/SearchHistoryPage.jsx';
import NotFoundPage from './pages/404.jsx';


function App() {
  const {user,ischeckingauth,authcheck}=useAuthStore();
  console.log("auth user is: ",user);
  useEffect(() => {
    authcheck();
  },[authcheck])

  if (ischeckingauth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={!user? <Login />:  <Navigate to={"/"}/>} />
      <Route path='/signup' element={!user? <SignUp/>: <Navigate to={"/"}/>} />
      <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
      <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
      <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
      <Route path='/*' element={<NotFoundPage />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
