'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'estudiante' | 'admin'>('estudiante') // Estado para el Rol
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setExito(false)

    // Guardamos el email, password y el ROL en Supabase Auth
    const { data, error: registerError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role // Guardamos 'estudiante' o 'admin'
        }
      }
    })

    if (registerError) {
      setError(registerError.message)
      return
    }

    if (data.user) {
      setExito(true)
      setTimeout(() => {
        // Redirigir según el rol seleccionado
        if (role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
      <form onSubmit={handleRegister} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Crear Cuenta</h2>
        
        {error && (
          <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {exito && (
          <div className="p-3 bg-emerald-900/30 border border-emerald-800/50 rounded-xl text-emerald-400 text-sm text-center">
            ¡Cuenta creada con éxito como {role.toUpperCase()}! Redirigiendo...
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
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl text-sm focus:border-blue-500 focus:outline-none" 
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
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl text-sm focus:border-blue-500 focus:outline-none" 
              placeholder="••••••••"
            />
          </div>

          {/* SELECTOR DE ROL (REQUISITO EXIGIDO) */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Tipo de Rol / Usuario</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'estudiante' | 'admin')}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl text-sm focus:border-blue-500 focus:outline-none font-medium"
            >
              <option value="estudiante">Estudiante / Usuario General</option>
              <option value="admin">Administrador / Docente</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20">
          Registrarse
        </button>
        
        <p className="text-xs text-center text-slate-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </form>
    </main>
  )
}