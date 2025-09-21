import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Loader } from 'lucide-react'
export function AsyncProcessingDemo() {
  const [orderStep, setOrderStep] = useState(0)
  const [userSees, setUserSees] = useState('placing-order')
  const orderSteps = [
    { id: 'order-placed', label: 'Order Placed', immediate: true, time: 0 },
    { id: 'confirmation', label: 'Confirmation Shown', immediate: true, time: 100 },
    { id: 'inventory', label: 'Inventory Check', immediate: false, time: 2000 },
    { id: 'packaging', label: 'Packaging Started', immediate: false, time: 4000 },
    { id: 'dispatch', label: 'Dispatch Notification', immediate: false, time: 6000 },
    { id: 'delivery', label: 'Delivery Scheduled', immediate: false, time: 8000 }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStep((prev) => {
        if (prev < orderSteps.length - 1) {
          return prev + 1
        } else {
          // Reset the demo
          setUserSees('placing-order')
          return 0
        }
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [orderSteps.length])
  useEffect(() => {
    if (orderStep >= 1) {
      setUserSees('confirmed')
    }
  }, [orderStep])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">⚡ Asynchronous Processing Demo</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">👤 User Experience</h4>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 transition-all ${
                userSees === 'placing-order'
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  {userSees === 'placing-order' ? (
                    <Loader className="w-5 h-5 text-yellow-600 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <span className="font-medium">Placing Order...</span>
                </div>
              </div>
              <div className={`p-4 rounded-lg border-2 transition-all ${
                userSees === 'confirmed'
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`w-5 h-5 ${
                    userSees === 'confirmed' ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">Order Confirmed! ✅</span>
                </div>
                {userSees === 'confirmed' && (
                  <p className="text-sm text-green-700 mt-2">
                    User can continue shopping or leave the site
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <h5 className="font-semibold text-purple-900">Key Benefit</h5>
                <p className="text-sm text-purple-800">
                  User gets immediate feedback while background processing continues
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">🔄 Background Processing</h4>
            <div className="space-y-3">
              {orderSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all duration-500 ${
                    index <= orderStep
                      ? step.immediate
                        ? 'border-green-300 bg-green-50'
                        : 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {index <= orderStep ? (
                        <CheckCircle className={`w-4 h-4 ${
                          step.immediate ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                      )}
                      <span className="font-medium text-gray-900">{step.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {step.immediate && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Immediate
                        </span>
                      )}
                      {!step.immediate && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Async
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-900 mb-2">✅ Synchronous (Immediate)</h5>
          <p className="text-green-800 text-sm">
            Order confirmation, user feedback - must happen immediately for good UX
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-900 mb-2">⚡ Asynchronous (Background)</h5>
          <p className="text-blue-800 text-sm">
            Inventory, packaging, notifications - can happen in background without blocking user
          </p>
        </div>
      </div>
    </div>
  )
}