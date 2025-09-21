import { useState } from 'react'
import { Home, Lightbulb, Thermometer, Lock, Shield, Smartphone, Zap } from 'lucide-react'
export function SmartHomeExercise() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([])
  const events = [
    { id: 'motion', name: 'Motion Detected', icon: Shield, color: 'red' },
    { id: 'light', name: 'Light Turned On', icon: Lightbulb, color: 'yellow' },
    { id: 'temp', name: 'Thermostat Adjusted', icon: Thermometer, color: 'blue' },
    { id: 'door', name: 'Door Unlocked', icon: Lock, color: 'green' },
    { id: 'window', name: 'Window Opened', icon: Home, color: 'purple' },
    { id: 'alarm', name: 'Security Alarm Triggered', icon: Shield, color: 'red' }
  ]
  const consumers = [
    { id: 'lights', name: 'Smart Lights', icon: Lightbulb, color: 'yellow' },
    { id: 'security', name: 'Security System', icon: Shield, color: 'red' },
    { id: 'hvac', name: 'HVAC System', icon: Thermometer, color: 'blue' },
    { id: 'mobile', name: 'Mobile Notifications', icon: Smartphone, color: 'green' },
    { id: 'automation', name: 'Home Automation', icon: Home, color: 'purple' }
  ]
  const eventConsumerMappings = {
    motion: ['lights', 'security', 'mobile'],
    light: ['automation', 'hvac'],
    temp: ['hvac', 'mobile'],
    door: ['security', 'lights', 'mobile'],
    window: ['hvac', 'security', 'mobile'],
    alarm: ['security', 'mobile', 'lights']
  }
  const toggleEvent = (eventId: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }
  const toggleConsumer = (consumerId: string) => {
    setSelectedConsumers(prev => 
      prev.includes(consumerId) 
        ? prev.filter(id => id !== consumerId)
        : [...prev, consumerId]
    )
  }
  const getActiveConnections = () => {
    const connections: Array<{event: string, consumer: string}> = []
    selectedEvents.forEach(eventId => {
      const mapping = eventConsumerMappings[eventId as keyof typeof eventConsumerMappings]
      if (mapping) {
        mapping.forEach(consumerId => {
          if (selectedConsumers.includes(consumerId)) {
            connections.push({ event: eventId, consumer: consumerId })
          }
        })
      }
    })
    return connections
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
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏠 Interactive Exercise: Smart Home System</h3>
      <p className="text-gray-700 mb-8">
        Click on events and consumers to see how Event Grid would connect them in a smart home system:
      </p>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Event Sources */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📡 Event Sources</h4>
          <div className="space-y-3">
            {events.map(event => (
              <button
                key={event.id}
                onClick={() => toggleEvent(event.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedEvents.includes(event.id)
                    ? `${getColorClasses(event.color).border} ${getColorClasses(event.color).light} scale-105`
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <event.icon className={`w-5 h-5 ${
                    selectedEvents.includes(event.id)
                      ? getColorClasses(event.color).text
                      : 'text-gray-500'
                  }`} />
                  <span className="font-medium text-gray-900">{event.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Event Grid */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Event Grid</h4>
          <p className="text-sm text-gray-600 text-center">Routes events to consumers</p>
          {getActiveConnections().length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm font-medium">
                {getActiveConnections().length} active connections
              </p>
            </div>
          )}
        </div>
        {/* Event Consumers */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">🎯 Event Consumers</h4>
          <div className="space-y-3">
            {consumers.map(consumer => (
              <button
                key={consumer.id}
                onClick={() => toggleConsumer(consumer.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedConsumers.includes(consumer.id)
                    ? `${getColorClasses(consumer.color).border} ${getColorClasses(consumer.color).light} scale-105`
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <consumer.icon className={`w-5 h-5 ${
                    selectedConsumers.includes(consumer.id)
                      ? getColorClasses(consumer.color).text
                      : 'text-gray-500'
                  }`} />
                  <span className="font-medium text-gray-900">{consumer.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {getActiveConnections().length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-4">🔗 Active Event Connections</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {getActiveConnections().map((connection, index) => {
              const event = events.find(e => e.id === connection.event)
              const consumer = consumers.find(c => c.id === connection.consumer)
              return (
                <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg border">
                  {event && <event.icon className={`w-4 h-4 ${getColorClasses(event.color).text}`} />}
                  <span className="text-sm text-gray-700">{event?.name}</span>
                  <span className="text-gray-400">→</span>
                  {consumer && <consumer.icon className={`w-4 h-4 ${getColorClasses(consumer.color).text}`} />}
                  <span className="text-sm text-gray-700">{consumer?.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Home className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Event Grid Benefits</h5>
            <p className="text-yellow-800 text-sm">
              Notice how Event Grid connects the dots - one motion detection event can trigger 
              lights, security alerts, and mobile notifications simultaneously, all without 
              the motion sensor knowing about these systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}