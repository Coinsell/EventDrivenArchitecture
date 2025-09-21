import { useState, useEffect } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle, Users, ShoppingCart } from 'lucide-react'
export function BlackFridayScenario() {
  const [orderCount, setOrderCount] = useState(0)
  const [systemLoad, setSystemLoad] = useState(0)
  const [isBlackFriday, setIsBlackFriday] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isBlackFriday) {
        setOrderCount(prev => prev + Math.floor(Math.random() * 1000) + 500)
        setSystemLoad(prev => Math.min(prev + Math.random() * 10, 100))
      } else {
        setOrderCount(prev => prev + Math.floor(Math.random() * 50) + 10)
        setSystemLoad(prev => Math.max(prev - 2, 20))
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isBlackFriday])
  const getSystemStatus = () => {
    if (systemLoad < 50) return { status: 'Healthy', color: 'green', icon: CheckCircle }
    if (systemLoad < 80) return { status: 'Warning', color: 'yellow', icon: AlertTriangle }
    return { status: 'Critical', color: 'red', icon: AlertTriangle }
  }
  const systemStatus = getSystemStatus()
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🛍️ Black Friday Scenario</h3>
      <p className="text-gray-600 mb-8">
        See how event-driven architecture handles traffic spikes vs traditional systems
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Traffic Control</h4>
            <div className="space-y-4">
              <button
                onClick={() => setIsBlackFriday(false)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  !isBlackFriday
                    ? 'border-blue-300 bg-blue-100 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                🛒 Normal Shopping Day
              </button>
              <button
                onClick={() => setIsBlackFriday(true)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  isBlackFriday
                    ? 'border-red-300 bg-red-100 text-red-900'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                🔥 Black Friday Sale!
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h5 className="font-semibold text-gray-900 mb-4">Real-time Metrics</h5>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Orders per minute:</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`w-4 h-4 ${isBlackFriday ? 'text-red-600' : 'text-blue-600'}`} />
                  <span className={`font-bold ${isBlackFriday ? 'text-red-600' : 'text-blue-600'}`}>
                    {orderCount.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">System Load:</span>
                <div className="flex items-center space-x-2">
                  <systemStatus.icon className={`w-4 h-4 text-${systemStatus.color}-600`} />
                  <span className={`font-bold text-${systemStatus.color}-600`}>
                    {Math.round(systemLoad)}% - {systemStatus.status}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    systemLoad < 50 ? 'bg-green-500' :
                    systemLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${systemLoad}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className={`p-6 rounded-lg border-2 transition-all ${
            isBlackFriday ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'
          }`}>
            <h4 className="text-lg font-semibold mb-4">
              {isBlackFriday ? '🚨 Traditional System Response' : '✅ Event-Driven System Response'}
            </h4>
            {isBlackFriday ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">Checkout system overloaded</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">Payment processing delays</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">Inventory service timeout</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">Customer experience degraded</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Orders processed instantly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Events queued safely</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Services scale automatically</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Smooth customer experience</span>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-900 mb-4">Event-Driven Advantage</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-purple-600 mt-1" />
                <span className="text-purple-800">
                  <strong>Checkout:</strong> Just says "Order placed" and moves on
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <ShoppingCart className="w-4 h-4 text-purple-600 mt-1" />
                <span className="text-purple-800">
                  <strong>Event Grid:</strong> Queues events safely for processing
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-600 mt-1" />
                <span className="text-purple-800">
                  <strong>Services:</strong> Scale independently based on load
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Key Insight</h5>
            <p className="text-yellow-800 text-sm">
              Event-driven architecture turns a fragile, tightly coupled workflow into a resilient, 
              scalable, cloud-native solution that can handle any traffic spike gracefully.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}