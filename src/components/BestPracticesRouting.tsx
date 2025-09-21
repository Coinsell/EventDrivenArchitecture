import { useState } from 'react'
import { CheckCircle, AlertTriangle, FileText, Filter, Shield, BarChart3, Lightbulb } from 'lucide-react'
export function BestPracticesRouting() {
  const [activePractice, setActivePractice] = useState(0)
  const bestPractices = [
    {
      id: 'clear-topics',
      title: 'Define Clear Topics',
      icon: FileText,
      color: 'blue',
      description: 'Group related events logically',
      good: ['OrderEvents', 'UserEvents', 'PaymentEvents'],
      bad: ['AllEvents', 'MiscEvents', 'DataEvents'],
      tip: 'Use domain-driven design principles to organize topics'
    },
    {
      id: 'use-filters',
      title: 'Use Event Type & Subject Filters',
      icon: Filter,
      color: 'green',
      description: 'Avoid sending irrelevant events',
      good: ['eventType = "OrderPaid"', 'subject = "orders/*/paid"'],
      bad: ['No filtering', 'Overly broad filters'],
      tip: 'Start with event type filtering, then add subject patterns'
    },
    {
      id: 'advanced-sparingly',
      title: 'Use Advanced Filters Sparingly',
      icon: AlertTriangle,
      color: 'orange',
      description: 'They\'re powerful but add complexity',
      good: ['data.amount > 1000', 'data.region = "US"'],
      bad: ['Complex nested conditions', 'Too many advanced filters'],
      tip: 'Consider moving complex logic to the consumer instead'
    },
    {
      id: 'monitor',
      title: 'Monitor Your Subscriptions',
      icon: BarChart3,
      color: 'purple',
      description: 'Track delivery failures and dead-letter events',
      good: ['Set up alerts', 'Monitor delivery rates', 'Track dead letters'],
      bad: ['No monitoring', 'Ignoring failures', 'No alerting'],
      tip: 'Use Azure Monitor and Application Insights for visibility'
    },
    {
      id: 'document',
      title: 'Document Event Contracts',
      icon: Shield,
      color: 'indigo',
      description: 'Make it easy for consumers to know what to expect',
      good: ['Schema documentation', 'Event catalogs', 'Version history'],
      bad: ['No documentation', 'Undocumented changes', 'No versioning'],
      tip: 'Treat events like APIs - they need proper documentation'
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderPracticeIcon = (practice: typeof bestPractices[0], isActive: boolean) => {
    const IconComponent = practice.icon
    return <IconComponent className={`w-6 h-6 ${
      isActive ? getColorClasses(practice.color).text : 'text-gray-500'
    }`} />
  }
  const renderActivePracticeIcon = () => {
    const activePracticeData = bestPractices[activePractice]
    const IconComponent = activePracticeData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activePracticeData.color).text}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📋 Best Practices for Routing & Filtering</h3>
      <p className="text-gray-600 mb-8">
        Five essential practices to ensure your event-driven system stays maintainable and efficient
      </p>
      {/* Practice Selector */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {bestPractices.map((practice, index) => (
          <button
            key={practice.id}
            onClick={() => setActivePractice(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activePractice === index
                ? `${getColorClasses(practice.color).border} ${getColorClasses(practice.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              {renderPracticeIcon(practice, activePractice === index)}
              <span className="text-sm font-medium text-gray-900">{index + 1}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{practice.title}</h4>
            <p className="text-sm text-gray-600">{practice.description}</p>
          </button>
        ))}
      </div>
      {/* Active Practice Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-16 h-16 ${getColorClasses(bestPractices[activePractice].color).light} rounded-lg flex items-center justify-center`}>
            {renderActivePracticeIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {bestPractices[activePractice].title}
            </h4>
            <p className="text-gray-700 mb-4">{bestPractices[activePractice].description}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-green-700 mb-3 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>✅ Good Examples:</span>
            </h5>
            <div className="space-y-2">
              {bestPractices[activePractice].good.map((example, index) => (
                <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <code className="text-green-800 text-sm">{example}</code>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-red-700 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>❌ Avoid These:</span>
            </h5>
            <div className="space-y-2">
              {bestPractices[activePractice].bad.map((example, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <code className="text-red-800 text-sm">{example}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h6 className="font-semibold text-yellow-900">💡 Pro Tip</h6>
              <p className="text-yellow-800 text-sm mt-1">
                {bestPractices[activePractice].tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}