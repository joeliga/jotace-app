
'use client'


import { useState, useEffect, use } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function DetalleSolicitud({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [solicitud, setSolicitud] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarSolicitud = async () => {
      const { data } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('id', id)
        .single()

      if (data) setSolicitud(data)
      setLoading(false)
    }

    cargarSolicitud()
  }, [id])

  if (loading) return <p className="p-8 text-center text-slate-500">Cargando detalle...</p>
  if (!solicitud) return <p className="p-8 text-center text-slate-500">Solicitud no encontrada.</p>

  return (
    <main className="min-h-screen bg-slate-50 p-6 max-w-2xl mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600 underline mb-4 inline-block">
        ← Volver al Dashboard
      </Link>

      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="font-bold text-xl text-slate-800">Detalle de Solicitud</h1>
          <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
            {solicitud.estado}
          </span>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase">Código de Referencia</h2>
          <p className="text-sm font-mono text-slate-600 mt-1">{solicitud.id}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase">Detalle del Requerimiento</h2>
          <p className="text-slate-800 mt-1">{solicitud.descripcion}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase">Fecha de Registro</h2>
          <p className="text-sm text-slate-600 mt-1">{new Date(solicitud.created_at).toLocaleString()}</p>
        </div>
      </div>
    </main>
  )
}