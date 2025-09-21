import { useState, useEffect } from 'react'
import { Filter, Route, Zap, Users, CreditCard, Truck, BarChart3, CheckCircle, X, ArrowRight } from 'lucide-react'
export function EventRoutingFiltering() {
  const [activeDemo, setActiveDemo] = useState<'routing' | 'filtering'>('routing')
  const [activeEvent, setActiveEvent] = useState(0)
  const events = [
    { id: 'OrderCreated', type: 'OrderCreated', subject: 'orders/1234', color: 'blue' },
    { id: 'OrderPaid', type: 'OrderPaid', subject: 'orders/1234/paid', color: 'green' },
    { id: 'OrderShipped', type: 'OrderShipped', subject: 'orders/1234/shipped', color: 'purple' },
    { id: 'OrderCancelled', type: 'OrderCancelled', subject: 'orders/1234/cancelled', color: 'red' }
  ]
  const subscribers = [
    {
      id: 'billing',
      name: 'Billing Service',
      icon: CreditCard,
      color: 'green',
      interests: ['OrderPaid'],
      filters: { eventType: 'OrderPaid', subject: 'orders/*/paid' }
    },
    {
      id: 'shipping',
      name: 'Shipping Service',
      icon: Truck,
      color: 'purple',
      interests: ['OrderShipped'],
      filters: { eventType: 'OrderShipped', subject: 'orders/*/shipped' }
    },
    {
      id: 'analytics',
      name: 'Analytics Service',
      icon: BarChart3,
      color: 'orange',
      interests: ['OrderCreated', 'OrderPaid', 'OrderShipped', 'OrderCancelled'],
      filters: { eventType: '*', subject: 'orders/*' }
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [events.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const shouldReceiveEvent = (subscriber: typeof subscribers[0], event: typeof events[0]) => {
    return subscriber.interests.includes(event.type)
  }
  const renderSubscriberIcon = (subscriber: typeof subscribers[0]) => {
    const IconComponent = subscriber.icon
    return <IconComponent className="w-6 h-6 text-white" />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Event Routing & Filtering</h3>
      <p className="text-gray-600 mb-8">
        Making sure events reach the right consumers with advanced filtering and routing logic
      </p>
      {/* Demo Toggle */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setActiveDemo('routing')}
          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            activeDemo === 'routing'
              ? 'border-blue-300 bg-blue-100 text-blue-900 scale-105'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Route className={`w-6 h-6 ${activeDemo === 'routing' ? 'text-blue-600' : 'text-gray-500'}`} />
            <div className="text-left">
              <h4 className="font-semibold">Event Routing</h4>
              <p className="text-sm">Path from producer to subscriber</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setActiveDemo('filtering')}
          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            activeDemo === 'filtering'
              ? 'border-green-300 bg-green-100 text-green-900 scale-105'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Filter className={`w-6 h-6 ${activeDemo === 'filtering' ? 'text-green-600' : 'text-gray-500'}`} />
            <div className="text-left">
              <h4 className="font-semibold">Event Filtering</h4>
              <p className="text-sm">Only relevant events reach consumers</p>
            </div>
          </div>
        </button>
      </div>
      {/* Main Visualization */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg border overflow-hidden" style={{ height: '500px' }}>
        {/* Event Producer */}
        <div className="absolute left-8 top-8">
          <div className="w-20 h-20 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="text-center mt-3 w-20">
            <div className="font-semibold text-gray-900 text-sm">Order Service</div>
            <div className="text-xs text-gray-600 mt-1">Producer</div>
          </div>
        </div>
        {/* Event Topic */}
        <div className="absolute left-1/2 top-8 transform -translate-x-1/2">
          <div className="w-24 h-20 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div className="text-center mt-3 w-24">
            <div className="font-semibold text-gray-900 text-sm">OrderEvents</div>
            <div className="text-xs text-gray-600 mt-1">Topic</div>
          </div>
        </div>
        {/* Arrow from Producer to Topic */}
        <div className="absolute left-32 top-12">
          <ArrowRight className="w-8 h-8 text-indigo-500 animate-pulse" />
        </div>
        {/* Current Event Display */}
        <div className="absolute left-1/2 top-32 transform -translate-x-1/2">
          <div className={`px-4 py-2 rounded-lg border-2 ${
            getColorClasses(events[activeEvent].color).border
          } ${getColorClasses(events[activeEvent].color).light} animate-pulse`}>
            <div className="text-center">
              <div className={`font-semibold ${getColorClasses(events[activeEvent].color).text}`}>
                {events[activeEvent].type}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {events[activeEvent].subject}
              </div>
            </div>
          </div>
        </div>
        {/* Subscribers */}
        {subscribers.map((subscriber, index) => (
          <div key={subscriber.id}>
            {/* Subscriber Node */}
            <div
              className="absolute transform -translate-x-1/2"
              style={{
                right: '60px',
                top: `${25 + index * 25}%`
              }}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                shouldReceiveEvent(subscriber, events[activeEvent])
                  ? getColorClasses(subscriber.color).bg + ' scale-110 animate-pulse'
                  : 'bg-gray-400 scale-100'
              }`}>
                {renderSubscriberIcon(subscriber)}
              </div>
              <div className="text-center mt-3 w-16">
                <div className={`text-xs font-medium leading-tight ${
                  shouldReceiveEvent(subscriber, events[activeEvent]) ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {subscriber.name}
                </div>
              </div>
            </div>
            {/* Connection Line */}
            <svg 
              className="absolute pointer-events-none"
              style={{
                left: '62%',
                top: '20%',
                width: '28%',
                height: `${(25 + index * 25) - 20}%`
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke={shouldReceiveEvent(subscriber, events[activeEvent]) 
                  ? getColorClasses(subscriber.color).bg.replace('bg-', '') 
                  : '#d1d5db'
                }
                strokeWidth="3"
                strokeDasharray={shouldReceiveEvent(subscriber, events[activeEvent]) ? "none" : "8,4"}
                className={shouldReceiveEvent(subscriber, events[activeEvent]) ? 'animate-pulse' : ''}
              />
            </svg>
            {/* Filter Status */}
            <div
              className="absolute transform -translate-x-1/2"
              style={{
                right: '20px',
                top: `${25 + index * 25 + 8}%`
              }}
            >
              {shouldReceiveEvent(subscriber, events[activeEvent]) ? (
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs border border-green-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>Match</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-300">
                  <X className="w-3 h-3" />
                  <span>Filtered</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Current Event Info */}
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-gray-900">Current Event:</h5>
              <p className={`text-sm ${getColorClasses(events[activeEvent].color).text} font-medium`}>
                {events[activeEvent].type} - {events[activeEvent].subject}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600">Delivered to:</div>
              <div className="text-sm font-medium text-gray-900">
                {subscribers.filter(s => shouldReceiveEvent(s, events[activeEvent])).length} of {subscribers.length} services
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}