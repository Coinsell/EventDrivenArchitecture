import { useState, useEffect } from 'react'
import { ArrowRight, Database, Mail, Filter, Target, Zap } from 'lucide-react'
export function EventGridFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [eventData, setEventData] = useState({
    source: 'Blob Storage',
    event: 'BlobCreated',
    topic: 'storage-events',
    filters: ['*.jpg', '*.png'],
    handlers: ['Resize Function', 'AI Tagging', 'Notification']
  })
  const steps = [
    {
      id: 'generate',
      title: 'Event Generated',
      description: 'Source generates an event',
      icon: Database,
      color: 'blue',
      detail: `${eventData.source} generates ${eventData.event} event`
    },
    {
      id: 'publish',
      title: 'Event Published',
      description: 'Event sent to topic',
      icon: Mail,
      color: 'yellow',
      detail: `Event published to ${eventData.topic} topic`
    },
    {
      id: 'match',
      title: 'Subscription Matching',
      description: 'Event Grid matches subscriptions',
      icon: Filter,
      color: 'green',
      detail: `Filtering by: ${eventData.filters.join(', ')}`
    },
    {
      id: 'deliver',
      title: 'Event Delivered',
      description: 'Event sent to handlers',
      icon: Target,
      color: 'purple',
      detail: `Delivered to ${eventData.handlers.length} handlers`
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [steps.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔄 Event Flow in Event Grid</h3>
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeStep === index
                  ? `${getColorClasses(step.color).bg} scale-110 shadow-lg`
                  : 'bg-gray-200 scale-100'
              }`}>
                <step.icon className={`w-8 h-8 ${
                  activeStep === index ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="text-center">
                <div className={`font-semibold transition-colors ${
                  activeStep === index ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
                {activeStep === index && (
                  <div className="text-xs text-blue-600 mt-2 animate-pulse font-medium">
                    {step.detail}
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-8">
                <ArrowRight className={`w-8 h-8 transition-colors ${
                  activeStep > index ? 'text-blue-500' : 'text-gray-300'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">Current Event Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-700">Source:</span>
              <span className="font-medium text-blue-900">{eventData.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Event Type:</span>
              <span className="font-medium text-blue-900">{eventData.event}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Topic:</span>
              <span className="font-medium text-blue-900">{eventData.topic}</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-4">Event Handlers</h4>
          <div className="space-y-2">
            {eventData.handlers.map((handler, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-800">{handler}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Routing Engine</h5>
            <p className="text-yellow-800 text-sm">
              Event Grid acts as a smart routing engine, matching events against subscriptions 
              and delivering them to the right handlers with filtering and reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}