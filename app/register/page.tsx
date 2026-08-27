'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setExito(false)

    const { data, error: registerError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (registerError) {
      setError(registerError.message)
      return
    }

    if (data.user) {
      setExito(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <form onSubmit={handleRegister} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Crear Cuenta</h2>
        
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl">
            <p className="text-red-400 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        {exito && (
          <div className="p-3 bg-emerald-900/30 border border-emerald-800/50 rounded-xl">
            <p className="text-emerald-400 text-sm text-center font-medium">¡Cuenta creada con éxito! Redirigiendo...</p>
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
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" 
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
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" 
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20">
          Registrarse
        </button>
        
        <p className="text-xs text-center text-slate-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline">
            Inicia Sesión
          </Link>
        </p>
      </form>
    </main>
  )
}