import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'
import { TopicProvider } from './contexts/TopicContext'
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <TopicProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContent onMenuClick={() => setSidebarOpen(true)} />
      </div>
    </TopicProvider>
  )
}
export default App