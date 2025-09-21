import { X, Clock, ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTopics } from '../contexts/TopicContext'
import { cn } from '../lib/utils'
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { topics, currentTopic, setCurrentTopic } = useTopics()
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['intro'])
  const toggleExpanded = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }
  const handleTopicClick = (topicId: string) => {
    setCurrentTopic(topicId)
    onClose()
  }
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Az</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Azure Training</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <h2 className="font-semibold text-gray-900 mb-1">Event-Driven Architecture</h2>
          <p className="text-sm text-gray-600">& Messaging in Azure</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="space-y-1">
                <button
                  onClick={() => toggleExpanded(topic.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                    currentTopic === topic.id
                      ? "bg-blue-100 text-blue-900 border border-blue-200"
                      : "hover:bg-gray-50 text-gray-700"
                  )}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{topic.title}</div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {topic.duration}
                    </div>
                  </div>
                  {expandedTopics.includes(topic.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedTopics.includes(topic.id) && topic.subtopics && (
                  <div className="ml-4 space-y-1">
                    {topic.subtopics.map((subtopic) => (
                      <button
                        key={subtopic.id}
                        onClick={() => handleTopicClick(subtopic.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-2 rounded-md text-left transition-colors text-sm",
                          currentTopic === subtopic.id
                            ? "bg-blue-50 text-blue-800 border-l-2 border-blue-500"
                            : "hover:bg-gray-50 text-gray-600"
                        )}
                      >
                        <span className="flex-1">{subtopic.title}</span>
                        <span className="text-xs text-gray-400">{subtopic.duration}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}