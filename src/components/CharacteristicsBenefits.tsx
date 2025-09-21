import { useState } from 'react'
import { Link, Zap, Shield, Layers, Clock, Sparkles } from 'lucide-react'
export function CharacteristicsBenefits() {
  const [activeCharacteristic, setActiveCharacteristic] = useState(0)
  const characteristics = [
    {
      id: 'loose-coupling',
      title: 'Loose Coupling',
      icon: Link,
      color: 'blue',
      description: 'Producer and consumer don\'t know about each other',
      benefits: [
        'Add/remove consumers without touching producer code',
        'Independent development and deployment',
        'Easier system evolution and maintenance'
      ],
      example: 'E-commerce: Add ML recommendation engine to existing OrderPlaced event'
    },
    {
      id: 'scalability',
      title: 'Scalability',
      icon: Zap,
      color: 'green',
      description: 'Handle traffic spikes with parallel processing',
      benefits: [
        'Events dumped into broker for parallel processing',
        'Scale consumers independently based on load',
        'Elastic scaling during traffic spikes'
      ],
      example: 'Netflix: Millions of playback telemetry events processed per second'
    },
    {
      id: 'async-processing',
      title: 'Asynchronous Processing',
      icon: Clock,
      color: 'purple',
      description: 'Not everything needs to happen immediately',
      benefits: [
        'Improved user experience with immediate responses',
        'Background processing for non-critical tasks',
        'Better system responsiveness'
      ],
      example: 'WhatsApp: Message sent immediately, delivery/read receipts processed async'
    },
    {
      id: 'resilience',
      title: 'Resilience',
      icon: Shield,
      color: 'red',
      description: 'System doesn\'t collapse when one component fails',
      benefits: [
        'Event broker holds events if consumer is down',
        'Fault tolerance and graceful degradation',
        'System continues operating despite failures'
      ],
      example: 'If notification service crashes, events are queued until it recovers'
    },
    {
      id: 'real-time',
      title: 'Real-Time Responsiveness',
      icon: Sparkles,
      color: 'yellow',
      description: 'Near real-time event processing capabilities',
      benefits: [
        'Instant reaction to events as they occur',
        'Perfect for fraud detection and monitoring',
        'Live dashboards and real-time analytics'
      ],
      example: 'Stock trading: Buy/sell orders processed in milliseconds'
    },
    {
      id: 'flexibility',
      title: 'Flexibility',
      icon: Layers,
      color: 'indigo',
      description: 'Easy to add new features without breaking existing flows',
      benefits: [
        'Subscribe new consumers to existing events',
        'System naturally evolves over time',
        'No need to modify existing components'
      ],
      example: 'Add AI/ML analytics to existing user behavior events'
    }
  ]
  const getColorClasses = (color: string, type: 'border' | 'bg' | 'text') => {
    const colorMap = {
      blue: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-600' },
      purple: { border: 'border-purple-300', bg: 'bg-purple-50', text: 'text-purple-600' },
      red: { border: 'border-red-300', bg: 'bg-red-50', text: 'text-red-600' },
      yellow: { border: 'border-yellow-300', bg: 'bg-yellow-50', text: 'text-yellow-600' },
      indigo: { border: 'border-indigo-300', bg: 'bg-indigo-50', text: 'text-indigo-600' }
    }
    return colorMap[color as keyof typeof colorMap]?.[type] || ''
  }
  const getBgColorClasses = (color: string, intensity: '50' | '100') => {
    const colorMap = {
      blue: { '50': 'bg-blue-50', '100': 'bg-blue-100' },
      green: { '50': 'bg-green-50', '100': 'bg-green-100' },
      purple: { '50': 'bg-purple-50', '100': 'bg-purple-100' },
      red: { '50': 'bg-red-50', '100': 'bg-red-100' },
      yellow: { '50': 'bg-yellow-50', '100': 'bg-yellow-100' },
      indigo: { '50': 'bg-indigo-50', '100': 'bg-indigo-100' }
    }
    return colorMap[color as keyof typeof colorMap]?.[intensity] || ''
  }
  const getTextColorClasses = (color: string, intensity: '600' | '800') => {
    const colorMap = {
      blue: { '600': 'text-blue-600', '800': 'text-blue-800' },
      green: { '600': 'text-green-600', '800': 'text-green-800' },
      purple: { '600': 'text-purple-600', '800': 'text-purple-800' },
      red: { '600': 'text-red-600', '800': 'text-red-800' },
      yellow: { '600': 'text-yellow-600', '800': 'text-yellow-800' },
      indigo: { '600': 'text-indigo-600', '800': 'text-indigo-800' }
    }
    return colorMap[color as keyof typeof colorMap]?.[intensity] || ''
  }
  const getBorderColorClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-200',
      green: 'border-green-200',
      purple: 'border-purple-200',
      red: 'border-red-200',
      yellow: 'border-yellow-200',
      indigo: 'border-indigo-200'
    }
    return colorMap[color as keyof typeof colorMap] || ''
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🧬 The DNA of Event-Driven Systems</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {characteristics.map((char, index) => (
          <button
            key={char.id}
            onClick={() => setActiveCharacteristic(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              activeCharacteristic === index
                ? `${getColorClasses(char.color, 'border')} ${getColorClasses(char.color, 'bg')} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <char.icon className={`w-8 h-8 mx-auto mb-2 ${
              activeCharacteristic === index
                ? getColorClasses(char.color, 'text')
                : 'text-gray-500'
            }`} />
            <div className="text-sm font-medium text-gray-900">{char.title}</div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 ${getBgColorClasses(characteristics[activeCharacteristic].color, '100')} rounded-lg flex items-center justify-center`}>
            {(() => {
              const IconComponent = characteristics[activeCharacteristic].icon
              return <IconComponent className={`w-6 h-6 ${getTextColorClasses(characteristics[activeCharacteristic].color, '600')}`} />
            })()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {characteristics[activeCharacteristic].title}
            </h4>
            <p className="text-gray-700 mb-4">
              {characteristics[activeCharacteristic].description}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Key Benefits:</h5>
                <ul className="space-y-2">
                  {characteristics[activeCharacteristic].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${getBgColorClasses(characteristics[activeCharacteristic].color, '100')} rounded-full mt-2`}></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Real-World Example:</h5>
                <div className={`p-4 ${getBgColorClasses(characteristics[activeCharacteristic].color, '50')} rounded-lg border ${getBorderColorClasses(characteristics[activeCharacteristic].color)}`}>
                  <p className={`${getTextColorClasses(characteristics[activeCharacteristic].color, '800')} text-sm`}>
                    {characteristics[activeCharacteristic].example}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}