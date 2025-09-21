import { useState } from 'react'
import { CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react'
export function DecisionMatrix() {
  const [selectedScenario, setSelectedScenario] = useState(0)
  const scenarios = [
    {
      title: 'File Upload Notification',
      description: 'Need to notify multiple services when a file is uploaded to blob storage',
      requirements: ['Lightweight notification', 'Multiple subscribers', 'Near real-time'],
      recommendation: 'Event Grid',
      reason: 'Perfect for discrete events with multiple reactive consumers'
    },
    {
      title: 'IoT Sensor Data',
      description: 'Millions of temperature sensors sending readings every second',
      requirements: ['High throughput', 'Streaming data', 'Analytics processing'],
      recommendation: 'Event Hub',
      reason: 'Designed for massive scale streaming telemetry data'
    },
    {
      title: 'Payment Processing',
      description: 'Credit card transactions that must be processed reliably',
      requirements: ['Guaranteed delivery', 'Ordered processing', 'No data loss'],
      recommendation: 'Service Bus',
      reason: 'Enterprise messaging with reliability guarantees'
    },
    {
      title: 'User Activity Tracking',
      description: 'Track every click and interaction on a website',
      requirements: ['High volume', 'Real-time analytics', 'Continuous stream'],
      recommendation: 'Event Hub',
      reason: 'Streaming platform for continuous user behavior data'
    },
    {
      title: 'Order Workflow',
      description: 'Multi-step order processing with inventory and shipping',
      requirements: ['Reliable messaging', 'Transaction support', 'Error handling'],
      recommendation: 'Service Bus',
      reason: 'Complex workflows need guaranteed message delivery'
    },
    {
      title: 'Resource Monitoring',
      description: 'React when Azure resources are created or deleted',
      requirements: ['Event-driven', 'Automation triggers', 'Serverless'],
      recommendation: 'Event Grid',
      reason: 'Built-in Azure resource events with serverless integration'
    }
  ]
  const getRecommendationColor = (recommendation: string) => {
    const colorMap = {
      'Event Grid': 'text-blue-600 bg-blue-50 border-blue-200',
      'Event Hub': 'text-orange-600 bg-orange-50 border-orange-200',
      'Service Bus': 'text-green-600 bg-green-50 border-green-200'
    }
    return colorMap[recommendation as keyof typeof colorMap] || 'text-gray-600 bg-gray-50 border-gray-200'
  }
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Event Grid': return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'Event Hub': return <AlertCircle className="w-5 h-5 text-orange-600" />
      case 'Service Bus': return <XCircle className="w-5 h-5 text-green-600" />
      default: return <HelpCircle className="w-5 h-5 text-gray-600" />
    }
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Decision Matrix: Which Service to Choose?</h3>
      <p className="text-gray-600 mb-8">
        Interactive scenarios to help you choose the right Azure messaging service
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {scenarios.map((scenario, index) => (
          <button
            key={index}
            onClick={() => setSelectedScenario(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedScenario === index
                ? 'border-purple-300 bg-purple-50 scale-105'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <h4 className="font-semibold text-gray-900 mb-2">{scenario.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${
              getRecommendationColor(scenario.recommendation)
            }`}>
              {getRecommendationIcon(scenario.recommendation)}
              <span className="text-sm font-medium">{scenario.recommendation}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
            {getRecommendationIcon(scenarios[selectedScenario].recommendation)}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {scenarios[selectedScenario].title}
            </h4>
            <p className="text-gray-700 mb-4">{scenarios[selectedScenario].description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Requirements:</h5>
                <ul className="space-y-2">
                  {scenarios[selectedScenario].requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Recommendation:</h5>
                <div className={`p-4 rounded-lg border ${getRecommendationColor(scenarios[selectedScenario].recommendation)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {getRecommendationIcon(scenarios[selectedScenario].recommendation)}
                    <span className="font-semibold">{scenarios[selectedScenario].recommendation}</span>
                  </div>
                  <p className="text-sm">{scenarios[selectedScenario].reason}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h5 className="font-semibold text-yellow-900 mb-2">💡 Decision Framework</h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-blue-800">
            <strong>Choose Event Grid when:</strong> You need lightweight notifications and reactive automation
          </div>
          <div className="text-orange-800">
            <strong>Choose Event Hub when:</strong> You have high-volume streaming data for analytics
          </div>
          <div className="text-green-800">
            <strong>Choose Service Bus when:</strong> You need guaranteed delivery and reliable workflows
          </div>
        </div>
      </div>
    </div>
  )
}