import { useState, useEffect } from 'react'
import { Database, Mail, Users, Settings, ArrowRight, Filter } from 'lucide-react'
export function EventGridConcepts() {
  const [activeConcept, setActiveConcept] = useState(0)
  const concepts = [
    {
      id: 'sources',
      title: 'Event Sources',
      subtitle: 'Producers',
      icon: Database,
      color: 'blue',
      description: 'Services that generate events',
      examples: [
        'Azure Blob Storage → BlobCreated',
        'Azure Resource Manager → ResourceUpdated',
        'Custom Applications → Custom Events',
        'Azure Key Vault → SecretUpdated'
      ]
    },
    {
      id: 'topics',
      title: 'Event Topics',
      subtitle: 'Mailboxes',
      icon: Mail,
      color: 'yellow',
      description: 'Endpoints where events are published',
      examples: [
        'System Topics (Built-in Azure services)',
        'Custom Topics (Your applications)',
        'Partner Topics (Third-party services)',
        'Domain Topics (Grouped by domain)'
      ]
    },
    {
      id: 'subscriptions',
      title: 'Event Subscriptions',
      subtitle: 'Listeners',
      icon: Users,
      color: 'green',
      description: 'Define who listens to which events',
      examples: [
        'Filter by event type',
        'Filter by subject prefix',
        'Advanced filtering with operators',
        'Dead letter configuration'
      ]
    },
    {
      id: 'handlers',
      title: 'Event Handlers',
      subtitle: 'Consumers',
      icon: Settings,
      color: 'purple',
      description: 'Services that process the events',
      examples: [
        'Azure Functions → Serverless code',
        'Logic Apps → Workflow orchestration',
        'Event Hubs → Stream processing',
        'Webhooks → External endpoints'
      ]
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConcept((prev) => (prev + 1) % concepts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [concepts.length])
  const getColorClasses = (color: string, type: 'border' | 'bg' | 'text') => {
    const colorMap = {
      blue: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-600' },
      yellow: { border: 'border-yellow-300', bg: 'bg-yellow-50', text: 'text-yellow-600' },
      green: { border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-600' },
      purple: { border: 'border-purple-300', bg: 'bg-purple-50', text: 'text-purple-600' }
    }
    return colorMap[color as keyof typeof colorMap]?.[type] || ''
  }
  const getBgColorClass = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-blue-100'
  }
  const getTextColorClass = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      purple: 'text-purple-600'
    }
    return colorMap[color as keyof typeof colorMap] || 'text-blue-600'
  }
  const renderActiveIcon = () => {
    const activeConceptData = concepts[activeConcept]
    const IconComponent = activeConceptData.icon
    return <IconComponent className={`w-6 h-6 ${getTextColorClass(activeConceptData.color)}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏗️ Key Concepts in Event Grid</h3>
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            className={`p-6 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
              activeConcept === index
                ? `${getColorClasses(concept.color, 'border')} ${getColorClasses(concept.color, 'bg')} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setActiveConcept(index)}
          >
            <concept.icon className={`w-10 h-10 mb-4 ${
              activeConcept === index
                ? getColorClasses(concept.color, 'text')
                : 'text-gray-500'
            }`} />
            <h4 className="font-semibold text-gray-900 mb-1">{concept.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{concept.subtitle}</p>
            <p className="text-xs text-gray-500">{concept.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 ${getBgColorClass(concepts[activeConcept].color)} rounded-lg flex items-center justify-center`}>
            {renderActiveIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {concepts[activeConcept].title}
            </h4>
            <p className="text-gray-700 mb-4">{concepts[activeConcept].description}</p>
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-900">Examples:</h5>
              <ul className="space-y-2">
                {concepts[activeConcept].examples.map((example, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 ${getBgColorClass(concepts[activeConcept].color)} rounded-full mt-2`}></div>
                    <span className="text-gray-700 text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}