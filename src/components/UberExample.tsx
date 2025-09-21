import { useState, useEffect } from 'react'
import { Car, MapPin, CreditCard, Users, Zap, TrendingUp } from 'lucide-react'
export function UberExample() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [eventCount, setEventCount] = useState(0)
  const events = [
    { id: 'request', title: 'Ride Requested', icon: Users, color: 'blue' },
    { id: 'accept', title: 'Driver Accepts', icon: Car, color: 'green' },
    { id: 'location', title: 'GPS Updates', icon: MapPin, color: 'purple' },
    { id: 'payment', title: 'Payment Processed', icon: CreditCard, color: 'orange' }
  ]
  const realTimeFeatures = [
    'Real-time driver assignment',
    'Dynamic surge pricing',
    'Route optimization',
    'Live tracking updates'
  ]
  useEffect(() => {
    const eventInterval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length)
    }, 1500)
    const countInterval = setInterval(() => {
      setEventCount(prev => prev + Math.floor(Math.random() * 1000) + 500)
    }, 100)
    return () => {
      clearInterval(eventInterval)
      clearInterval(countInterval)
    }
  }, [events.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🚗 Real-World Example: Uber-like Service</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">📊 Event Stream</h4>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    activeEvent === index
                      ? `${getColorClasses(event.color).light} border-${event.color}-300 scale-105`
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeEvent === index ? getColorClasses(event.color).bg : 'bg-gray-300'
                    }`}>
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{event.title}</div>
                      {activeEvent === index && (
                        <div className="text-xs text-blue-600 mt-1 animate-pulse">
                          Streaming to Event Hub...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Events/sec:</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-600">{eventCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">⚡ Real-Time Capabilities</h4>
            <div className="space-y-3">
              {realTimeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <h5 className="font-semibold text-gray-900 mb-2">Without Event Hub:</h5>
              <p className="text-red-700 text-sm">
                ❌ Batch processing only<br/>
                ❌ No real-time driver locations<br/>
                ❌ Delayed surge pricing<br/>
                ❌ Poor user experience
              </p>
            </div>
            <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-900 mb-2">With Event Hub:</h5>
              <p className="text-green-800 text-sm">
                ✅ Real-time event streaming<br/>
                ✅ Instant driver assignment<br/>
                ✅ Dynamic pricing updates<br/>
                ✅ Excellent user experience
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-orange-900 mb-2">Event Hub Impact</h4>
            <p className="text-orange-800 text-sm">
              Event Hub enables real-time responsiveness that's critical for ride-hailing services. 
              Without streaming data processing, users would experience delays in driver matching, 
              pricing updates, and location tracking - making the service unusable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}