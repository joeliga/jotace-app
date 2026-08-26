'use client'


import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Solicitud {
  id: string
  descripcion: string
  estado: string
  created_at: string
}

export default function Dashboard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setSolicitudes(data)
      setLoading(false)
    }

    cargarDatos()
  }, [router])

  const handleCrearSolicitud = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!descripcion || !user) return

    const { data, error } = await supabase.from('solicitudes').insert([
      {
        user_id: user.id,
        descripcion,
        estado: 'Pendiente'
      }
    ]).select()

    if (error) {
      alert('Error al crear la solicitud: ' + error.message)
      return
    }

    if (data) {
      setSolicitudes([data[0], ...solicitudes])
      setDescripcion('')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <p className="p-8 text-center text-slate-500">Cargando panel...</p>

  return (
    <main className="min-h-screen bg-slate-50 p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border">
        <div>
          <h1 className="text-xl font-bold text-blue-600">Panel de Cliente - JOTACE</h1>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200">
          Cerrar Sesión
        </button>
      </header>

      {/* Formulario de Creación (CRUD: Create) */}
      <section className="bg-white p-6 rounded-xl border mb-8 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Solicitar Servicio (Clases / Impresiones / Tareas)</h2>
        <form onSubmit={handleCrearSolicitud} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Descripción del pedido o materia</label>
            <textarea
              required
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Necesito impresión de 20 hojas a color para mañana / Requiero clase de refuerzo en álgebra..."
              className="w-full border p-3 rounded-lg mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">
            Enviar Solicitud
          </button>
        </form>
      </section>

      {/* Listado de Solicitudes (CRUD: Read) */}
      <section className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="font-bold text-lg mb-4">Mis Solicitudes Activas</h2>
        {solicitudes.length === 0 ? (
          <p className="text-sm text-slate-500">No tienes solicitudes registradas aún.</p>
        ) : (
          <div className="space-y-3">
            {solicitudes.map((s) => (
              <div key={s.id} className="p-4 border rounded-lg flex justify-between items-center bg-slate-50">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{s.descripcion}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(s.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    s.estado === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {s.estado}
                  </span>
                  <Link href={`/solicitud/${s.id}`} className="text-xs text-blue-600 underline">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}