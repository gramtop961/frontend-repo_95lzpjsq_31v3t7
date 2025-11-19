import { useEffect, useState } from 'react'

export default function CompetencyList({ title, level }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      if (!title) return
      setLoading(true)
      try {
        const url = new URL(`${baseUrl}/api/competencies`)
        url.searchParams.set('title', title)
        if (level) url.searchParams.set('level', level)
        const res = await fetch(url)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [title, level])

  if (!title) return null

  if (loading) {
    return (
      <div className="mt-6 text-blue-200/80">Loading competencies...</div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      {items.length === 0 ? (
        <p className="text-blue-200/70">No competencies found.</p>
      ) : (
        items.map((it) => (
          <div key={it.key} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-white font-semibold text-lg">{it.label}</h4>
                {it.definition && (
                  <p className="text-blue-200/80 text-sm mt-1">{it.definition}</p>
                )}
              </div>
              {it.standard && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-500/30">
                  {String(it.standard).toUpperCase()}
                </span>
              )}
            </div>
            {it.standard_definition && (
              <p className="text-blue-100/90 text-sm mt-3 bg-slate-900/40 rounded-lg p-3 border border-blue-500/10">
                {it.standard_definition}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  )
}
