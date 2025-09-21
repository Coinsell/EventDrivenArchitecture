import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
export function AnimatedFlow() {
  const [activeConnection, setActiveConnection] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % 3)
    }, 1500)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Event-Driven Flow</h3>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Producer */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">Producer</div>
            <div className="text-xs text-gray-500">Publishes Events</div>
          </div>
        </div>
        {/* Arrow 1 */}
        <div className="mx-6">
          <ArrowRight className={`w-8 h-8 transition-all duration-300 ${
            activeConnection === 0 ? 'text-blue-500 scale-110' : 'text-gray-300'
          }`} />
          {activeConnection === 0 && (
            <div className="text-xs text-blue-600 mt-1 animate-pulse">Event</div>
          )}
        </div>
        {/* Event Broker */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 bg-yellow-100 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EB</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">Event Broker</div>
            <div className="text-xs text-gray-500">Routes & Filters</div>
          </div>
        </div>
        {/* Arrow 2 */}
        <div className="mx-6">
          <ArrowRight className={`w-8 h-8 transition-all duration-300 ${
            activeConnection === 1 ? 'text-yellow-500 scale-110' : 'text-gray-300'
          }`} />
          {activeConnection === 1 && (
            <div className="text-xs text-yellow-600 mt-1 animate-pulse">Filtered</div>
          )}
        </div>
        {/* Consumer */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">Consumer</div>
            <div className="text-xs text-gray-500">Processes Events</div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
        <div className={`p-3 rounded-lg transition-colors ${
          activeConnection === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
        }`}>
          <div className="font-medium text-gray-900">1. Event Publication</div>
          <div className="text-gray-600">Producer publishes event to broker</div>
        </div>
        <div className={`p-3 rounded-lg transition-colors ${
          activeConnection === 1 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
        }`}>
          <div className="font-medium text-gray-900">2. Event Routing</div>
          <div className="text-gray-600">Broker filters and routes events</div>
        </div>
        <div className={`p-3 rounded-lg transition-colors ${
          activeConnection === 2 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
        }`}>
          <div className="font-medium text-gray-900">3. Event Processing</div>
          <div className="text-gray-600">Consumer processes the event</div>
        </div>
      </div>
    </div>
  )
}