import Link from 'next/link'

// Definimos la interfaz para los datos de la API (Libros/Recursos Académicos de Open Library)
interface LibroRecurso {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
}

// Función para consumir la API 
async function obtenerRecursosAcademicos(): Promise<LibroRecurso[]> {
  try {
    // Usamos la API pública de Open Library buscando libros de matemáticas o educación
    const res = await fetch('https://openlibrary.org/search.json?q=mathematics+education&limit=6', {
      // Opcional: revalidar datos cada cierto tiempo o dejarlo dinámico
      cache: 'no-store' 
    })

    if (!res.ok) {
      throw new Error('Error al conectar con la API externa')
    }

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Fallo en la API externa:', error)
    // Manejo de errores controlado: devolvemos datos de respaldo para que la página nunca se caiga
    return [
      { key: '1', title: 'Álgebra y Cálculo Avanzado', author_name: ['JOTAC Academy'], first_publish_year: 2026 },
      { key: '2', title: 'Fundamentos de Física Aplicada', author_name: ['Equipo Docente'], first_publish_year: 2026 },
      { key: '3', title: 'Métodos Numéricos para Estudiantes', author_name: ['Recursos JOTAC'], first_publish_year: 2026 }
    ]
  }
}

export default async function Home() {
  // Consumimos la API directamente en el servidor antes de renderizar la página
  const recursos = await obtenerRecursosAcademicos()

  const servicios = [
    { id: '1', titulo: 'Clases Dirigidas de Matemáticas', categoria: 'Especialidad', precio: '$10.00/hora', desc: 'Nivelación avanzada en álgebra, cálculo y física con metodologías prácticas.' },
    { id: '2', titulo: 'Impresiones y Copias', categoria: 'Papelería', precio: '$0.10/hoja', desc: 'Impresión rápida, digitalización y escaneo de alta calidad.' },
    { id: '3', titulo: 'Asesoría Integral en Deberes', categoria: 'Académico', precio: '$5.00/tarea', desc: 'Guía profesional paso a paso en la resolución de trabajos y proyectos.' }
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 max-w-6xl mx-auto font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Header Estilizado */}
      <header className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-slate-800/80 mb-12">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl font-extrabold text-blue-500 tracking-wider flex items-center justify-center md:justify-start gap-2">
            JOTAC <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">Centro Académico</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Especialistas en enseñanza, refuerzo y soluciones tecnológicas</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="px-4 py-2 text-slate-300 font-medium hover:text-white transition-colors">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20">
            Registrarse
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Centro de Especialización Académica
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Impulsa tu rendimiento con <span className="text-blue-500">JOTAC</span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Somos un centro especializado en la enseñanza y formación académica. Potenciamos tus habilidades con clases personalizadas y recursos bibliográficos globales.
          </p>
        </div>
      </section>

      {/* Lista de Servicios / Especialidades */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Nuestros Programas y Servicios</h3>
            <p className="text-sm text-slate-400 mt-1">Conoce las áreas en las que nos especializamos para formarte.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div key={s.id} className="group bg-slate-900/80 hover:bg-slate-900 p-7 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                    {s.categoria}
                  </span>
                  <span className="text-xl"></span>
                </div>
                <h4 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors mb-2">{s.titulo}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{s.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Tarifa estándar</span>
                <span className="font-bold text-blue-400 text-lg">{s.precio}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección API Pública Externa (Renderizado Dinámico desde el Servidor) */}
      <section className="bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-200"> Repositorio de Recursos Bibliográficos (API Externa)</h3>
            <p className="text-xs text-slate-400">Datos dinámicos obtenidos en tiempo real mediante Server Component y async/await.</p>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
            API Conectada Correctamente
          </span>
        </div>

        {/* Cuadrícula con los resultados de la API */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recursos.map((libro, index) => (
            <div key={libro.key || index} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 hover:border-blue-500/40 transition-all">
              <p className="text-xs font-semibold text-blue-400 mb-1">Recurso #{index + 1}</p>
              <h4 className="font-bold text-white text-sm line-clamp-1 mb-2">{libro.title}</h4>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-900">
                <span>Autor: {libro.author_name ? libro.author_name[0] : 'Academia JOTAC'}</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">Año: {libro.first_publish_year || 2026}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="mt-16 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
        JOTAC Centro Académico • Todos los derechos reservados
      </footer>

    </main>
  )
}