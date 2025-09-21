import { useState } from 'react'
import { AlertTriangle, CheckCircle, ArrowRight, X } from 'lucide-react'
export function TraditionalVsEventDriven() {
  const [activeApproach, setActiveApproach] = useState(0)
  const approaches = [
    {
      id: 'traditional',
      title: 'Traditional Tightly Coupled',
      color: 'red',
      problems: [
        'If one service is down, whole chain fails',
        'Traffic spikes slow down everything',
        'Hard to scale individual components',
        'Changes require updating multiple services'
      ],
      flow: [
        'Order API calls Inventory directly',
        'Then calls Payment service',
        'Then calls Email service',
        'Finally calls Shipping service'
      ]
    },
    {
      id: 'event-driven',
      title: 'Event-Driven Architecture',
      color: 'green',
      benefits: [
        'Services operate independently',
        'Automatic scaling during traffic spikes',
        'Easy to add new services',
        'Resilient to individual service failures'
      ],
      flow: [
        'Order API publishes event',
        'Event Grid routes to subscribers',
        'All services process in parallel',
        'Each service scales independently'
      ]
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.red
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔄 Traditional vs Event-Driven Approach</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {approaches.map((approach, index) => (
          <button
            key={approach.id}
            onClick={() => setActiveApproach(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activeApproach === index
                ? `${getColorClasses(approach.color).border} ${getColorClasses(approach.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              {approach.id === 'traditional' ? (
                <AlertTriangle className={`w-6 h-6 ${
                  activeApproach === index ? 'text-red-600' : 'text-gray-500'
                }`} />
              ) : (
                <CheckCircle className={`w-6 h-6 ${
                  activeApproach === index ? 'text-green-600' : 'text-gray-500'
                }`} />
              )}
              <h4 className="font-semibold text-gray-900">{approach.title}</h4>
            </div>
            {activeApproach === index && (
              <div className="text-sm text-gray-600">
                Click to see detailed comparison
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(approaches[activeApproach].color).light} rounded-lg flex items-center justify-center`}>
            {approaches[activeApproach].id === 'traditional' ? (
              <X className={`w-8 h-8 ${getColorClasses(approaches[activeApproach].color).text}`} />
            ) : (
              <CheckCircle className={`w-8 h-8 ${getColorClasses(approaches[activeApproach].color).text}`} />
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {approaches[activeApproach].title}
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">
                  {approaches[activeApproach].id === 'traditional' ? 'Problems:' : 'Benefits:'}
                </h5>
                <ul className="space-y-2">
                  {(approaches[activeApproach].problems || approaches[activeApproach].benefits)?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${getColorClasses(approaches[activeApproach].color).bg} rounded-full mt-2`}></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Process Flow:</h5>
                <div className="space-y-2">
                  {approaches[activeApproach].flow.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}