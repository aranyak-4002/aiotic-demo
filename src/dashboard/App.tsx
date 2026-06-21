import { useState, useEffect } from 'react'
import { supabase, type DemoClient, type Template } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

const DEMO_BASE = 'https://demo.getaiotic.com'

const TEMPLATE_LABELS: Record<Template, string> = {
  clinic: 'Clinic',
  'real-estate': 'Real Estate',
  'interior-design': 'Interior Design',
  'interior-premium': 'Interior Premium',
}


function demoUrl(client: DemoClient) {
  return `${DEMO_BASE}/${client.template}/?client=${encodeURIComponent(client.slug)}`
}

// ─── Login screen ────────────────────────────────────────────────────────────
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '380px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0a0a0a', letterSpacing: '-0.02em' }}>⚡ Aiotic</div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 400, fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>Demo Dashboard</div>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              required autoFocus style={inputStyle} placeholder="you@aiotic.com" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              required style={inputStyle} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" disabled={loading} style={btnPrimaryStyle}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Client form (add / edit) ─────────────────────────────────────────────────
const EMPTY_FORM = {
  slug: '',
  template: 'clinic' as Template,
  business_name: '',
  maps_url: '',
  data: '{}',
  is_active: true,
}

function ClientForm({ initial, onSave, onCancel }: {
  initial?: DemoClient | null
  onSave: () => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    template: (initial?.template ?? 'clinic') as Template,
    business_name: initial?.business_name ?? '',
    maps_url: initial?.maps_url ?? '',
    data: initial ? JSON.stringify(initial.data, null, 2) : '{}',
    is_active: initial?.is_active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [jsonError, setJsonError] = useState('')

  function set(k: keyof typeof EMPTY_FORM, v: string | boolean) {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'slug') setForm(f => ({ ...f, slug: (v as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))
  }

  function autoSlug(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  function validateJson(val: string) {
    try { JSON.parse(val); setJsonError(''); return true }
    catch { setJsonError('Invalid JSON — check syntax'); return false }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!validateJson(form.data)) return
    setSaving(true)
    setError('')

    const payload = {
      slug: form.slug,
      template: form.template,
      business_name: form.business_name,
      maps_url: form.maps_url || null,
      data: JSON.parse(form.data),
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    }

    const { error } = initial
      ? await supabase.from('demo_clients').update(payload).eq('id', initial.id)
      : await supabase.from('demo_clients').insert(payload)

    if (error) setError(error.message)
    else onSave()
    setSaving(false)
  }

  const previewUrl = demoUrl({ ...form, id: '', created_at: '', updated_at: '', data: {} } as unknown as DemoClient)

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Business Name *</label>
          <input value={form.business_name} onChange={e => {
            set('business_name', e.target.value)
            if (!initial) set('slug', autoSlug(e.target.value))
          }} required style={inputStyle} placeholder="Dr. Sharma Dental Care" />
        </div>
        <div>
          <label style={labelStyle}>Slug (used in URL) *</label>
          <input value={form.slug} onChange={e => set('slug', e.target.value)}
            required style={inputStyle} placeholder="sharma-dental" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Template *</label>
          <select value={form.template} onChange={e => set('template', e.target.value)} style={inputStyle}>
            {(Object.keys(TEMPLATE_LABELS) as Template[]).map(t => (
              <option key={t} value={t}>{TEMPLATE_LABELS[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>
            <input type="checkbox" checked={form.is_active}
              onChange={e => set('is_active', e.target.checked)}
              style={{ marginRight: '6px' }} />
            Active (visible to demo viewers)
          </label>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Google Maps URL (for reference)</label>
        <input value={form.maps_url} onChange={e => set('maps_url', e.target.value)}
          style={inputStyle} placeholder="https://maps.google.com/..." />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Data JSON *</label>
          <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>Paste your scraped JSON here</span>
        </div>
        <textarea
          value={form.data}
          onChange={e => { set('data', e.target.value); validateJson(e.target.value) }}
          rows={16}
          style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.78rem', resize: 'vertical', lineHeight: 1.6 }}
        />
        {jsonError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{jsonError}</p>}
      </div>

      {/* Demo URL preview */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.85rem 1rem' }}>
        <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo URL</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <code style={{ fontSize: '0.78rem', color: '#14532d', wordBreak: 'break-all', flex: 1 }}>{previewUrl}</code>
          <button type="button" onClick={() => { navigator.clipboard.writeText(previewUrl) }}
            style={{ ...btnSmallStyle, flexShrink: 0 }}>Copy</button>
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} style={btnGhostStyle}>Cancel</button>
        <button type="submit" disabled={saving} style={btnPrimaryStyle}>
          {saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Client'}
        </button>
      </div>
    </form>
  )
}

// ─── Main dashboard ──────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<DemoClient[]>([])
  const [editing, setEditing] = useState<DemoClient | null | undefined>(undefined)
  const [tab, setTab] = useState<'active' | 'prospects'>('active')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadClients()
  }, [session])

  async function loadClients() {
    const { data } = await supabase
      .from('demo_clients')
      .select('*')
    if (data) {
      const fetchedClients = data as DemoClient[]
      fetchedClients.sort((a, b) => {
        const orderA = a.data?.sheet_order ?? Infinity
        const orderB = b.data?.sheet_order ?? Infinity
        return orderA - orderB
      })
      setClients(fetchedClients)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this record? This cannot be undone.')) return
    await supabase.from('demo_clients').delete().eq('id', id)
    setClients(c => c.filter(x => x.id !== id))
  }

  async function handleActivate(client: DemoClient) {
    await supabase.from('demo_clients').update({ is_active: true }).eq('id', client.id)
    setClients(cs => cs.map(c => c.id === client.id ? { ...c, is_active: true } : c))
    setTab('active')
  }

  async function handleDeactivate(client: DemoClient) {
    await supabase.from('demo_clients').update({ is_active: false }).eq('id', client.id)
    setClients(cs => cs.map(c => c.id === client.id ? { ...c, is_active: false } : c))
  }

  function copyUrl(client: DemoClient) {
    navigator.clipboard.writeText(demoUrl(client))
    setCopied(client.id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) return null
  if (!session) return <Login />

  const active = clients.filter(c => c.is_active)
  const prospects = clients.filter(c => !c.is_active)
  const list = (tab === 'active' ? active : prospects).filter(c =>
    c.business_name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'Inter,sans-serif', minHeight: '100vh', background: '#f9fafb' }}>

      {/* Top bar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 2rem', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', letterSpacing: '-0.02em' }}>⚡ Aiotic</span>
          <span style={{ color: '#d1d5db' }}>|</span>
          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Demo Dashboard</span>
        </div>
        <button onClick={() => supabase.auth.signOut()}
          style={{ fontSize: '0.8rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign out
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

        {/* Add / Edit panel */}
        {editing !== undefined && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', color: '#0a0a0a', marginBottom: '1.5rem' }}>
              {editing ? `Edit — ${editing.business_name}` : 'Add New Client'}
            </h2>
            <ClientForm
              initial={editing}
              onSave={() => { setEditing(undefined); loadClients() }}
              onCancel={() => setEditing(undefined)}
            />
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Active Demos', value: active.length, color: '#16a34a' },
            { label: 'Prospects', value: prospects.length, color: '#6b7280' },
            { label: 'Total', value: clients.length, color: '#0a0a0a' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs + controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {(['active', 'prospects'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '0.85rem',
                  padding: '0.45rem 1rem', border: '1px solid #e5e7eb', cursor: 'pointer',
                  background: tab === t ? '#0a0a0a' : '#fff',
                  color: tab === t ? '#fff' : '#6b7280',
                  borderRadius: t === 'active' ? '8px 0 0 8px' : '0 8px 8px 0',
                  borderRight: t === 'active' ? 'none' : '1px solid #e5e7eb',
                }}>
                {t === 'active' ? `Active Demos (${active.length})` : `Prospects (${prospects.length})`}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={tab === 'active' ? 'Search demos…' : 'Search prospects…'}
              style={{ ...inputStyle, maxWidth: '220px', marginBottom: 0 }} />
            <button onClick={() => setEditing(null)} style={btnPrimaryStyle}>+ Add Client</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          {list.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
              {tab === 'prospects' && prospects.length === 0
                ? 'No prospects yet. Run the seed script to import your clinic list.'
                : tab === 'active' && active.length === 0
                ? 'No active demos. Activate a prospect or add a client above.'
                : 'No results for that search.'}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  {['Business', 'Area', tab === 'active' ? 'Demo URL' : 'Website', 'Maps', ''].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < list.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500, color: '#0a0a0a', fontSize: '0.875rem' }}>{c.business_name}</div>
                      <code style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{c.slug}</code>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                        {(c.data as Record<string, unknown>)?.area as string || 'Pune'}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {tab === 'active' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <code style={{ fontSize: '0.72rem', color: '#14532d', background: '#f0fdf4', padding: '2px 6px', borderRadius: '4px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                            {`/clinic/?client=${c.slug}`}
                          </code>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                          {(c.data as Record<string, unknown>)?.website as string || '—'}
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {c.maps_url
                        ? <a href={c.maps_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem', color: '#0ea5e9', textDecoration: 'none' }}>View ↗</a>
                        : <span style={{ color: '#d1d5db', fontSize: '0.78rem' }}>—</span>}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {tab === 'active' ? (
                          <>
                            <button onClick={() => copyUrl(c)} style={btnSmallStyle}>
                              {copied === c.id ? '✓ Copied' : 'Copy URL'}
                            </button>
                            <button onClick={() => setEditing(c)} style={btnSmallStyle}>Edit</button>
                            <button onClick={() => handleDeactivate(c)}
                              style={{ ...btnSmallStyle, color: '#6b7280' }}>Deactivate</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleActivate(c)}
                              style={{ ...btnSmallStyle, color: '#16a34a', borderColor: '#bbf7d0', fontWeight: 600 }}>
                              Activate →
                            </button>
                            <button onClick={() => setEditing(c)} style={btnSmallStyle}>Edit</button>
                            <button onClick={() => handleDelete(c.id)}
                              style={{ ...btnSmallStyle, color: '#ef4444', borderColor: '#fecaca' }}>
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          {list.length} shown · {clients.length} total records
        </p>
      </main>
    </div>
  )
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#374151', marginBottom: '5px',
}
const inputStyle: React.CSSProperties = {
  width: '100%', fontFamily: 'Inter,sans-serif', fontSize: '0.875rem', color: '#0a0a0a',
  border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.55rem 0.85rem',
  outline: 'none', background: '#fff', boxSizing: 'border-box',
}
const btnPrimaryStyle: React.CSSProperties = {
  fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '0.875rem',
  color: '#fff', background: '#0a0a0a', border: 'none',
  borderRadius: '8px', padding: '0.55rem 1.25rem', cursor: 'pointer', whiteSpace: 'nowrap',
}
const btnGhostStyle: React.CSSProperties = {
  fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '0.875rem',
  color: '#6b7280', background: '#fff', border: '1px solid #e5e7eb',
  borderRadius: '8px', padding: '0.55rem 1.25rem', cursor: 'pointer',
}
const btnSmallStyle: React.CSSProperties = {
  fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '0.75rem',
  color: '#374151', background: '#fff', border: '1px solid #e5e7eb',
  borderRadius: '6px', padding: '0.3rem 0.7rem', cursor: 'pointer',
}
const tdStyle: React.CSSProperties = {
  padding: '0.85rem 1rem', verticalAlign: 'middle',
}
