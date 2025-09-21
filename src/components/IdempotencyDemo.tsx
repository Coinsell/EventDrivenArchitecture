import { useState, useEffect } from 'react'
import { RefreshCw, AlertTriangle, CheckCircle, CreditCard } from 'lucide-react'
export function IdempotencyDemo() {
  const [eventCount, setEventCount] = useState(0)
  const [processedCount, setProcessedCount] = useState(0)
  const [isIdempotent, setIsIdempotent] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const sendEvent = () => {
    setEventCount(prev => prev + 1)
    setIsProcessing(true)
    setTimeout(() => {
      if (isIdempotent) {
        // Idempotent: only process once regardless of duplicates
        setProcessedCount(1)
      } else {
        // Non-idempotent: process every event
        setProcessedCount(prev => prev + 1)
      }
      setIsProcessing(false)
    }, 1000)
  }
  const reset = () => {
    setEventCount(0)
    setProcessedCount(0)
    setIsProcessing(false)
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔄 Idempotency: Handling Duplicate Events</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => {setIsIdempotent(false); reset();}}
          className={`p-4 rounded-lg border-2 transition-all ${
            !isIdempotent
              ? 'border-red-300 bg-red-100 text-red-900'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6" />
            <div className="text-left">
              <h4 className="font-semibold">Non-Idempotent</h4>
              <p className="text-sm">Processes every event</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => {setIsIdempotent(true); reset();}}
          className={`p-4 rounded-lg border-2 transition-all ${
            isIdempotent
              ? 'border-green-300 bg-green-100 text-green-900'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6" />
            <div className="text-left">
              <h4 className="font-semibold">Idempotent</h4>
              <p className="text-sm">Handles duplicates safely</p>
            </div>
          </div>
        </button>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Processing Simulation</h4>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <div className="font-semibold text-gray-900">Events Received</div>
            <div className="text-2xl font-bold text-blue-600">{eventCount}</div>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 ${
              isProcessing ? 'bg-yellow-100' : 'bg-gray-100'
            }`}>
              <CreditCard className={`w-8 h-8 ${
                isProcessing ? 'text-yellow-600 animate-pulse' : 'text-gray-600'
              }`} />
            </div>
            <div className="font-semibold text-gray-900">Processing</div>
            <div className="text-sm text-gray-600">
              {isProcessing ? 'In Progress...' : 'Ready'}
            </div>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 ${
              processedCount > 1 ? 'bg-red-100' : 'bg-green-100'
            }`}>
              <CheckCircle className={`w-8 h-8 ${
                processedCount > 1 ? 'text-red-600' : 'text-green-600'
              }`} />
            </div>
            <div className="font-semibold text-gray-900">Payments Processed</div>
            <div className={`text-2xl font-bold ${
              processedCount > 1 ? 'text-red-600' : 'text-green-600'
            }`}>
              {processedCount}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={sendEvent}
            disabled={isProcessing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send "OrderPaid" Event
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <div className={`p-4 rounded-lg border ${
        isIdempotent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-start space-x-3">
          {isIdempotent ? (
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
          )}
          <div>
            <h5 className={`font-semibold ${
              isIdempotent ? 'text-green-900' : 'text-red-900'
            }`}>
              {isIdempotent ? 'Idempotent Implementation' : 'Non-Idempotent Risk'}
            </h5>
            <p className={`text-sm ${
              isIdempotent ? 'text-green-800' : 'text-red-800'
            }`}>
              {isIdempotent 
                ? 'Payment service checks if order was already processed using order ID. Duplicate events are safely ignored.'
                : 'Payment service processes every event without checking. Customer could be charged multiple times!'
              }
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-900 mb-2">💡 Implementation Strategies</h5>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Use unique event IDs to track processed events</li>
          <li>• Implement database constraints to prevent duplicates</li>
          <li>• Use conditional operations (e.g., "insert if not exists")</li>
          <li>• Store processing state to enable safe retries</li>
        </ul>
      </div>
    </div>
  )
}