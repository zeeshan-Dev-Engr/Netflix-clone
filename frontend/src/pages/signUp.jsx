import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/Auth.store.js';
import { Link } from 'react-router-dom'

export default function SignUp() {
    const {searchParams}= new URL(document.location)
    const emailvalue=searchParams.get('email')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(emailvalue || '');
    const [password, setPassword] = useState('');

    const {signup}= useAuthStore()

    const handlesignup = async (e) => {
        e.preventDefault();
        signup({username, email, password})
    }

  return (
    <div className=" hero-bg h-screen min-h-screen bg-black flex items-center justify-center px-4">
        <header className="absolute top-5 left-4 sm:left-12 md:left-16 lg:left-20">
        <Link to={"/"}>
        <img src="netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40" />
        </Link>
        </header>
        
    <div className="w-full max-w-md bg-black/60 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
      <form className="flex flex-col gap-4" onSubmit={handlesignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-3 rounded bg-zinc-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="p-3 rounded bg-zinc-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}    
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 rounded bg-zinc-800/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition-colors text-white font-bold py-3 rounded mt-2"
        >
          Sign Up
        </button>
      </form>
      <p className="text-gray-400 text-sm text-center mt-4">
        Already have an account? <a href="/login" className="text-red-500 hover:underline">Login</a>
      </p>
    </div>
  </div>
  )
}
