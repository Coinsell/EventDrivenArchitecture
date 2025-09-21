import { useState, useEffect } from 'react'
import { ArrowRight, ShoppingCart, Zap, Database, Settings } from 'lucide-react'
export function ArchitectureDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  const steps = [
    { icon: ShoppingCart, label: 'Order Received', color: 'bg-blue-500' },
    { icon: Zap, label: 'Event Grid', color: 'bg-yellow-500' },
    { icon: Settings, label: 'Azure Function', color: 'bg-green-500' },
    { icon: Database, label: 'Storage Account', color: 'bg-purple-500' }
  ]
  return (
    <div className="p-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center space-y-3">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                ${activeStep === index 
                  ? `${step.color} scale-110 shadow-lg` 
                  : 'bg-gray-200 scale-100'
                }
              `}>
                <step.icon className={`w-8 h-8 ${
                  activeStep === index ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="text-center">
                <div className={`font-semibold transition-colors ${
                  activeStep === index ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </div>
                {activeStep === index && (
                  <div className="text-xs text-blue-600 mt-1 animate-pulse">
                    Processing...
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-8">
                <ArrowRight className={`w-8 h-8 transition-colors ${
                  activeStep > index ? 'text-blue-500' : 'text-gray-300'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Architecture Flow</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className={`p-2 rounded ${activeStep >= 0 ? 'bg-blue-50 text-blue-800' : ''}`}>
            1. Customer places an order through the web application
          </div>
          <div className={`p-2 rounded ${activeStep >= 1 ? 'bg-yellow-50 text-yellow-800' : ''}`}>
            2. Order event is published to Azure Event Grid
          </div>
          <div className={`p-2 rounded ${activeStep >= 2 ? 'bg-green-50 text-green-800' : ''}`}>
            3. Azure Function is triggered to process the order
          </div>
          <div className={`p-2 rounded ${activeStep >= 3 ? 'bg-purple-50 text-purple-800' : ''}`}>
            4. Order data is stored in Azure Storage Account
          </div>
        </div>
      </div>
    </div>
  )
}