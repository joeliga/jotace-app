'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Solicitud {
  id: string
  descripcion: string
  estado: string
  created_at: string
}

export default function Dashboard() {
  const router = useRouter()
  const [mensajeExito, setMensajeExito] = useState(false)
  const [cursoSeleccionado, setCursoSeleccionado] = useState('Curso de Matemáticas')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Lista de solicitudes enviadas por el usuario
  const [misSolicitudes, setMisSolicitudes] = useState<Solicitud[]>([])

  // Lista de cursos disponibles
  const cursos = [
    { id: 1, titulo: 'Curso de Matemáticas', categoria: 'Nivelación', desc: 'Álgebra, trigonometría y cálculo diferencial desde cero.' },
    { id: 2, titulo: 'Curso de Excel', categoria: 'Herramientas', desc: 'Desde fórmulas básicas hasta tablas dinámicas y macros.' },
    { id: 3, titulo: 'Curso de Power BI', categoria: 'Datos', desc: 'Análisis de datos, modelado y creación de tableros profesionales.' },
    { id: 4, titulo: 'Curso de Ofimática', categoria: 'Productividad', desc: 'Dominio completo de Word, PowerPoint y herramientas de oficina.' },
    { id: 5, titulo: 'Curso de Ciberseguridad', categoria: 'Tecnología', desc: 'Fundamentos de seguridad informática y protección de datos.' },
  ]

  // Cargar solicitudes al cargar la página
  useEffect(() => {
    cargarMisSolicitudes()
  }, [])

  const cargarMisSolicitudes = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setMisSolicitudes(data)
      }
    }
  }

  // Guardar nueva solicitud en Supabase
  const handleSubmitSolicitud = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        alert("Debes iniciar sesión para enviar una solicitud.")
        setIsSubmitting(false)
        return
    }

    const { data, error } = await supabase
      .from('solicitudes')
      .insert([
        { 
          descripcion: `Inscripción: ${cursoSeleccionado}`, 
          estado: 'Pendiente',
          user_id: user.id 
        }
      ])
      .select()

    if (error) {
      alert('Error al guardar la solicitud: ' + error.message)
    } else if (data) {
      setMisSolicitudes([data[0], ...misSolicitudes])
      setMensajeExito(true)
      setTimeout(() => setMensajeExito(false), 4000)
    }
    
    setIsSubmitting(false)
  }

  // NUEVA FUNCIÓN: Eliminar una solicitud enviada de la base de datos
  const handleEliminarSolicitud = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta solicitud de inscripción?')) return

    const { error } = await supabase
      .from('solicitudes')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error al eliminar la solicitud: ' + error.message)
    } else {
      // Actualizamos el estado para removerla de la vista
      setMisSolicitudes(misSolicitudes.filter(s => s.id !== id))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 max-w-5xl mx-auto font-sans">
      
      {/* Header del Dashboard */}
      <header className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-slate-800 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-500">Panel de Estudiante - JOTAC</h1>
          <p className="text-sm text-slate-400">Gestiona tus inscripciones y consulta la oferta académica.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-800/50 rounded-lg text-sm font-medium transition-colors">
          Cerrar Sesión
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        
        {/* Formulario de Inscripción */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit">
          <h2 className="text-lg font-bold text-white mb-2">Enviar Solicitud de Inscripción</h2>
          <p className="text-xs text-slate-400 mb-6">Selecciona el curso de tu interés y envía tu postulación.</p>

          {mensajeExito && (
            <div className="mb-4 p-4 bg-emerald-900/30 border border-emerald-800/50 rounded-xl text-emerald-400 text-sm font-medium text-center animate-pulse">
              ¡Solicitud guardada en base de datos!
            </div>
          )}

          <form onSubmit={handleSubmitSolicitud} className="flex flex-col gap-4">
            <select 
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
            >
              {cursos.map(c => (
                <option key={c.id} value={c.titulo}>{c.titulo}</option>
              ))}
            </select>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 font-semibold rounded-xl text-sm transition-all shadow-lg ${
                isSubmitting ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </section>

        {/* Historial de Solicitudes con Botón de Eliminar */}
        <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl h-fit max-h-[350px] overflow-y-auto">
           <h2 className="text-lg font-bold text-white mb-4">Mis Inscripciones</h2>
           {misSolicitudes.length === 0 ? (
             <p className="text-sm text-slate-500 text-center py-4">Aún no has solicitado ningún curso.</p>
           ) : (
             <div className="space-y-3">
               {misSolicitudes.map((s) => (
                 <div key={s.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center gap-2">
                   <div>
                     <p className="text-sm text-slate-200 font-medium">{s.descripcion}</p>
                     <p className="text-[10px] text-slate-500">{new Date(s.created_at).toLocaleDateString()}</p>
                   </div>
                   
                   <div className="flex items-center gap-2">
                     <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${
                        s.estado === 'Pendiente' ? 'bg-yellow-900/30 text-yellow-500 border-yellow-700/50' :
                        s.estado === 'En proceso' ? 'bg-blue-900/30 text-blue-400 border-blue-700/50' :
                        'bg-emerald-900/30 text-emerald-400 border-emerald-700/50'
                     }`}>
                       {s.estado}
                     </span>

                     {/* BOTÓN DE ELIMINAR */}
                     <button
                       onClick={() => handleEliminarSolicitud(s.id)}
                       title="Cancelar solicitud"
                       className="px-2 py-1 bg-red-900/30 hover:bg-red-800/50 text-red-400 border border-red-800/40 rounded text-xs transition-colors"
                     >
                       ✕
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </section>
      </div>

      {/* Cursos Disponibles */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">Cursos Disponibles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div 
              key={curso.id} 
              className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 inline-block mb-3">
                  {curso.categoria}
                </span>
                <h3 className="font-bold text-lg text-white mb-2">{curso.titulo}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{curso.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs font-medium text-slate-500 flex justify-between items-center">
                <span>Modalidad: Virtual / Presencial</span>
                <span className="text-emerald-400">Disponible</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}