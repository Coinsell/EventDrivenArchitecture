import { useState, useEffect } from 'react'
import { Car, Users, CreditCard, BarChart3, MapPin, CheckCircle, X } from 'lucide-react'
export function RidesharingExample() {
  const [activeEvent, setActiveEvent] = useState(0)
  const events = [
    { id: 'RideRequested', type: 'RideRequested', subject: 'rides/1234/requested', color: 'blue', data: { riderId: '1234', location: 'Downtown' } },
    { id: 'RideAccepted', type: 'RideAccepted', subject: 'rides/1234/accepted', color: 'green', data: { riderId: '1234', driverId: '5678' } },
    { id: 'RideCompleted', type: 'RideCompleted', subject: 'rides/1234/completed', color: 'purple', data: { riderId: '1234', fare: 25.50 } }
  ]
  const services = [
    {
      id: 'billing',
      name: 'Billing Service',
      icon: CreditCard,
      color: 'green',
      interests: ['RideCompleted'],
      description: 'Only processes completed rides for billing'
    },
    {
      id: 'notifications',
      name: 'Driver Notifications',
      icon: Users,
      color: 'blue',
      interests: ['RideRequested'],
      description: 'Notifies drivers of new ride requests'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: BarChart3,
      color: 'orange',
      interests: ['RideRequested', 'RideAccepted', 'RideCompleted'],
      description: 'Tracks all ride events for insights'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [events.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const shouldReceiveEvent = (service: typeof services[0], event: typeof events[0]) => {
    return service.interests.includes(event.type)
  }
  const renderServiceIcon = (service: typeof services[0]) => {
    const IconComponent = service.icon
    return <IconComponent className="w-6 h-6 text-white" />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🚗 Real-World Example: Ridesharing App</h3>
      <p className="text-gray-600 mb-8">
        See how routing and filtering work in a practical ridesharing scenario
      </p>
      {/* Event Timeline */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Ride Event Timeline:</h4>
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex items-center space-x-4 flex-shrink-0">
              <div className={`px-4 py-3 rounded-lg border-2 transition-all duration-500 ${
                activeEvent === index
                  ? `${getColorClasses(event.color).border} ${getColorClasses(event.color).light} scale-110`
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className={`font-semibold text-sm ${
                    activeEvent === index ? getColorClasses(event.color).text : 'text-gray-600'
                  }`}>
                    {event.type}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Step {index + 1}
                  </div>
                </div>
              </div>
              {index < events.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  activeEvent > index ? 'bg-green-500' : 'bg-gray-300'
                } transition-colors duration-500`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <div key={service.id} className={`p-6 rounded-lg border-2 transition-all duration-500 ${
            shouldReceiveEvent(service, events[activeEvent])
              ? `${getColorClasses(service.color).border} ${getColorClasses(service.color).light} scale-105`
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                shouldReceiveEvent(service, events[activeEvent])
                  ? getColorClasses(service.color).bg
                  : 'bg-gray-400'
              }`}>
                {renderServiceIcon(service)}
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">{service.name}</h5>
                {shouldReceiveEvent(service, events[activeEvent]) ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Receiving Event</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <X className="w-4 h-4" />
                    <span className="text-sm">Filtered Out</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div>
              <h6 className="text-xs font-medium text-gray-700 mb-2">Interested in:</h6>
              <div className="flex flex-wrap gap-1">
                {service.interests.map((interest) => (
                  <span key={interest} className={`px-2 py-1 rounded text-xs ${
                    interest === events[activeEvent].type
                      ? `${getColorClasses(service.color).light} ${getColorClasses(service.color).text} border ${getColorClasses(service.color).border}`
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Current Event Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(events[activeEvent].color).light} rounded-lg flex items-center justify-center`}>
            <Car className={`w-8 h-8 ${getColorClasses(events[activeEvent].color).text}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Current Event: {events[activeEvent].type}
            </h4>
            <p className="text-gray-700 mb-4">
              Subject: <code className="bg-gray-200 px-2 py-1 rounded text-sm">{events[activeEvent].subject}</code>
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Event Data:</h5>
                <div className="bg-white p-3 rounded border">
                  <pre className="text-sm text-gray-700">
                    {JSON.stringify(events[activeEvent].data, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Delivery Status:</h5>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm text-gray-700">{service.name}</span>
                      {shouldReceiveEvent(service, events[activeEvent]) ? (
                        <span className="text-green-600 text-sm font-medium">✅ Delivered</span>
                      ) : (
                        <span className="text-gray-500 text-sm">🚫 Filtered</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}