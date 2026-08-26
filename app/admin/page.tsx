export const dynamic = 'force-dynamic'

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Solicitud {
  id: string
  descripcion: string
  estado: string
  created_at: string
  user_id: string
}

export default function AdminDashboard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarTodasLasSolicitudes()
  }, [])

  const cargarTodasLasSolicitudes = async () => {
    const { data } = await supabase
      .from('solicitudes')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setSolicitudes(data)
    setLoading(false)
  }

  // Operación CRUD: UPDATE (Actualizar Estado)
  const handleCambiarEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await supabase
      .from('solicitudes')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (!error) {
      setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s))
    }
  }

  // Operación CRUD: DELETE (Eliminar Solicitud)
  const handleEliminar = async (id: string) => {
    const confirmar = confirm('¿Estás seguro de eliminar esta solicitud?')
    if (!confirmar) return

    const { error } = await supabase
      .from('solicitudes')
      .delete()
      .eq('id', id)

    if (!error) {
      setSolicitudes(solicitudes.filter(s => s.id !== id))
    }
  }

  if (loading) return <p className="p-8 text-center text-slate-500">Cargando panel de administración...</p>

  return (
    <main className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Panel de Administración - JOTACE</h1>
          <p className="text-xs text-slate-500">Gestión General de Pedidos y Tutorías</p>
        </div>
        <Link href="/dashboard" className="text-xs text-blue-600 underline">
          Ir a Vista Cliente
        </Link>
      </header>

      <section className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="font-bold text-lg mb-4">Todas las Solicitudes Recibidas</h2>
        {solicitudes.length === 0 ? (
          <p className="text-sm text-slate-500">No hay solicitudes registradas en el sistema.</p>
        ) : (
          <div className="space-y-4">
            {solicitudes.map((s) => (
              <div key={s.id} className="p-4 border rounded-lg bg-slate-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{s.descripcion}</p>
                  <p className="text-xs text-slate-400 mt-1">ID Usuario: {s.user_id} | Fecha: {new Date(s.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Selector de UPDATE de estado */}
                  <select
                    value={s.estado}
                    onChange={(e) => handleCambiarEstado(s.id, e.target.value)}
                    className="text-xs border p-2 rounded-lg bg-white font-semibold text-slate-700"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                  </select>

                  {/* Botón de DELETE */}
                  <button
                    onClick={() => handleEliminar(s.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
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