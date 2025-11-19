import { useState } from 'react'
import TitleLevelSelector from './components/TitleLevelSelector'
import CompetencyList from './components/CompetencyList'
import IngestPanel from './components/IngestPanel'

function App() {
  const [selection, setSelection] = useState({ title: '', level: '' })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.12),transparent_40%)]" />

      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-14">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Flames" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Competency Navigator</h1>
        </div>
        <p className="mt-3 text-blue-200/80 max-w-3xl">
          Pick your job title and level. We’ll show the competencies for that role and explain what each standard (like “coaching average”) means using your definitions.
        </p>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 shadow-2xl">
          <TitleLevelSelector onSelect={(sel) => setSelection(sel)} />
          <CompetencyList title={selection.title} level={selection.level} />
          <IngestPanel />
        </div>

        <section className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold">Fast lookup</h3>
            <p className="text-blue-200/80 text-sm mt-1">Browse titles and levels in seconds, see the exact competencies expected.</p>
          </div>
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold">Clear standards</h3>
            <p className="text-blue-200/80 text-sm mt-1">Standards such as “average” or “advanced” are explained with your definitions.</p>
          </div>
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold">Modern design</h3>
            <p className="text-blue-200/80 text-sm mt-1">Smooth gradients, soft borders, and a distraction-free layout.</p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 text-center text-blue-300/60 py-6">
        Built with Flames Blue
      </footer>
    </div>
  )
}

export default App
