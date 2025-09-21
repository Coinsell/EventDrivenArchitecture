import { useState, useEffect } from 'react'
import { Zap, ArrowRight, Bell } from 'lucide-react'
export function EDADefinitionVisual() {
  const [activeExample, setActiveExample] = useState(0)
  const examples = [
    { icon: '🛒', event: 'Customer places an order', description: 'E-commerce event' },
    { icon: '📁', event: 'New file uploaded to storage', description: 'Storage event' },
    { icon: '👤', event: 'User logs in to application', description: 'Authentication event' },
    { icon: '💳', event: 'Payment transaction completed', description: 'Financial event' }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % examples.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [examples.length])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Definition in Simple Terms</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">What is an Event?</h4>
            <p className="text-blue-800 mb-4">
              An event is simply a signal that something has happened in your system.
            </p>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    activeExample === index
                      ? 'bg-blue-100 border border-blue-300 scale-105'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{example.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{example.event}</div>
                      <div className="text-sm text-gray-600">{example.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Three Main Components</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">P</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Event Producers</h5>
                  <p className="text-sm text-gray-600">Sources that generate events (e.g., web apps, IoT devices)</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Event Routers/Brokers</h5>
                  <p className="text-sm text-gray-600">Handle distribution (Event Grid, Event Hub, Service Bus)</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">C</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Event Consumers</h5>
                  <p className="text-sm text-gray-600">Systems that react to events (Functions, Logic Apps)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-purple-600" />
              <div>
                <h5 className="font-semibold text-purple-900">Key Insight</h5>
                <p className="text-sm text-purple-800">
                  "I'll call you when I need you" vs "I'll keep checking if you're ready"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}