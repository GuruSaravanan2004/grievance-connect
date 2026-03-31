import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fvgqumjtildmncgzhhwi.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z3F1bWp0aWxkbW5jZ3poaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDExMjQsImV4cCI6MjA5MDAxNzEyNH0.qjm1pQh3EETMJKp_l5SQzZqau5yINPWC1EX176dGuoQ"

export const supabase = createClient(supabaseUrl, supabaseKey)