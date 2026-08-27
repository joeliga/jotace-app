'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [mensajeExito, setMensajeExito] = useState(false)
  const [cursoSeleccionado, setCursoSeleccionado] = useState('Curso de Matemáticas')

  // Lista de cursos solicitados (sin botones que fallen, solo tarjetas informativas)
  const cursos = [
    { id: 1, titulo: 'Curso de Matemáticas', categoria: 'Nivelación', desc: 'Álgebra, trigonometría y cálculo diferencial desde cero.' },
    { id: 2, titulo: 'Curso de Excel', categoria: 'Herramientas', desc: 'Desde fórmulas básicas hasta tablas dinámicas y macros.' },
    { id: 3, titulo: 'Curso de Power BI', categoria: 'Datos', desc: 'Análisis de datos, modelado y creación de tableros profesionales.' },
    { id: 4, titulo: 'Curso de Ofimática', categoria: 'Productividad', desc: 'Dominio completo de Word, PowerPoint y herramientas de oficina.' },
    { id: 5, titulo: 'Curso de Ciberseguridad', categoria: 'Tecnología', desc: 'Fundamentos de seguridad informática y protección de datos.' },
  ]

  // Función para simular el envío de solicitud de forma limpia y visual
  const handleSubmitSolicitud = (e: React.FormEvent) => {
    e.preventDefault()
    setMensajeExito(true)
    setTimeout(() => {
      setMensajeExito(false)
    }, 4000)
  }

  // Cerrar sesión y redirigir al inicio (Home)
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

      {/* Sección Superior: Enviar Solicitud */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl mb-10">
        <h2 className="text-lg font-bold text-white mb-2">Enviar Solicitud de Inscripción</h2>
        <p className="text-xs text-slate-400 mb-6">Selecciona el curso de tu interés y envía tu postulación de forma directa.</p>

        {mensajeExito && (
          <div className="mb-4 p-4 bg-emerald-900/30 border border-emerald-800/50 rounded-xl text-emerald-400 text-sm font-medium text-center animate-pulse">
            ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.
          </div>
        )}

        <form onSubmit={handleSubmitSolicitud} className="flex flex-col md:flex-row gap-4 items-center">
          <select 
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="w-full md:flex-1 bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          >
            {cursos.map(c => (
              <option key={c.id} value={c.titulo}>{c.titulo}</option>
            ))}
          </select>

          <button 
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            Enviar Solicitud
          </button>
        </form>
      </section>

      {/* Sección Inferior: Lista de Cursos en Cuadros (Sin botones molestos) */}
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