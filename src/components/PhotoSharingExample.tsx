import { useState, useEffect } from 'react'
import { Upload, Image, Resize, Bell, Brain, ArrowRight } from 'lucide-react'
export function PhotoSharingExample() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    {
      id: 'upload',
      title: 'Photo Upload',
      description: 'User uploads new photo',
      icon: Upload,
      color: 'bg-blue-500',
      detail: 'Blob Storage fires "BlobCreated" event'
    },
    {
      id: 'event-grid',
      title: 'Event Grid',
      description: 'Receives and routes event',
      icon: ArrowRight,
      color: 'bg-yellow-500',
      detail: 'Event Grid processes the event'
    },
    {
      id: 'consumers',
      title: 'Multiple Consumers',
      description: 'Parallel processing begins',
      icon: ArrowRight,
      color: 'bg-purple-500',
      detail: 'Event sent to all subscribers'
    }
  ]
  const consumers = [
    {
      id: 'resize',
      title: 'Function App',
      description: 'Resize photo into thumbnails',
      icon: Resize,
      color: 'bg-green-500',
      processing: false
    },
    {
      id: 'notify',
      title: 'Logic App',
      description: 'Notify user\'s friends',
      icon: Bell,
      color: 'bg-orange-500',
      processing: false
    },
    {
      id: 'ai',
      title: 'AI Service',
      description: 'Tag image for search',
      icon: Brain,
      color: 'bg-pink-500',
      processing: false
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 2) {
          return prev + 1
        } else {
          // Reset and start over
          return 0
        }
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📸 Real-World Example: Photo-Sharing App</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Event Flow</h4>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                    activeStep >= index
                      ? 'border-blue-300 bg-blue-100'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= index ? step.color : 'bg-gray-300'
                    }`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                      {activeStep >= index && (
                        <div className="text-xs text-blue-600 mt-1">{step.detail}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Event Consumers</h4>
            <div className="space-y-4">
              {consumers.map((consumer, index) => (
                <div
                  key={consumer.id}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    activeStep >= 2
                      ? 'border-green-300 bg-green-100'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= 2 ? consumer.color : 'bg-gray-300'
                    }`}>
                      <consumer.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{consumer.title}</div>
                      <div className="text-sm text-gray-600">{consumer.description}</div>
                    </div>
                  </div>
                  {activeStep >= 2 && (
                    <div className="mt-2 text-xs text-green-700 bg-green-200 px-2 py-1 rounded animate-pulse">
                      Processing in parallel...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-900 mb-4">🎯 Key Insight: Loose Coupling</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-purple-900 mb-2">Upload System Doesn't Care</h5>
            <p className="text-purple-800 text-sm">
              The photo upload system just fires the "BlobCreated" event and moves on. 
              It has no knowledge of what happens next.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-purple-900 mb-2">Event Grid Orchestrates</h5>
            <p className="text-purple-800 text-sm">
              Event Grid handles all the routing, filtering, and delivery to multiple consumers 
              automatically and reliably.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-3">
          <Image className="w-5 h-5 text-yellow-600" />
          <div>
            <h5 className="font-semibold text-yellow-900">Scalability Benefit</h5>
            <p className="text-yellow-800 text-sm">
              If you need to add a new feature (like automatic backup or content moderation), 
              just add a new subscription. No changes to the upload system required!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}