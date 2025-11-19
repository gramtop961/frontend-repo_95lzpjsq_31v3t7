import { useEffect, useState } from 'react'

export default function TitleLevelSelector({ onSelect }) {
  const [titles, setTitles] = useState([])
  const [levelsMap, setLevelsMap] = useState({})
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/titles`)
        const data = await res.json()
        setTitles(data.titles || [])
        setLevelsMap(data.levels || {})
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    setSelectedLevel('')
  }, [selectedTitle])

  const handleGo = () => {
    if (selectedTitle) onSelect({ title: selectedTitle, level: selectedLevel || undefined })
  }

  return (
    <div className="w-full grid md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <label className="block text-sm text-blue-200 mb-2">Job Title</label>
        <select
          className="w-full bg-slate-900/60 border border-blue-500/30 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          <option value="">Select a title</option>
          {titles.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-blue-200 mb-2">Level</label>
        <select
          className="w-full bg-slate-900/60 border border-blue-500/30 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          disabled={!selectedTitle}
        >
          <option value="">Any</option>
          {(levelsMap[selectedTitle] || []).map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-3 flex justify-end">
        <button
          onClick={handleGo}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20 transition"
        >
          Browse
        </button>
      </div>
    </div>
  )
}
