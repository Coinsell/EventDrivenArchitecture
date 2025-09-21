import { useState, useEffect } from 'react'
import { ShoppingCart, BarChart3, CreditCard, Mail, Tv, Newspaper } from 'lucide-react'
export function RetailStoreExample() {
  const [activeScenario, setActiveScenario] = useState(0)
  const scenarios = [
    {
      id: 'order-placed',
      title: 'Order Placed Event',
      service: 'Event Grid',
      icon: Newspaper,
      color: 'blue',
      description: 'Customer places a new order',
      action: 'Event Grid raises "Order Created" event',
      result: 'Triggers Azure Function to send confirmation email',
      why: 'Lightweight notification for reactive automation'
    },
    {
      id: 'user-activity',
      title: 'User Activity Streaming',
      service: 'Event Hub',
      icon: Tv,
      color: 'orange',
      description: 'Clicks, browsing, product views',
      action: 'All activity streamed to Event Hub',
      result: 'Real-time analytics and personalized recommendations',
      why: 'High-volume streaming data for analytics'
    },
    {
      id: 'order-processing',
      title: 'Order Transaction',
      service: 'Service Bus',
      icon: Mail,
      color: 'green',
      description: 'Payment, inventory, shipping workflow',
      action: 'Critical business logic via Service Bus',
      result: 'Guaranteed processing with retry and ordering',
      why: 'Mission-critical operations requiring reliability'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % scenarios.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [scenarios.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🛒 Real-World Example: Online Retail Store</h3>
      <p className="text-gray-600 mb-8">
        See how all three services work together in a complete e-commerce solution
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className={`p-6 rounded-lg border-2 transition-all duration-500 ${
              activeScenario === index
                ? `${getColorClasses(scenario.color).border} ${getColorClasses(scenario.color).light} scale-105`
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activeScenario === index ? getColorClasses(scenario.color).bg : 'bg-gray-300'
              }`}>
                <scenario.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{scenario.service}</h4>
                <p className="text-sm text-gray-600">{scenario.title}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Scenario:</h5>
                <p className="text-sm text-gray-700">{scenario.description}</p>
              </div>
              {activeScenario === index && (
                <div className="space-y-2 animate-fade-in">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Action:</h5>
                    <p className="text-sm text-gray-700">{scenario.action}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Result:</h5>
                    <p className="text-sm text-gray-700">{scenario.result}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${getColorClasses(scenario.color).light} border ${getColorClasses(scenario.color).border}`}>
                    <h5 className="text-sm font-medium text-gray-900">Why this service?</h5>
                    <p className={`text-sm ${getColorClasses(scenario.color).text}`}>{scenario.why}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <h4 className="font-semibold text-gray-900 mb-4">🎯 Key Insight</h4>
        <p className="text-gray-700 mb-4">
          Each service plays a different role in the same application. They complement each other 
          rather than compete - that's the power of having all three available in Azure.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-800">Event Grid = Reactive triggers</span>
          </div>
          <div className="flex items-center space-x-3">
            <Tv className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-800">Event Hub = High-volume ingestion</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">Service Bus = Reliable workflows</span>
          </div>
        </div>
      </div>
    </div>
  )
}