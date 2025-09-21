import { useState } from 'react'
import { Zap, Scale, Filter, Shield, Puzzle, Clock } from 'lucide-react'
export function EventGridBenefits() {
  const [activeBenefit, setActiveBenefit] = useState(0)
  const benefits = [
    {
      id: 'simplicity',
      title: 'Simplicity',
      icon: Zap,
      color: 'blue',
      description: 'No need to poll services for changes',
      details: 'Events just come to you automatically when they happen',
      comparison: 'vs. Building custom polling mechanisms'
    },
    {
      id: 'scalability',
      title: 'Scalability',
      icon: Scale,
      color: 'green',
      description: 'Handle millions of events per second',
      details: 'Automatic scaling without infrastructure management',
      comparison: 'vs. Managing your own event infrastructure'
    },
    {
      id: 'filtering',
      title: 'Filtering',
      icon: Filter,
      color: 'purple',
      description: 'Only receive events you care about',
      details: 'Advanced filtering by event type, subject, or custom properties',
      comparison: 'vs. Processing all events and filtering manually'
    },
    {
      id: 'reliability',
      title: 'Reliability',
      icon: Shield,
      color: 'red',
      description: 'At-least-once delivery guarantee',
      details: 'Events don\'t get lost, with built-in retry mechanisms',
      comparison: 'vs. Building your own reliability mechanisms'
    },
    {
      id: 'integration',
      title: 'Integration',
      icon: Puzzle,
      color: 'yellow',
      description: 'Works with dozens of Azure services',
      details: 'Seamless integration with Functions, Logic Apps, and more',
      comparison: 'vs. Building custom integrations for each service'
    },
    {
      id: 'real-time',
      title: 'Real-time',
      icon: Clock,
      color: 'indigo',
      description: 'Near real-time event delivery',
      details: 'Events delivered within seconds of occurrence',
      comparison: 'vs. Batch processing or delayed notifications'
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', bgActive: 'bg-blue-50' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300', bgActive: 'bg-green-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', bgActive: 'bg-purple-50' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-300', bgActive: 'bg-red-50' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', bgActive: 'bg-yellow-50' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', bgActive: 'bg-indigo-50' }
    }
    return colorMap[color as keyof typeof colorMap]
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🚀 Benefits of Event Grid</h3>
      <p className="text-gray-600 mb-8">
        Why use Event Grid instead of building direct integrations?
      </p>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {benefits.map((benefit, index) => (
          <button
            key={benefit.id}
            onClick={() => setActiveBenefit(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              activeBenefit === index
                ? `${getColorClasses(benefit.color).border} ${getColorClasses(benefit.color).bgActive} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <benefit.icon className={`w-8 h-8 mx-auto mb-2 ${
              activeBenefit === index
                ? getColorClasses(benefit.color).text
                : 'text-gray-500'
            }`} />
            <div className="text-sm font-medium text-gray-900">{benefit.title}</div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(benefits[activeBenefit].color).bg} rounded-lg flex items-center justify-center`}>
            {(() => {
              const IconComponent = benefits[activeBenefit].icon
              return <IconComponent className={`w-8 h-8 ${getColorClasses(benefits[activeBenefit].color).text}`} />
            })()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {benefits[activeBenefit].title}
            </h4>
            <p className="text-gray-700 mb-4">
              {benefits[activeBenefit].description}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">How it helps:</h5>
                <p className="text-gray-700 text-sm">
                  {benefits[activeBenefit].details}
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Alternative:</h5>
                <div className={`p-3 ${getColorClasses(benefits[activeBenefit].color).bgActive} rounded-lg border ${getColorClasses(benefits[activeBenefit].color).border}`}>
                  <p className={`text-sm ${getColorClasses(benefits[activeBenefit].color).text}`}>
                    {benefits[activeBenefit].comparison}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-900 mb-2">✅ With Event Grid</h5>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Automatic scaling and reliability</li>
            <li>• Built-in filtering and routing</li>
            <li>• No infrastructure management</li>
            <li>• Pay-per-operation pricing</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-900 mb-2">❌ Without Event Grid</h5>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Custom polling and infrastructure</li>
            <li>• Manual scaling and error handling</li>
            <li>• Complex integration code</li>
            <li>• Higher operational overhead</li>
          </ul>
        </div>
      </div>
    </div>
  )
}