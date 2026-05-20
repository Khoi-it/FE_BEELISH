import AppHeader from '../components/layout/AppHeader.jsx'
import DictationTitleBar from '../components/dictation/DictationTitleBar'
import DictationVideoPanel from '../components/dictation/DictationVideoPanel'
import WorkspaceCard from '../components/dictation/WorkspaceCard'
import TranscriptCard from '../components/dictation/TranscriptCard'
import Footer from '../components/layout/Footer.js'

export default function DictationPage() {
  return (
    <div className="min-h-screen bg-beige-custom text-border-thick">
      <div className="mx-auto max-w-[1440px] p-6">
        <AppHeader />
        <DictationTitleBar />
        <main className="grid grid-cols-12 gap-6">
          <DictationVideoPanel />
          <WorkspaceCard />
          <TranscriptCard />
        </main>
        <Footer />
      </div>
    </div>
  )
}

