import { useState, useEffect } from 'react'
import { Radio, Users, Filter, Bell, TrendingUp, Globe } from 'lucide-react'
export function NewsAnalogy() {
  const [activeSubscriber, setActiveSubscriber] = useState(0)
  const newsAgencies = [
    { name: 'Sports News', icon: TrendingUp, color: 'green' },
    { name: 'Finance News', icon: Globe, color: 'blue' },
    { name: 'Weather Updates', icon: Bell, color: 'yellow' }
  ]
  const subscribers = [
    {
      name: 'Sports Fan',
      interests: ['Sports News'],
      icon: TrendingUp,
      color: 'green',
      description: 'Only wants sports updates'
    },
    {
      name: 'Business Analyst',
      interests: ['Finance News', 'Weather Updates'],
      icon: Globe,
      color: 'blue',
      description: 'Needs finance and weather data'
    },
    {
      name: 'General Reader',
      interests: ['Sports News', 'Finance News', 'Weather Updates'],
      icon: Users,
      color: 'purple',
      description: 'Subscribes to all news types'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubscriber((prev) => (prev + 1) % subscribers.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [subscribers.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📻 Analogy: Event Grid as News Broadcaster</h3>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* News Agencies */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📰 News Agencies</h4>
          <p className="text-sm text-gray-600 mb-4">(Event Sources)</p>
          <div className="space-y-3">
            {newsAgencies.map((agency, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getColorClasses(agency.color).border} ${getColorClasses(agency.color).light}`}
              >
                <div className="flex items-center space-x-3">
                  <agency.icon className={`w-5 h-5 ${getColorClasses(agency.color).text}`} />
                  <span className="font-medium text-gray-900">{agency.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Event Grid Broadcaster */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Event Grid</h4>
          <p className="text-sm text-gray-600 text-center mb-4">The Broadcaster</p>
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Filter className="w-4 h-4" />
            <span>Smart Filtering</span>
          </div>
        </div>
        {/* Subscribers */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">👥 Subscribers</h4>
          <p className="text-sm text-gray-600 mb-4">(Event Handlers)</p>
          <div className="space-y-3">
            {subscribers.map((subscriber, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                  activeSubscriber === index
                    ? `${getColorClasses(subscriber.color).border} ${getColorClasses(subscriber.color).light} scale-105`
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <subscriber.icon className={`w-5 h-5 ${
                    activeSubscriber === index
                      ? getColorClasses(subscriber.color).text
                      : 'text-gray-500'
                  }`} />
                  <span className="font-medium text-gray-900">{subscriber.name}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{subscriber.description}</p>
                <div className="flex flex-wrap gap-1">
                  {subscriber.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4">🎯 Current Subscriber Focus</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-blue-800 mb-2">
              {subscribers[activeSubscriber].name}
            </h5>
            <p className="text-blue-700 text-sm mb-3">
              {subscribers[activeSubscriber].description}
            </p>
            <div className="space-y-1">
              <p className="text-xs font-medium text-blue-800">Subscribed to:</p>
              {subscribers[activeSubscriber].interests.map((interest, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-700">{interest}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-medium text-gray-900 mb-2">Key Benefits</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• No direct dependency on news sources</li>
              <li>• Only receives relevant news</li>
              <li>• Can change subscriptions anytime</li>
              <li>• Sources don't know about subscribers</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Radio className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <h5 className="font-semibold text-green-900">Perfect Analogy</h5>
            <p className="text-green-800 text-sm">
              Just like a news broadcaster, Event Grid receives events from various sources 
              and delivers them to subscribers based on their interests. Everyone gets only 
              what they care about, without direct connections between sources and consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}