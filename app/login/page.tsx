'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError(loginError.message)
      return
    }

    if (data.user) {
      router.push('/dashboard')
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4 mt-12 font-sans">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-md w-full shadow-2xl space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Iniciar Sesión</h2>
        
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
            <p className="text-red-400 text-sm text-center font-medium">{error}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 mt-2">
          Ingresar
        </button>
        
        <p className="text-sm text-center text-slate-400 mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Regístrate
          </Link>
        </p>
      </form>
    </main>
  )
}