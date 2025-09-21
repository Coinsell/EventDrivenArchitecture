import { useState, useEffect } from 'react'
import { Zap, Database, BarChart3, Wifi, Clock, Shield } from 'lucide-react'
export function EventHubOverview() {
  const [activeFeature, setActiveFeature] = useState(0)
  const features = [
    {
      icon: Zap,
      title: 'High-Throughput Ingestion',
      description: 'Millions of events per second',
      color: 'blue',
      detail: 'Designed for massive scale workloads like telemetry and IoT'
    },
    {
      icon: Database,
      title: 'Partitioned Data Stream',
      description: 'Scalable parallel processing',
      color: 'green',
      detail: 'Multiple partitions enable independent consumer processing'
    },
    {
      icon: Clock,
      title: 'Low Latency',
      description: 'Events available in milliseconds',
      color: 'purple',
      detail: 'Perfect for real-time dashboards and fraud detection'
    },
    {
      icon: BarChart3,
      title: 'Analytics Integration',
      description: 'Works with Stream Analytics, Spark',
      color: 'orange',
      detail: 'Seamless integration with Azure analytics tools'
    },
    {
      icon: Shield,
      title: 'Retention Window',
      description: 'Configurable storage up to 7 days',
      color: 'red',
      detail: 'Buffer time for downstream processing systems'
    },
    {
      icon: Wifi,
      title: 'Capture Feature',
      description: 'Auto-archive to Blob Storage',
      color: 'indigo',
      detail: 'Safety net ensuring no data is lost'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [features.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Azure Event Hub</h3>
        <p className="text-lg text-gray-600">Big Data Streaming Platform & Event Ingestion Service</p>
        <div className="mt-4 inline-block bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-lg border border-orange-200">
          <p className="text-orange-800 font-medium">The Massive Firehose of Data</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 transition-all duration-500 ${
              activeFeature === index
                ? `${getColorClasses(feature.color).border} ${getColorClasses(feature.color).light} scale-105`
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <feature.icon className={`w-8 h-8 mb-4 ${
              activeFeature === index
                ? getColorClasses(feature.color).text
                : 'text-gray-500'
            }`} />
            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
            {activeFeature === index && (
              <p className="text-xs text-gray-500 animate-pulse">{feature.detail}</p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-900 mb-4">🏢 Airport Analogy</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">✈️</span>
            </div>
            <h5 className="font-medium text-orange-900">Passengers Arrive</h5>
            <p className="text-sm text-orange-700">Thousands per hour</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🏢</span>
            </div>
            <h5 className="font-medium text-red-900">Arrivals Terminal</h5>
            <p className="text-sm text-red-700">Event Hub ingestion</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🚌</span>
            </div>
            <h5 className="font-medium text-yellow-900">Distribution</h5>
            <p className="text-sm text-yellow-700">To various destinations</p>
          </div>
        </div>
      </div>
    </div>
  )
}