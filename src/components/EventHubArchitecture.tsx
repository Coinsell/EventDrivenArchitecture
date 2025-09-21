import { useState, useEffect } from 'react'
import { ArrowRight, Smartphone, Database, Zap, BarChart3, HardDrive } from 'lucide-react'
export function EventHubArchitecture() {
  const [activeStep, setActiveStep] = useState(0)
  const [dataFlow, setDataFlow] = useState<number[]>([])
  const architectureSteps = [
    {
      id: 'producers',
      title: 'Event Producers',
      description: 'Applications, IoT devices, systems',
      icon: Smartphone,
      color: 'blue',
      examples: ['IoT Sensors', 'Web Apps', 'Mobile Apps', 'Logs']
    },
    {
      id: 'eventhub',
      title: 'Event Hub',
      description: 'Ingestion pipeline with partitions',
      icon: Zap,
      color: 'orange',
      examples: ['Partition 0', 'Partition 1', 'Partition 2', 'Partition N']
    },
    {
      id: 'consumers',
      title: 'Event Consumers',
      description: 'Services that read events',
      icon: Database,
      color: 'green',
      examples: ['Azure Functions', 'Stream Analytics', 'Spark Clusters', 'Custom Apps']
    },
    {
      id: 'storage',
      title: 'Storage & Analytics',
      description: 'Final destination for processing',
      icon: BarChart3,
      color: 'purple',
      examples: ['Data Lake', 'SQL Database', 'Cosmos DB', 'Dashboards']
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStep < architectureSteps.length - 1) {
        setActiveStep(prev => prev + 1)
        setDataFlow(prev => [...prev, activeStep + 1])
      } else {
        // Reset
        setActiveStep(0)
        setDataFlow([])
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [activeStep, architectureSteps.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏗️ Event Hub Architecture Flow</h3>
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        {architectureSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center space-y-4">
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all duration-500 ${
                activeStep >= index
                  ? `${getColorClasses(step.color).bg} scale-110 shadow-lg`
                  : 'bg-gray-200 scale-100'
              }`}>
                <step.icon className={`w-10 h-10 ${
                  activeStep >= index ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="text-center max-w-32">
                <div className={`font-semibold transition-colors ${
                  activeStep >= index ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {step.description}
                </div>
                {activeStep >= index && (
                  <div className="mt-2 space-y-1">
                    {step.examples.slice(0, 2).map((example, idx) => (
                      <div key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {example}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {index < architectureSteps.length - 1 && (
              <div className="mx-8">
                <ArrowRight className={`w-8 h-8 transition-colors ${
                  dataFlow.includes(index + 1) ? 'text-orange-500 animate-pulse' : 'text-gray-300'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-900 mb-4">Data Flow Summary</h4>
        <div className="text-sm text-orange-800">
          <strong>Producer → Event Hub → Consumer → Storage/Analytics</strong>
        </div>
        <p className="text-orange-700 text-sm mt-2">
          Events flow through partitions for parallel processing, enabling millions of events per second throughput.
        </p>
      </div>
    </div>
  )
}