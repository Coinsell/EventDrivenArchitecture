import { useState, useEffect } from 'react'
import { ArrowRight, Database, Cloud, Filter, Target } from 'lucide-react'
export function EventGridFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    {
      id: 'source',
      title: 'Event Source',
      description: 'Generates an event',
      icon: Database,
      color: 'bg-blue-500',
      example: 'Blob Storage fires "BlobCreated"'
    },
    {
      id: 'topic',
      title: 'Event Topic',
      description: 'Event published to topic',
      icon: Cloud,
      color: 'bg-yellow-500',
      example: 'Event sent to storage topic'
    },
    {
      id: 'matching',
      title: 'Subscription Matching',
      description: 'Event Grid matches subscriptions',
      icon: Filter,
      color: 'bg-purple-500',
      example: 'Filters applied, routes determined'
    },
    {
      id: 'handler',
      title: 'Event Handler',
      description: 'Event delivered to handler',
      icon: Target,
      color: 'bg-green-500',
      example: 'Function App processes event'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [steps.length])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔄 Event Flow in Event Grid</h3>
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center space-y-4">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500
                ${activeStep === index 
                  ? `${step.color} scale-110 shadow-lg` 
                  : 'bg-gray-200 scale-100'
                }
              `}>
                <step.icon className={`w-10 h-10 ${
                  activeStep === index ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="text-center max-w-32">
                <div className={`font-semibold transition-colors ${
                  activeStep === index ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {step.description}
                </div>
                {activeStep === index && (
                  <div className="text-xs text-blue-600 mt-2 animate-pulse font-medium">
                    {step.example}
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-6">
                <ArrowRight className={`w-8 h-8 transition-colors ${
                  activeStep > index ? 'text-blue-500' : 'text-gray-300'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Step-by-Step Process</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                activeStep >= index 
                  ? 'bg-white border-blue-300' 
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= index ? step.color : 'bg-gray-300'
                }`}>
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-green-600" />
          <div>
            <h5 className="font-semibold text-green-900">Key Insight</h5>
            <p className="text-green-800 text-sm">
              It's that simple—like a routing engine for events. Event Grid handles all the complexity 
              of reliable delivery, scaling, and filtering automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}