import { useState } from 'react'
import { Wifi, Monitor, ShoppingCart, Shield, TrendingUp, Zap } from 'lucide-react'
export function EventHubUseCases() {
  const [activeUseCase, setActiveUseCase] = useState(0)
  const useCases = [
    {
      id: 'iot',
      title: 'IoT Telemetry',
      icon: Wifi,
      color: 'blue',
      description: 'Millions of smart meters and sensors streaming data continuously',
      scenario: 'Smart city infrastructure monitoring temperature, traffic, and energy usage',
      benefits: ['Anomaly detection', 'Predictive maintenance', 'Real-time optimization'],
      scale: '10M+ events/sec'
    },
    {
      id: 'monitoring',
      title: 'Application Monitoring',
      icon: Monitor,
      color: 'green',
      description: 'Logging and telemetry from distributed applications',
      scenario: 'Microservices architecture sending logs, metrics, and traces',
      benefits: ['Real-time dashboards', 'Alert systems', 'Performance insights'],
      scale: '1M+ events/sec'
    },
    {
      id: 'clickstream',
      title: 'Clickstream Analytics',
      icon: ShoppingCart,
      color: 'purple',
      description: 'E-commerce sites tracking every user interaction',
      scenario: 'Online retailer capturing clicks, scrolls, purchases, and cart events',
      benefits: ['Real-time personalization', 'Product recommendations', 'User behavior analysis'],
      scale: '5M+ events/sec'
    },
    {
      id: 'fraud',
      title: 'Fraud Detection',
      icon: Shield,
      color: 'red',
      description: 'Banks processing transactions in real-time',
      scenario: 'Payment processor analyzing transaction patterns for suspicious activity',
      benefits: ['Instant fraud alerts', 'Risk scoring', 'Transaction blocking'],
      scale: '100K+ events/sec'
    }
  ]
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderActiveUseCaseIcon = () => {
    const activeUseCaseData = useCases[activeUseCase]
    const IconComponent = activeUseCaseData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activeUseCaseData.color).text}`} />
  }
  const renderUseCaseIcon = (useCase: typeof useCases[0], isActive: boolean) => {
    const IconComponent = useCase.icon
    return <IconComponent className={`w-8 h-8 mb-3 ${
      isActive ? getColorClasses(useCase.color).text : 'text-gray-500'
    }`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Event Hub Use Cases</h3>
      <p className="text-gray-600 mb-8">Where Event Hub shines in real-world scenarios</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {useCases.map((useCase, index) => (
          <button
            key={useCase.id}
            onClick={() => setActiveUseCase(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activeUseCase === index
                ? `${getColorClasses(useCase.color).border} ${getColorClasses(useCase.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {renderUseCaseIcon(useCase, activeUseCase === index)}
            <h4 className="font-semibold text-gray-900 mb-2">{useCase.title}</h4>
            <div className="text-xs bg-gray-200 px-2 py-1 rounded mb-2">
              {useCase.scale}
            </div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(useCases[activeUseCase].color).light} rounded-lg flex items-center justify-center`}>
            {renderActiveUseCaseIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {useCases[activeUseCase].title}
            </h4>
            <p className="text-gray-700 mb-4">{useCases[activeUseCase].description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Scenario:</h5>
                <p className="text-gray-700 text-sm mb-4">{useCases[activeUseCase].scenario}</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Scale: {useCases[activeUseCase].scale}
                  </span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Key Benefits:</h5>
                <ul className="space-y-1">
                  {useCases[activeUseCase].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${getColorClasses(useCases[activeUseCase].color).bg} rounded-full`}></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}