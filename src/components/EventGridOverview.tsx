import { useState, useEffect } from 'react'
import { Cloud, Zap, Filter, Target, CheckCircle, ArrowRight } from 'lucide-react'
export function EventGridOverview() {
  const [activeFeature, setActiveFeature] = useState(0)
  const features = [
    {
      icon: Cloud,
      title: 'Fully Managed',
      description: 'No infrastructure to manage',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Scalable',
      description: 'Millions of events per second',
      color: 'yellow'
    },
    {
      icon: Filter,
      title: 'Smart Filtering',
      description: 'Only receive events you care about',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Reliable Delivery',
      description: 'At-least-once delivery guarantee',
      color: 'purple'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [features.length])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Azure Event Grid</h3>
        <p className="text-lg text-gray-600">The Post Office of Azure Events</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 transition-all duration-500 ${
              activeFeature === index
                ? `border-${feature.color}-300 bg-${feature.color}-50 scale-105`
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <feature.icon className={`w-8 h-8 mb-4 ${
              activeFeature === index
                ? `text-${feature.color}-600`
                : 'text-gray-500'
            }`} />
            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Central Nervous System</h4>
            <p className="text-blue-800">
              Event Grid acts as the central nervous system for events in your Azure environment, 
              connecting producers and consumers seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}