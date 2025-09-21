import { useState } from 'react'
import { BarChart3, Zap, Clock, Database, MessageSquare, Shield } from 'lucide-react'
export function DetailedComparison() {
  const [activeFeature, setActiveFeature] = useState(0)
  const comparisonFeatures = [
    {
      feature: 'Nature',
      icon: MessageSquare,
      eventGrid: 'Lightweight notifications',
      eventHub: 'Big data event streaming',
      serviceBus: 'Enterprise messaging',
      description: 'Core purpose and design philosophy'
    },
    {
      feature: 'Message Size',
      icon: Database,
      eventGrid: 'Small (~64 KB)',
      eventHub: 'Large (up to MBs per batch)',
      serviceBus: 'Up to 256 KB (standard), 1 MB (premium)',
      description: 'Maximum payload size per message'
    },
    {
      feature: 'Throughput',
      icon: Zap,
      eventGrid: 'High (focused on routing)',
      eventHub: 'Millions of events/sec',
      serviceBus: 'Moderate (focused on reliability)',
      description: 'Maximum events processed per second'
    },
    {
      feature: 'Delivery',
      icon: BarChart3,
      eventGrid: 'Push-based',
      eventHub: 'Stream (pull-based)',
      serviceBus: 'Queue/Topic (push/pull)',
      description: 'How messages are delivered to consumers'
    },
    {
      feature: 'Retention',
      icon: Clock,
      eventGrid: '24 hours retry',
      eventHub: 'Up to 7 days',
      serviceBus: 'Until consumed',
      description: 'How long messages are stored'
    },
    {
      feature: 'Reliability',
      icon: Shield,
      eventGrid: 'At-least-once delivery',
      eventHub: 'At-least-once per partition',
      serviceBus: 'Exactly-once with sessions',
      description: 'Delivery guarantees and reliability features'
    }
  ]
  const getServiceColor = (service: string) => {
    const colorMap = {
      eventGrid: 'text-blue-600 bg-blue-50 border-blue-200',
      eventHub: 'text-orange-600 bg-orange-50 border-orange-200',
      serviceBus: 'text-green-600 bg-green-50 border-green-200'
    }
    return colorMap[service as keyof typeof colorMap] || 'text-gray-600 bg-gray-50 border-gray-200'
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">⚖️ Side-by-Side Feature Comparison</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {comparisonFeatures.map((feature, index) => (
          <button
            key={index}
            onClick={() => setActiveFeature(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              activeFeature === index
                ? 'border-purple-300 bg-purple-50 scale-105'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <feature.icon className={`w-6 h-6 mx-auto mb-2 ${
              activeFeature === index ? 'text-purple-600' : 'text-gray-500'
            }`} />
            <div className="text-sm font-medium text-gray-900">{feature.feature}</div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-4 mb-4">
          <comparisonFeatures[activeFeature].icon className="w-8 h-8 text-purple-600" />
          <div>
            <h4 className="text-xl font-semibold text-gray-900">
              {comparisonFeatures[activeFeature].feature}
            </h4>
            <p className="text-purple-700 text-sm">
              {comparisonFeatures[activeFeature].description}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${getServiceColor('eventGrid')}`}>
            <h5 className="font-semibold mb-2">Event Grid</h5>
            <p className="text-sm">{comparisonFeatures[activeFeature].eventGrid}</p>
          </div>
          <div className={`p-4 rounded-lg border ${getServiceColor('eventHub')}`}>
            <h5 className="font-semibold mb-2">Event Hub</h5>
            <p className="text-sm">{comparisonFeatures[activeFeature].eventHub}</p>
          </div>
          <div className={`p-4 rounded-lg border ${getServiceColor('serviceBus')}`}>
            <h5 className="font-semibold mb-2">Service Bus</h5>
            <p className="text-sm">{comparisonFeatures[activeFeature].serviceBus}</p>
          </div>
        </div>
      </div>
    </div>
  )
}