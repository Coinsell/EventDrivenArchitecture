import { useState, useEffect } from 'react'
import { TrendingUp, Users, Zap } from 'lucide-react'
export function ScalabilityDemo() {
  const [eventCount, setEventCount] = useState(100)
  const [consumerCount, setConsumerCount] = useState(2)
  const [isBlackFriday, setIsBlackFriday] = useState(false)
  useEffect(() => {
    if (isBlackFriday) {
      setEventCount(10000)
      setConsumerCount(20)
    } else {
      setEventCount(100)
      setConsumerCount(2)
    }
  }, [isBlackFriday])
  const eventsPerConsumer = Math.ceil(eventCount / consumerCount)
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📈 Scalability in Action</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Traffic Scenario</h4>
            <div className="space-y-4">
              <button
                onClick={() => setIsBlackFriday(false)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  !isBlackFriday
                    ? 'border-blue-300 bg-blue-100 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                🛒 Normal Day
              </button>
              <button
                onClick={() => setIsBlackFriday(true)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  isBlackFriday
                    ? 'border-red-300 bg-red-100 text-red-900'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                🔥 Black Friday Sale
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h5 className="font-semibold text-gray-900 mb-4">System Metrics</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Events per second:</span>
                <span className={`font-bold ${isBlackFriday ? 'text-red-600' : 'text-blue-600'}`}>
                  {eventCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Active consumers:</span>
                <span className={`font-bold ${isBlackFriday ? 'text-red-600' : 'text-blue-600'}`}>
                  {consumerCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Events per consumer:</span>
                <span className={`font-bold ${isBlackFriday ? 'text-red-600' : 'text-blue-600'}`}>
                  {eventsPerConsumer}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Auto-Scaling Response</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-green-800">Traffic spike detected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="text-green-800">Event broker queues events</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-green-800">Consumers scale horizontally</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-semibold text-gray-900 mb-3">Consumer Instances</h5>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: Math.min(consumerCount, 25) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isBlackFriday
                      ? 'bg-red-100 text-red-600 border border-red-300'
                      : 'bg-blue-100 text-blue-600 border border-blue-300'
                  }`}
                >
                  C{index + 1}
                </div>
              ))}
              {consumerCount > 25 && (
                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 border border-gray-300 flex items-center justify-center text-xs">
                  +{consumerCount - 25}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Azure Auto-Scaling</h5>
            <p className="text-yellow-800 text-sm">
              Azure Event Hub and Event Grid automatically handle millions of events per second. 
              Your consumers can scale independently based on the event load.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}