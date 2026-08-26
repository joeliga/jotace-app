import { createClient } from '@supabase/supabase-js'

// URL exacta recuperada de tu panel de Supabase
const SUPABASE_URL = 'https://uivguvdwflwwbvckmtdu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdmd1dmR3Zmx3d3ZiY2ttdGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTY4MjgsImV4cCI6MjEwMzMzMjgyOH0.hBkfeuwNI7ntDtcZ9asgx0mg3DfuiGXVLNPesby-4Vo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)