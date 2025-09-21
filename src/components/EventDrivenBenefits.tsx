import { useState } from 'react'
import { Zap, Settings, Database, Users, CheckCircle, ArrowRight } from 'lucide-react'
export function EventDrivenBenefits() {
  const [activeBenefit, setActiveBenefit] = useState(0)
  const benefits = [
    {
      id: 'dispatcher',
      title: 'Event Grid as Dispatcher',
      icon: Zap,
      color: 'blue',
      description: 'Central routing hub for all events',
      details: [
        'Single point of event routing',
        'Intelligent filtering and routing',
        'Handles millions of events per second',
        'Built-in retry and dead letter handling'
      ]
    },
    {
      id: 'elastic',
      title: 'Elastic Processing',
      icon: Settings,
      color: 'green',
      description: 'Azure Functions scale automatically',
      details: [
        'Serverless compute that scales to zero',
        'Automatic scaling during high load',
        'Pay only for actual execution time',
        'Multiple instances handle parallel events'
      ]
    },
    {
      id: 'storage',
      title: 'Flexible Storage',
      icon: Database,
      color: 'purple',
      description: 'Multiple storage options for different needs',
      details: [
        'Cosmos DB for fast NoSQL access',
        'Blob Storage for files and documents',
        'SQL Database for relational data',
        'Event Hub for streaming analytics'
      ]
    },
    {
      id: 'parallel',
      title: 'Parallel Subscribers',
      icon: Users,
      color: 'orange',
      description: 'Multiple services react to same event',
      details: [
        'Email service sends confirmations',
        'Fulfillment service prepares shipment',
        'Billing system processes payment',
        'Analytics service tracks metrics'
      ]
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderActiveBenefitIcon = () => {
    const activeBenefitData = benefits[activeBenefit]
    const IconComponent = activeBenefitData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activeBenefitData.color).text}`} />
  }
  const renderBenefitIcon = (benefit: typeof benefits[0], isActive: boolean) => {
    const IconComponent = benefit.icon
    return <IconComponent className={`w-8 h-8 mb-3 ${
      isActive ? getColorClasses(benefit.color).text : 'text-gray-500'
    }`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Event-Driven Architecture Benefits</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {benefits.map((benefit, index) => (
          <button
            key={benefit.id}
            onClick={() => setActiveBenefit(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activeBenefit === index
                ? `${getColorClasses(benefit.color).border} ${getColorClasses(benefit.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {renderBenefitIcon(benefit, activeBenefit === index)}
            <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(benefits[activeBenefit].color).light} rounded-lg flex items-center justify-center`}>
            {renderActiveBenefitIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {benefits[activeBenefit].title}
            </h4>
            <p className="text-gray-700 mb-4">{benefits[activeBenefit].description}</p>
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-900">Key Features:</h5>
              <ul className="space-y-2">
                {benefits[activeBenefit].details.map((detail, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${getColorClasses(benefits[activeBenefit].color).text}`} />
                    <span className="text-gray-700 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-4">🚀 Architecture Summary</h4>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Resilient</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Scalable</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Cloud-Native</span>
          </div>
        </div>
      </div>
    </div>
  )
}