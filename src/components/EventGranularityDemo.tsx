import { useState } from 'react'
import { User, AlertTriangle, CheckCircle, Target } from 'lucide-react'
export function EventGranularityDemo() {
  const [granularityType, setGranularityType] = useState<'coarse' | 'fine' | 'balanced'>('coarse')
  const scenarios = {
    coarse: {
      title: 'Too Coarse',
      color: 'red',
      icon: AlertTriangle,
      events: [
        {
          name: 'CustomerUpdated',
          data: ['name', 'email', 'address', 'phone', 'preferences', 'billing'],
          problems: ['Unnecessary data transfer', 'Inefficient processing', 'Privacy concerns']
        }
      ]
    },
    fine: {
      title: 'Too Fine',
      color: 'orange',
      icon: AlertTriangle,
      events: [
        { name: 'CustomerNameChanged', data: ['firstName', 'lastName'] },
        { name: 'CustomerEmailChanged', data: ['email'] },
        { name: 'CustomerAddressChanged', data: ['address'] },
        { name: 'CustomerPhoneChanged', data: ['phone'] },
        { name: 'CustomerPreferencesChanged', data: ['preferences'] },
        { name: 'CustomerBillingChanged', data: ['billing'] }
      ],
      problems: ['Too many events', 'System overhead', 'Complex orchestration']
    },
    balanced: {
      title: 'Just Right',
      color: 'green',
      icon: CheckCircle,
      events: [
        { name: 'CustomerProfileUpdated', data: ['name', 'email', 'phone'] },
        { name: 'CustomerAddressUpdated', data: ['address', 'billing'] },
        { name: 'CustomerPreferencesUpdated', data: ['preferences'] }
      ],
      benefits: ['Logical grouping', 'Efficient processing', 'Clear purpose']
    }
  }
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }
  const currentScenario = scenarios[granularityType]
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Event Granularity: Finding the Sweet Spot</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setGranularityType(key as any)}
            className={`p-4 rounded-lg border-2 transition-all ${
              granularityType === key
                ? `${getColorClasses(scenario.color).border} ${getColorClasses(scenario.color).light} scale-105`
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <scenario.icon className={`w-6 h-6 ${
                granularityType === key ? getColorClasses(scenario.color).text : 'text-gray-500'
              }`} />
              <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
            </div>
            <p className="text-sm text-gray-600">
              {key === 'coarse' && 'Single large event'}
              {key === 'fine' && 'Many small events'}
              {key === 'balanced' && 'Logical grouping'}
            </p>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-16 h-16 ${getColorClasses(currentScenario.color).light} rounded-lg flex items-center justify-center`}>
            <currentScenario.icon className={`w-8 h-8 ${getColorClasses(currentScenario.color).text}`} />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {currentScenario.title} Granularity
            </h4>
            <p className="text-gray-700">
              Customer profile update scenario with {granularityType} event granularity
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-4">Event Structure:</h5>
            <div className="space-y-3">
              {currentScenario.events.map((event, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getColorClasses(currentScenario.color).border} ${getColorClasses(currentScenario.color).light}`}>
                  <div className="font-medium text-gray-900 mb-2">{event.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {event.data.map((field, fieldIndex) => (
                      <span key={fieldIndex} className="px-2 py-1 bg-white rounded text-xs text-gray-700 border">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-4">
              {granularityType === 'balanced' ? 'Benefits:' : 'Problems:'}
            </h5>
            <ul className="space-y-2">
              {(currentScenario.problems || currentScenario.benefits)?.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className={`w-2 h-2 ${getColorClasses(currentScenario.color).bg} rounded-full mt-2`}></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            {granularityType === 'balanced' && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 text-sm font-medium">Sweet Spot Achieved!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-900 mb-2">💡 Design Tip</h5>
        <p className="text-blue-800 text-sm">
          Group related data that changes together and is consumed together. 
          Separate concerns that have different consumers or processing requirements.
        </p>
      </div>
    </div>
  )
}