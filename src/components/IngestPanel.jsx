import { useState } from 'react'

export default function IngestPanel() {
  const [matrix, setMatrix] = useState('')
  const [standards, setStandards] = useState('')
  const [definitions, setDefinitions] = useState('')
  const [status, setStatus] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const sampleMatrix = `{
  "Senior Service Delivery Engineer": [
    { "key": "coaching", "label": "Coaching" }
  ]
}`

  const sampleStandards = `{
  "Senior Service Delivery Engineer": {
    "Senior": { "coaching": "average" }
  }
}`

  const sampleDefinitions = `{
  "coaching": {
    "label": "Coaching",
    "description": "Ability to help others grow",
    "values": { "average": "Provides regular guidance to peers" }
  }
}`

  const submit = async () => {
    try {
      setStatus('Uploading...')
      const payload = {
        matrix: JSON.parse(matrix),
        standards: JSON.parse(standards),
        definitions: JSON.parse(definitions),
        replace: true
      }
      const res = await fetch(`${baseUrl}/api/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to ingest')
      setStatus('✅ Data ingested successfully')
    } catch (e) {
      console.error(e)
      setStatus('❌ ' + (e.message || 'Error'))
    }
  }

  return (
    <div className="bg-slate-900/50 border border-blue-500/20 rounded-2xl p-6 mt-8">
      <h3 className="text-white font-semibold text-lg">Load your JSON data</h3>
      <p className="text-blue-200/80 text-sm mb-4">Paste the three JSON files below and press Upload.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-2">General Matrix JSON</label>
          <textarea value={matrix} onChange={(e) => setMatrix(e.target.value)} placeholder={sampleMatrix}
            className="w-full h-40 bg-slate-950/60 border border-blue-500/20 rounded-xl p-3 text-sm text-blue-100 font-mono" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">Standards JSON</label>
          <textarea value={standards} onChange={(e) => setStandards(e.target.value)} placeholder={sampleStandards}
            className="w-full h-40 bg-slate-950/60 border border-blue-500/20 rounded-xl p-3 text-sm text-blue-100 font-mono" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">Definitions JSON</label>
          <textarea value={definitions} onChange={(e) => setDefinitions(e.target.value)} placeholder={sampleDefinitions}
            className="w-full h-40 bg-slate-950/60 border border-blue-500/20 rounded-xl p-3 text-sm text-blue-100 font-mono" />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={submit} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20 transition">Upload</button>
      </div>
      {status && <p className="mt-3 text-blue-200/90">{status}</p>}
    </div>
  )
}
