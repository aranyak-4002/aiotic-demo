import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, key)

export type Template = 'clinic' | 'real-estate' | 'interior-design' | 'interior-premium'

export interface DemoClient {
  id: string
  slug: string
  template: Template
  business_name: string
  maps_url: string | null
  data: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}
