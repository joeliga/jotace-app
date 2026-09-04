'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Solicitud {
  id: string
  descripcion?: string
  nombre?: string
  cedula?: string
  carrera?: string
  estado: string
  created_at: string
  user_id?: string
}

export default function AdminDashboard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    verificarRolYCargar()
  }, [])

  const verificarRolYCargar = async () => {
    // 1. Obtener la sesión actual
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      router.push('/login')
      return
    }

    // 2. Extraer el rol guardado en los metadatos del usuario
    const role = session.user.user_metadata?.role || 'estudiante'
    setUserRole(role)

    // 3. Validación de permisos: Si NO es admin, redirigir a dashboard de estudiante
    if (role !== 'admin') {
      alert('Acceso denegado: Este panel requiere rol de Administrador/Docente.')
      router.push('/dashboard')
      return
    }

    // 4. Si es admin, cargar todas las solicitudes
    cargarTodasLasSolicitudes()
  }

  const cargarTodasLasSolicitudes = async () => {
    const { data, error } = await supabase
      .from('solicitudes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setSolicitudes(data)
    }
    setLoading(false)
  }

  // Operación CRUD: UPDATE (Cambiar estado)
  const handleCambiarEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await supabase
      .from('solicitudes')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (!error) {
      setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
    }
  }

  // Operación CRUD: DELETE (Eliminar registro)
  const handleEliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return

    const { error } = await supabase
      .from('solicitudes')
      .delete()
      .eq('id', id)

    if (!error) {
      setSolicitudes(solicitudes.filter(s => s.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Verificando permisos de administrador...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto font-sans">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">Panel de Administración</h1>
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-purple-300">
              Rol: {userRole.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500">Gestión General de Pedidos y Tutorías (Vista Privada Admin)</p>
        </div>
        <Link href="/dashboard" className="text-xs text-blue-600 hover:underline font-medium">
          Ir a Vista Estudiante
        </Link>
      </header>

      <section className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="font-bold text-lg mb-4 text-slate-800">Todas las Solicitudes Recibidas</h2>
        {solicitudes.length === 0 ? (
          <p className="text-sm text-slate-500">No hay solicitudes registradas en el sistema.</p>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((s) => (
              <div key={s.id} className="p-4 border rounded-lg bg-slate-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {s.descripcion || s.nombre || 'Solicitud sin descripción'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {s.user_id ? `ID Usuario: ${s.user_id} | ` : ''}
                    {s.carrera ? `Carrera: ${s.carrera} | ` : ''}
                    Fecha: {new Date(s.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={s.estado || 'Pendiente'}
                    onChange={(e) => handleCambiarEstado(s.id, e.target.value)}
                    className="text-xs border p-2 rounded-lg bg-white font-semibold text-slate-700"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                  </select>

                  <button
                    onClick={() => handleEliminar(s.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}