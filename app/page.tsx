'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Pais {
  name: { common: string }
  cca2: string
}

export default function Home() {
  const [busqueda, setBusqueda] = useState('')
  const [paises, setPaises] = useState<Pais[]>([])
  const [cargandoApi, setCargandoApi] = useState(true)

  // API Externa: REST Countries (Requisito obligatorio)
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/america?fields=name,cca2')
      .then((res) => res.json())
      .then((data) => {
        setPaises(data.slice(0, 8))
        setCargandoApi(false)
      })
      .catch(() => setCargandoApi(false))
  }, [])

  const servicios = [
    { id: '1', titulo: 'Clases Dirigidas de Matemáticas', categoria: 'Clases', precio: '$10.00/hora', desc: 'Nivelación en álgebra, cálculo y física.' },
    { id: '2', titulo: 'Impresiones y Copias', categoria: 'Impresión', precio: '$0.10/hoja', desc: 'Impresión rápida y escaneo de alta calidad.' },
    { id: '3', titulo: 'Asesoría en Deberes', categoria: 'Deberes', precio: '$5.00/tarea', desc: 'Guía en la resolución de trabajos académicos.' }
  ]

  const serviciosFiltrados = servicios.filter(s => 
    s.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    s.categoria.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center py-6 border-b mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">JOTACE</h1>
          <p className="text-sm text-slate-500">Centro Académico y Papelería</p>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-blue-600 font-semibold hover:underline">Iniciar Sesión</Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Registrarse</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-10 text-center py-8 bg-blue-50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Soluciones Académicas e Impresiones</h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-6">Clases personalizadas de matemáticas, resolución guiada de deberes y servicio de papelería.</p>
        
        {/* Buscador interactivo (useState) */}
        <input
          type="text"
          placeholder="Buscar servicio (ej. Matemáticas, Impresiones)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      {/* Lista de Servicios */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {serviciosFiltrados.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{s.categoria}</span>
              <h4 className="font-bold text-lg mt-3 mb-1">{s.titulo}</h4>
              <p className="text-sm text-slate-600 mb-4">{s.desc}</p>
              <p className="font-semibold text-blue-600">{s.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección API Externa REST Countries */}
      <section className="bg-slate-100 p-6 rounded-xl border">
        <h3 className="text-md font-bold text-slate-700 mb-2">Cobertura Internacional de Estudiantes (Datos API)</h3>
        {cargandoApi ? (
          <p className="text-sm text-slate-500">Cargando datos desde la API externa...</p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            {paises.map((p) => (
              <span key={p.cca2} className="text-xs bg-white px-3 py-1 border rounded-md shadow-sm">
                📍 {p.name.common}
              </span>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}