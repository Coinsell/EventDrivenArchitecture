import { useState } from 'react'
import { Filter, Type, FileText, Settings, CheckCircle, X } from 'lucide-react'
export function FilteringMechanisms() {
  const [activeFilter, setActiveFilter] = useState(0)
  const filterTypes = [
    {
      id: 'subject',
      title: 'Subject-based Filtering',
      icon: FileText,
      color: 'blue',
      description: 'Filter based on event subject patterns',
      example: {
        pattern: 'orders/*/paid',
        matches: ['orders/1234/paid', 'orders/5678/paid'],
        nonMatches: ['orders/1234/created', 'customers/1234/updated']
      },
      explanation: 'Use wildcards (*) to match patterns in the subject field'
    },
    {
      id: 'eventtype',
      title: 'Event Type Filtering',
      icon: Type,
      color: 'green',
      description: 'Filter based on the eventType field',
      example: {
        pattern: 'OrderPaid',
        matches: ['OrderPaid'],
        nonMatches: ['OrderCreated', 'OrderShipped', 'OrderCancelled']
      },
      explanation: 'Exact match on event type - most common filtering method'
    },
    {
      id: 'advanced',
      title: 'Advanced Filters',
      icon: Settings,
      color: 'purple',
      description: 'Filter on data fields inside event payload',
      example: {
        pattern: 'data.orderTotal > 1000',
        matches: ['Order $1,500', 'Order $2,000'],
        nonMatches: ['Order $500', 'Order $750']
      },
      explanation: 'Complex business rules using event data properties'
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderFilterIcon = (filter: typeof filterTypes[0], isActive: boolean) => {
    const IconComponent = filter.icon
    return <IconComponent className={`w-6 h-6 ${
      isActive ? getColorClasses(filter.color).text : 'text-gray-500'
    }`} />
  }
  const renderActiveFilterIcon = () => {
    const activeFilterData = filterTypes[activeFilter]
    const IconComponent = activeFilterData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activeFilterData.color).text}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔍 Event Filtering Mechanisms</h3>
      <p className="text-gray-600 mb-8">
        Three powerful ways to ensure subscribers only receive relevant events
      </p>
      {/* Filter Type Selector */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {filterTypes.map((filter, index) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activeFilter === index
                ? `${getColorClasses(filter.color).border} ${getColorClasses(filter.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              {renderFilterIcon(filter, activeFilter === index)}
              <span className="text-sm font-medium text-gray-900">{index + 1}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{filter.title}</h4>
            <p className="text-sm text-gray-600">{filter.description}</p>
          </button>
        ))}
      </div>
      {/* Active Filter Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-16 h-16 ${getColorClasses(filterTypes[activeFilter].color).light} rounded-lg flex items-center justify-center`}>
            {renderActiveFilterIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {filterTypes[activeFilter].title}
            </h4>
            <p className="text-gray-700 mb-4">{filterTypes[activeFilter].description}</p>
            <p className="text-sm text-gray-600 italic">{filterTypes[activeFilter].explanation}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Filter Pattern:</h5>
            <div className={`p-4 rounded-lg border ${getColorClasses(filterTypes[activeFilter].color).border} ${getColorClasses(filterTypes[activeFilter].color).light}`}>
              <code className={`${getColorClasses(filterTypes[activeFilter].color).text} font-mono text-sm`}>
                {filterTypes[activeFilter].example.pattern}
              </code>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Examples:</h5>
            <div className="space-y-2">
              <div>
                <h6 className="text-sm font-medium text-green-700 mb-2">✅ Matches:</h6>
                {filterTypes[activeFilter].example.matches.map((match, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <code className="text-sm text-gray-700 bg-green-50 px-2 py-1 rounded">{match}</code>
                  </div>
                ))}
              </div>
              <div>
                <h6 className="text-sm font-medium text-red-700 mb-2">❌ Doesn't Match:</h6>
                {filterTypes[activeFilter].example.nonMatches.map((nonMatch, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-1">
                    <X className="w-4 h-4 text-red-600" />
                    <code className="text-sm text-gray-700 bg-red-50 px-2 py-1 rounded">{nonMatch}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}