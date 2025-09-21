import { useState, useEffect } from 'react'
import { ShoppingCart, Zap, Settings, Database, ArrowRight, Users, Mail, Package, CreditCard } from 'lucide-react'
export function OrderProcessingArchitecture() {
  const [activeStep, setActiveStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const architectureSteps = [
    {
      id: 'order-received',
      title: 'Order Received',
      description: 'Customer places order on website',
      icon: ShoppingCart,
      color: 'blue',
      position: { x: 10, y: 50 },
      details: 'Front-end API publishes OrderReceived event'
    },
    {
      id: 'event-grid',
      title: 'Event Grid',
      description: 'Event dispatcher and router',
      icon: Zap,
      color: 'yellow',
      position: { x: 35, y: 50 },
      details: 'Routes event to all interested subscribers'
    },
    {
      id: 'azure-function',
      title: 'Azure Function',
      description: 'Serverless event processor',
      icon: Settings,
      color: 'green',
      position: { x: 60, y: 50 },
      details: 'Validates order and processes business logic'
    },
    {
      id: 'storage',
      title: 'Storage Systems',
      description: 'Persistent data storage',
      icon: Database,
      color: 'purple',
      position: { x: 85, y: 50 },
      details: 'Cosmos DB, Blob Storage, SQL Database'
    }
  ]
  const parallelConsumers = [
    { id: 'email', title: 'Email Service', icon: Mail, color: 'red', position: { x: 60, y: 20 } },
    { id: 'fulfillment', title: 'Fulfillment', icon: Package, color: 'orange', position: { x: 60, y: 35 } },
    { id: 'billing', title: 'Billing System', icon: CreditCard, color: 'indigo', position: { x: 60, y: 65 } },
    { id: 'analytics', title: 'Analytics', icon: Users, color: 'pink', position: { x: 60, y: 80 } }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStep < architectureSteps.length - 1) {
        setActiveStep(prev => prev + 1)
        setIsProcessing(true)
      } else {
        // Reset and show parallel processing
        setActiveStep(0)
        setIsProcessing(false)
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [activeStep, architectureSteps.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' },
      pink: { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderActiveStepIcon = () => {
    const activeStepData = architectureSteps[activeStep]
    const IconComponent = activeStepData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activeStepData.color).text}`} />
  }
  const renderStepIcon = (step: typeof architectureSteps[0], isActive: boolean) => {
    const IconComponent = step.icon
    return <IconComponent className={`w-10 h-10 ${
      isActive ? 'text-white' : 'text-gray-500'
    }`} />
  }
  const renderConsumerIcon = (consumer: typeof parallelConsumers[0]) => {
    const IconComponent = consumer.icon
    return <IconComponent className={`w-6 h-6 ${getColorClasses(consumer.color).text}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏗️ Real-Time Order Processing Architecture</h3>
      {/* Main Architecture Flow */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg border mb-8" style={{ height: '400px' }}>
        {/* Main Flow Steps */}
        {architectureSteps.map((step, index) => (
          <div key={step.id}>
            {/* Step Node */}
            <div
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeStep >= index ? 'scale-110' : 'scale-100'
              }`}
              style={{ 
                left: `${step.position.x}%`, 
                top: `${step.position.y}%` 
              }}
            >
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                activeStep >= index 
                  ? getColorClasses(step.color).bg 
                  : 'bg-gray-300'
              } shadow-lg`}>
                {renderStepIcon(step, activeStep >= index)}
              </div>
              <div className="text-center mt-3 max-w-24">
                <div className={`font-semibold text-sm ${
                  activeStep >= index ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                {activeStep === index && (
                  <div className="text-xs text-gray-600 mt-1 animate-pulse">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
            {/* Arrow to next step */}
            {index < architectureSteps.length - 1 && (
              <div
                className="absolute transform -translate-y-1/2"
                style={{ 
                  left: `${step.position.x + 8}%`, 
                  top: `${step.position.y}%` 
                }}
              >
                <ArrowRight className={`w-8 h-8 transition-colors ${
                  activeStep > index ? 'text-green-500 animate-pulse' : 'text-gray-300'
                }`} />
              </div>
            )}
          </div>
        ))}
        {/* Parallel Consumers (shown when Event Grid is active) */}
        {activeStep >= 1 && (
          <>
            {parallelConsumers.map((consumer, index) => (
              <div key={consumer.id}>
                {/* Consumer Node */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                  style={{ 
                    left: `${consumer.position.x}%`, 
                    top: `${consumer.position.y}%`,
                    opacity: activeStep >= 1 ? 1 : 0
                  }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    getColorClasses(consumer.color).light
                  } border-2 ${getColorClasses(consumer.color).border}`}>
                    {renderConsumerIcon(consumer)}
                  </div>
                  <div className="text-center mt-1">
                    <div className="text-xs font-medium text-gray-700">
                      {consumer.title}
                    </div>
                  </div>
                </div>
                {/* Arrow from Event Grid to Consumer */}
                <div
                  className="absolute"
                  style={{
                    left: '35%',
                    top: '50%',
                    width: `${consumer.position.x - 35}%`,
                    height: `${consumer.position.y - 50}%`,
                    transformOrigin: '0 0'
                  }}
                >
                  <svg 
                    className="w-full h-full" 
                    style={{ 
                      position: 'absolute',
                      opacity: activeStep >= 1 ? 0.6 : 0,
                      transition: 'opacity 0.7s'
                    }}
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      stroke={getColorClasses(consumer.color).text.replace('text-', '')}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </>
        )}
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg border border-green-300">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 text-sm font-medium">Processing...</span>
          </div>
        )}
      </div>
      {/* Step Details */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(architectureSteps[activeStep].color).light} rounded-lg flex items-center justify-center`}>
            {renderActiveStepIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Step {activeStep + 1}: {architectureSteps[activeStep].title}
            </h4>
            <p className="text-gray-700 mb-3">{architectureSteps[activeStep].description}</p>
            <p className="text-blue-800 text-sm font-medium">
              {architectureSteps[activeStep].details}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}