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
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl border max-w-md w-full shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="text-sm font-semibold">Correo Electrónico</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg mt-1" 
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Contraseña</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-lg mt-1" 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
          Ingresar
        </button>
        <p className="text-xs text-center text-slate-500">
          ¿No tienes cuenta? <Link href="/register" className="text-blue-600 underline">Regístrate</Link>
        </p>
      </form>
    </main>
  )
}