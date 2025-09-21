import { useState } from 'react'
import { Cloud, Zap, Filter, Target, Database, Settings, Webhook, Globe } from 'lucide-react'
export function EventGridOverview() {
  const [activeComponent, setActiveComponent] = useState(0)
  const components = [
    {
      id: 'event-sources',
      title: 'Event Sources',
      subtitle: 'Producers',
      icon: Database,
      color: 'blue',
      description: 'Services that generate events',
      examples: [
        'Azure Blob Storage → "BlobCreated" event',
        'Azure Resource Manager → "ResourceUpdated" event',
        'Custom applications → Custom events'
      ]
    },
    {
      id: 'event-topics',
      title: 'Event Topics',
      subtitle: 'Mailboxes',
      icon: Cloud,
      color: 'yellow',
      description: 'Topics are like mailboxes for events',
      examples: [
        'System Topics → Built-in Azure services',
        'Custom Topics → Your own applications',
        'Event Domains → Multiple topics grouped'
      ]
    },
    {
      id: 'event-subscriptions',
      title: 'Event Subscriptions',
      subtitle: 'Listeners',
      icon: Filter,
      color: 'purple',
      description: 'Define who wants to listen to which events',
      examples: [
        'Filter by event type (e.g., only "BlobCreated")',
        'Filter by subject (e.g., only images)',
        'Advanced filtering with custom logic'
      ]
    },
    {
      id: 'event-handlers',
      title: 'Event Handlers',
      subtitle: 'Consumers',
      icon: Target,
      color: 'green',
      description: 'Services that process the events',
      examples: [
        'Azure Functions → Serverless code execution',
        'Logic Apps → Workflow orchestration',
        'Event Hubs → Stream to other systems',
        'Webhooks → External HTTP endpoints'
      ]
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', bgActive: 'bg-blue-50' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', bgActive: 'bg-yellow-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', bgActive: 'bg-purple-50' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300', bgActive: 'bg-green-50' }
    }
    return colorMap[color as keyof typeof colorMap]
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏗️ Key Concepts in Event Grid</h3>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {components.map((component, index) => (
          <button
            key={component.id}
            onClick={() => setActiveComponent(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activeComponent === index
                ? `${getColorClasses(component.color).border} ${getColorClasses(component.color).bgActive} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`w-12 h-12 ${getColorClasses(component.color).bg} rounded-lg flex items-center justify-center mb-3`}>
              <component.icon className={`w-6 h-6 ${getColorClasses(component.color).text}`} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{component.title}</h4>
            <p className="text-sm text-gray-600">{component.subtitle}</p>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(components[activeComponent].color).bg} rounded-lg flex items-center justify-center`}>
            {(() => {
              const IconComponent = components[activeComponent].icon
              return <IconComponent className={`w-8 h-8 ${getColorClasses(components[activeComponent].color).text}`} />
            })()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {components[activeComponent].title}
            </h4>
            <p className="text-gray-700 mb-4">
              {components[activeComponent].description}
            </p>
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Examples:</h5>
              <ul className="space-y-2">
                {components[activeComponent].examples.map((example, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 ${getColorClasses(components[activeComponent].color).bg} rounded-full mt-2`}></div>
                    <span className="text-gray-700 text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-blue-600" />
          <div>
            <h5 className="font-semibold text-blue-900">What is Event Grid?</h5>
            <p className="text-blue-800 text-sm">
              A fully managed event routing service that helps build reactive, event-driven applications 
              without custom pipelines or scaling concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}