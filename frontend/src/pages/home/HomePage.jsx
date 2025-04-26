import React from 'react'
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/Auth.store.js';
import HomeScreen from './HomeScreen';

export default function HomePage() {
  const {user}=useAuthStore();
  return (
  <>  
    {user ? <HomeScreen/> : <AuthScreen/>}
  
    
  </>
  )}
