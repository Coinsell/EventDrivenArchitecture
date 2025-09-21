import { useState, useEffect } from 'react'
import { Car, MapPin, CreditCard, Star, Clock } from 'lucide-react'
export function UberEventFlow() {
  const [activeEvent, setActiveEvent] = useState(0)
  const events = [
    { 
      id: 'ride-requested', 
      label: 'Ride Requested', 
      icon: MapPin, 
      type: 'sync',
      description: 'User requests ride through app'
    },
    { 
      id: 'driver-assigned', 
      label: 'Driver Assigned', 
      icon: Car, 
      type: 'sync',
      description: 'System finds and assigns nearest driver'
    },
    { 
      id: 'driver-arrived', 
      label: 'Driver Arrived', 
      icon: MapPin, 
      type: 'sync',
      description: 'Driver reaches pickup location'
    },
    { 
      id: 'ride-started', 
      label: 'Ride Started', 
      icon: Car, 
      type: 'sync',
      description: 'Trip begins, tracking starts'
    },
    { 
      id: 'ride-ended', 
      label: 'Ride Ended', 
      icon: MapPin, 
      type: 'sync',
      description: 'Trip completed at destination'
    },
    { 
      id: 'payment-processed', 
      label: 'Payment Processed', 
      icon: CreditCard, 
      type: 'async',
      description: 'Automatic payment processing'
    },
    { 
      id: 'receipt-sent', 
      label: 'Receipt Sent', 
      icon: CreditCard, 
      type: 'async',
      description: 'Email receipt and trip summary'
    },
    { 
      id: 'loyalty-updated', 
      label: 'Loyalty Points Updated', 
      icon: Star, 
      type: 'async',
      description: 'Reward points added to account'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [events.length])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🚗 Exercise: Uber Event Flow</h3>
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Let's analyze which events in an Uber ride need to happen synchronously vs asynchronously:
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              activeEvent === index
                ? event.type === 'sync'
                  ? 'border-green-300 bg-green-50 scale-105'
                  : 'border-blue-300 bg-blue-50 scale-105'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activeEvent === index
                  ? event.type === 'sync'
                    ? 'bg-green-100'
                    : 'bg-blue-100'
                  : 'bg-gray-100'
              }`}>
                <event.icon className={`w-6 h-6 ${
                  activeEvent === index
                    ? event.type === 'sync'
                      ? 'text-green-600'
                      : 'text-blue-600'
                    : 'text-gray-500'
                }`} />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {event.label}
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  event.type === 'sync'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {event.type === 'sync' ? 'Synchronous' : 'Asynchronous'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 className="text-lg font-semibold text-green-900 mb-4">
            ✅ Synchronous Events (Must happen immediately)
          </h4>
          <div className="space-y-3">
            {events.filter(e => e.type === 'sync').map((event, index) => (
              <div key={event.id} className="flex items-start space-x-3">
                <event.icon className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <div className="font-medium text-green-900">{event.label}</div>
                  <div className="text-sm text-green-700">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 text-sm">
              <strong>Why sync?</strong> These events directly impact the user experience and ride flow.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">
            ⚡ Asynchronous Events (Can happen in background)
          </h4>
          <div className="space-y-3">
            {events.filter(e => e.type === 'async').map((event, index) => (
              <div key={event.id} className="flex items-start space-x-3">
                <event.icon className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-blue-900">{event.label}</div>
                  <div className="text-sm text-blue-700">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Why async?</strong> These are important but don't need to block the user experience.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Real-World Impact</h5>
            <p className="text-yellow-800 text-sm">
              By processing payments, receipts, and loyalty points asynchronously, Uber can complete 
              the ride experience immediately while handling business logic in the background. This 
              improves user satisfaction and system performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}