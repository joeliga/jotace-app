import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dsayqhgpflghgvdfgrqo.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzYXlxaGdwZmxnaGd2ZGZncnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3ODU5NjgsImV4cCI6MjEwMzM2MTk2OH0.LW2JfnWxjhC1L_chF0TYC7v2NeZAm8BU32pHOMM_Fa4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)