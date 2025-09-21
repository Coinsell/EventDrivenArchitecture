import { useState, useEffect } from 'react'
import { Home, Lightbulb, Thermometer, Lock, Shield, Smartphone, Zap } from 'lucide-react'
export function SmartHomeDemo() {
  const [activeEvent, setActiveEvent] = useState(0)
  const events = [
    { id: 'motion', title: 'Motion Detected', icon: Shield, color: 'red' },
    { id: 'light', title: 'Light Turned On', icon: Lightbulb, color: 'yellow' },
    { id: 'thermostat', title: 'Thermostat Adjusted', icon: Thermometer, color: 'blue' },
    { id: 'door', title: 'Door Unlocked', icon: Lock, color: 'green' }
  ]
  const consumers = [
    { id: 'lights', title: 'Smart Lights', icon: Lightbulb, responds: ['motion', 'door'] },
    { id: 'security', title: 'Security System', icon: Shield, responds: ['motion', 'door'] },
    { id: 'mobile', title: 'Mobile Notifications', icon: Smartphone, responds: ['motion', 'door', 'thermostat'] },
    { id: 'hvac', title: 'HVAC System', icon: Thermometer, responds: ['thermostat', 'motion'] }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [events.length])
  const isConsumerActive = (consumerId: string) => {
    const currentEvent = events[activeEvent]
    const consumer = consumers.find(c => c.id === consumerId)
    return consumer?.responds.includes(currentEvent.id) || false
  }
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderActiveEventIcon = () => {
    const currentEvent = events[activeEvent]
    const IconComponent = currentEvent.icon
    return <IconComponent className="w-4 h-4 text-white" />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏠 Exercise: Smart Home System</h3>
      <p className="text-gray-600 mb-8">
        If you were designing a smart home system, what events could Event Grid handle?
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">🎯 Event Sources</h4>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                    activeEvent === index
                      ? 'border-blue-300 bg-blue-100 scale-105'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeEvent === index ? event.color === 'red' ? 'bg-red-500' : 
                      event.color === 'yellow' ? 'bg-yellow-500' :
                      event.color === 'blue' ? 'bg-blue-500' : 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{event.title}</div>
                      {activeEvent === index && (
                        <div className="text-xs text-blue-600 mt-1 animate-pulse">
                          Event triggered!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">🎛️ Event Consumers</h4>
            <div className="space-y-3">
              {consumers.map((consumer) => (
                <div
                  key={consumer.id}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    isConsumerActive(consumer.id)
                      ? 'border-green-300 bg-green-100'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isConsumerActive(consumer.id) ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <consumer.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{consumer.title}</div>
                        <div className="text-xs text-gray-600">
                          Responds to: {consumer.responds.join(', ')}
                        </div>
                      </div>
                    </div>
                    {isConsumerActive(consumer.id) && (
                      <div className="text-xs text-green-700 bg-green-200 px-2 py-1 rounded animate-pulse">
                        Active
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-900 mb-4">🔗 Event Grid Connections</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-purple-900 mb-3">Current Event:</h5>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                events[activeEvent].color === 'red' ? 'bg-red-500' :
                events[activeEvent].color === 'yellow' ? 'bg-yellow-500' :
                events[activeEvent].color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {renderActiveEventIcon()}
              </div>
              <span className="font-medium text-purple-900">{events[activeEvent].title}</span>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-purple-900 mb-3">Active Consumers:</h5>
            <div className="flex flex-wrap gap-2">
              {consumers
                .filter(consumer => isConsumerActive(consumer.id))
                .map(consumer => (
                  <div key={consumer.id} className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <consumer.icon className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-800">{consumer.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Event Grid Magic</h5>
            <p className="text-yellow-800 text-sm">
              Event Grid connects the dots! Each device publishes events, and only the relevant 
              consumers respond. No direct dependencies between devices and systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}