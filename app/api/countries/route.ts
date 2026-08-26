import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/region/america?fields=name,cca2')
    if (!res.ok) throw new Error('Error al obtener países')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json([{ name: { common: 'Ecuador' }, cca2: 'EC' }], { status: 200 })
  }
}