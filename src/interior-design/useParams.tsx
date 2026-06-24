import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ygubqwujuigodtjhemao.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_pU2u5bkVpcJtagQxu1VoKw_XKYrXSQC'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const DemoContext = createContext<any>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let clientKey = params.get('client')

    if (clientKey) {
      sessionStorage.setItem('aiotic_interior_client', clientKey)
    } else {
      clientKey = sessionStorage.getItem('aiotic_interior_client')
    }

    async function loadData() {
      let finalData: any = {}
      if (clientKey) {
        const { data: rows, error } = await supabase
          .from('demo_clients')
          .select('data')
          .eq('slug', clientKey)
          .eq('is_active', true)
          .limit(1)

        if (!error && rows && rows.length > 0) {
          finalData = rows[0].data
        } else {
          try {
            const res = await fetch(`/interior-data/${clientKey}.json`)
            if (res.ok) finalData = await res.json()
          } catch (e) {}
        }
      }

      const override = (key: string, paramKey: string) => {
        if (params.get(paramKey)) finalData[key] = params.get(paramKey)
      }
      override('name', 'firm')
      override('phone', 'phone')
      override('email', 'email')
      override('city', 'city')
      override('booking_url', 'cal')

      setData({
        firmName: finalData.name || 'Interio Design Studio',
        founderName: (finalData.team && finalData.team[0]?.name) || 'Priya Sharma',
        city: finalData.city || 'Mumbai',
        phone: finalData.phone || '+91 98765 43210',
        email: finalData.email || 'hello@interiodesign.com',
        tagline: finalData.tagline || finalData.about || 'We help you unlock the beauty and comfort of your space — interiors that inspire and enrich your life',
        years: finalData.stats?.years || '8',
        projects: finalData.stats?.projects || '120+',
        specialty: 'Residential & Commercial Interiors',
        cal: finalData.booking_url || 'https://cal.com/aiotic/discovery',
        services: finalData.services || [],
        team: finalData.team || [],
        gallery: finalData.gallery || [],
        testimonials: finalData.testimonials || [],
        aboutText: finalData.about || '',
        mapEmbedUrl: finalData.map_embed_url || '',
        social: finalData.social || {},
        locations: finalData.locations || []
      })
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white text-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return <DemoContext.Provider value={data}>{children}</DemoContext.Provider>
}

export function useDemoParams() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemoParams must be used within DemoProvider')
  }
  return context
}
