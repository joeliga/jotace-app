'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.user) {
      await supabase.from('profiles').insert([
        { id: data.user.id, nombre, rol: 'cliente' }
      ])
      router.push('/login')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl border max-w-md w-full shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 text-center">Registro en JOTACE</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="text-sm font-semibold">Nombre Completo</label>
          <input 
            type="text" 
            required 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border p-2 rounded-lg mt-1" 
          />
        </div>
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
          Registrarse
        </button>
        <p className="text-xs text-center text-slate-500">
          ¿Ya tienes cuenta? <Link href="/login" className="text-blue-600 underline">Inicia Sesión</Link>
        </p>
      </form>
    </main>
  )
}