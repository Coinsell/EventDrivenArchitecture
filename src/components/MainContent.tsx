import { Menu } from 'lucide-react'
import { useTopics } from '../contexts/TopicContext'
import { TopicContent } from './TopicContent'
interface MainContentProps {
  onMenuClick: () => void
}
export function MainContent({ onMenuClick }: MainContentProps) {
  const { topics, currentTopic } = useTopics()
  const getCurrentTopicData = () => {
    for (const topic of topics) {
      if (topic.id === currentTopic) return topic
      if (topic.subtopics) {
        const subtopic = topic.subtopics.find(sub => sub.id === currentTopic)
        if (subtopic) return subtopic
      }
    }
    return topics[0]
  }
  const currentTopicData = getCurrentTopicData()
  return (
    <div className="lg:ml-80 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentTopicData.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Duration: {currentTopicData.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Cloud Architecture Training
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="p-6">
        <TopicContent topic={currentTopicData} />
      </main>
    </div>
  )
}