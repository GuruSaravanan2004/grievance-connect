import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bzcdlybxkfgzldfuzqoe.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Y2RseWJ4a2ZnemxkZnV6cW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0Nzk3ODUsImV4cCI6MjA5MDA1NTc4NX0.elBEEZ5uyDhuNRkX_MmEeMslXE0J_-Od2rqAV9JxRKc"

export const supabase = createClient(supabaseUrl, supabaseKey)