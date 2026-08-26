import { createClient } from '@supabase/supabase-js'

const DEFAULT_URL = 'https://uiguvdwflwwbckmtdu.supabase.co'
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdmd1dmR3Zmx3d3ZiY2ttdGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTY4MjgsImV4cCI6MjEwMzMzMjgyOH0.hBkfeuwNI7ntDtcZ9asgx0mg3DfuiGXVLNPesby-4Vo'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Garantiza siempre una URL HTTP/HTTPS válida para la compilación de Vercel
const supabaseUrl = (envUrl && envUrl.trim().startsWith('http')) ? envUrl.trim() : DEFAULT_URL
const supabaseAnonKey = (envKey && envKey.trim().length > 0) ? envKey.trim() : DEFAULT_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)