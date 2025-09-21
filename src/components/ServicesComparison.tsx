import { useState, useEffect } from 'react'
import { Newspaper, Tv, Mail, Zap, Database, Shield } from 'lucide-react'
export function ServicesComparison() {
  const [activeService, setActiveService] = useState(0)
  const services = [
    {
      id: 'event-grid',
      name: 'Event Grid',
      tagline: 'The Newspaper Delivery Service',
      icon: Newspaper,
      color: 'blue',
      description: 'Lightweight notifications and reactive eventing',
      analogy: 'Whenever news happens, it quickly notifies subscribers who care about that news',
      purpose: 'Reactive eventing - tells subscribers that something happened',
      nature: 'Lightweight notifications',
      scale: 'Millions of events (lightweight)',
      delivery: 'Push-based, near real-time',
      retention: '24 hours retry',
      messageSize: 'Small (~64 KB)',
      useCases: [
        'Automating workflows',
        'Serverless triggers',
        'Resource lifecycle events',
        'SaaS event integration'
      ]
    },
    {
      id: 'event-hub',
      name: 'Event Hub',
      tagline: 'The Live TV Broadcast',
      icon: Tv,
      color: 'orange',
      description: 'Big data streaming platform for massive scale ingestion',
      analogy: 'Millions of viewers watching live TV - continuous data streaming',
      purpose: 'Collect and ingest millions of telemetry events per second',
      nature: 'Big data event streaming',
      scale: 'Millions of events/sec (high throughput)',
      delivery: 'Stream (pull-based)',
      retention: 'Up to 7 days',
      messageSize: 'Large (up to MBs per batch)',
      useCases: [
        'IoT telemetry',
        'Application monitoring',
        'Clickstream analytics',
        'Fraud detection'
      ]
    },
    {
      id: 'service-bus',
      name: 'Service Bus',
      tagline: 'The Registered Mail Service',
      icon: Mail,
      color: 'green',
      description: 'Enterprise messaging with reliability guarantees',
      analogy: 'Registered mail with tracking, retries, and guaranteed delivery',
      purpose: 'Enterprise messaging with reliability guarantees',
      nature: 'Enterprise messaging',
      scale: 'Moderate (focused on reliability)',
      delivery: 'Queue/Topic (push/pull)',
      retention: 'Until consumed',
      messageSize: 'Up to 256 KB (standard), 1 MB (premium)',
      useCases: [
        'Payment processing',
        'Order management',
        'Inventory systems',
        'Business workflows'
      ]
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [services.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">📊 Azure Messaging Services Overview</h3>
      <p className="text-gray-600 mb-8">
        Three types of communication - each designed for different scenarios
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => setActiveService(index)}
            className={`p-6 rounded-lg border-2 transition-all duration-500 text-left ${
              activeService === index
                ? `${getColorClasses(service.color).border} ${getColorClasses(service.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <service.icon className={`w-12 h-12 mb-4 ${
              activeService === index
                ? getColorClasses(service.color).text
                : 'text-gray-500'
            }`} />
            <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
            <p className="text-sm font-medium text-gray-700 mb-2">{service.tagline}</p>
            <p className="text-xs text-gray-600">{service.description}</p>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-6">
          <div className={`w-20 h-20 ${getColorClasses(services[activeService].color).light} rounded-xl flex items-center justify-center`}>
            <services[activeService].icon className={`w-10 h-10 ${getColorClasses(services[activeService].color).text}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              {services[activeService].name}
            </h4>
            <p className="text-lg font-medium text-gray-700 mb-4">
              {services[activeService].tagline}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Real-World Analogy:</h5>
                  <p className="text-gray-700 text-sm">{services[activeService].analogy}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Purpose:</h5>
                  <p className="text-gray-700 text-sm">{services[activeService].purpose}</p>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Key Use Cases:</h5>
                <ul className="space-y-2">
                  {services[activeService].useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${getColorClasses(services[activeService].color).bg} rounded-full`}></div>
                      <span className="text-gray-700 text-sm">{useCase}</span>
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