import { createClient } from '@supabase/supabase-js';

// Obtener las credenciales desde las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Crear el cliente de Supabase
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);