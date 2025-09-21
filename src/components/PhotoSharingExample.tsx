import { useState, useEffect } from 'react'
import { Upload, Image, Resize, Bell, Tag, Users, ArrowRight } from 'lucide-react'
export function PhotoSharingExample() {
  const [activeStep, setActiveStep] = useState(0)
  const [processingSteps, setProcessingSteps] = useState<number[]>([])
  const workflow = [
    {
      id: 'upload',
      title: 'Photo Upload',
      description: 'User uploads photo to Blob Storage',
      icon: Upload,
      color: 'blue',
      type: 'source'
    },
    {
      id: 'event',
      title: 'BlobCreated Event',
      description: 'Blob Storage fires event to Event Grid',
      icon: Image,
      color: 'yellow',
      type: 'event'
    },
    {
      id: 'resize',
      title: 'Resize Function',
      description: 'Creates thumbnails and different sizes',
      icon: Resize,
      color: 'green',
      type: 'handler'
    },
    {
      id: 'notify',
      title: 'Notification Logic App',
      description: 'Sends notifications to friends',
      icon: Bell,
      color: 'purple',
      type: 'handler'
    },
    {
      id: 'ai',
      title: 'AI Tagging Service',
      description: 'Tags image for search functionality',
      icon: Tag,
      color: 'red',
      type: 'handler'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStep < 2) {
        setActiveStep(prev => prev + 1)
      } else if (activeStep === 2) {
        // Start parallel processing
        setProcessingSteps([2, 3, 4])
        setActiveStep(3)
      } else {
        // Reset
        setActiveStep(0)
        setProcessingSteps([])
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [activeStep])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📸 Real-World Example: Photo Sharing App</h3>
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500 ${
              activeStep >= 0 ? getColorClasses(workflow[0].color).bg : 'bg-gray-200'
            }`}>
              <Upload className="w-8 h-8 text-white" />
            </div>
            <ArrowRight className={`w-6 h-6 ${activeStep >= 1 ? 'text-blue-500' : 'text-gray-300'}`} />
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500 ${
              activeStep >= 1 ? getColorClasses(workflow[1].color).bg : 'bg-gray-200'
            }`}>
              <Image className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg">
            <Users className="w-6 h-6 inline mr-2" />
            Event Grid Orchestrates
          </div>
        </div>
        <div className="flex justify-center space-x-8">
          {workflow.slice(2).map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center space-y-3 transition-all duration-500 ${
                processingSteps.includes(index + 2) ? 'scale-110' : 'scale-100'
              }`}
            >
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500 ${
                processingSteps.includes(index + 2) 
                  ? getColorClasses(step.color).bg 
                  : 'bg-gray-200'
              }`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">{step.title}</div>
                <div className="text-xs text-gray-600">{step.description}</div>
                {processingSteps.includes(index + 2) && (
                  <div className="text-xs text-green-600 mt-1 animate-pulse">
                    Processing...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">🎯 Key Insight</h4>
          <p className="text-blue-800 text-sm">
            The upload system doesn't care about thumbnails, notifications, or AI tagging. 
            It just fires the event and Event Grid orchestrates everything else.
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-4">⚡ Parallel Processing</h4>
          <p className="text-green-800 text-sm">
            All three handlers (resize, notify, AI tag) process the same event simultaneously, 
            improving overall system performance.
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-4">🔧 Easy Extension</h4>
          <p className="text-purple-800 text-sm">
            Want to add virus scanning or content moderation? Just add new event handlers 
            without touching the upload system.
          </p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <Image className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <h5 className="font-semibold text-yellow-900">Loose Coupling in Action</h5>
            <p className="text-yellow-800 text-sm">
              This demonstrates perfect loose coupling - the photo upload service has no knowledge 
              of the downstream processing. Event Grid handles all the routing and delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}