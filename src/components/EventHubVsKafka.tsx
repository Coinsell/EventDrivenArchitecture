import { useState } from 'react'
import { Cloud, Server, Zap, Settings, Shield, DollarSign } from 'lucide-react'
export function EventHubVsKafka() {
  const [activeComparison, setActiveComparison] = useState(0)
  const comparisons = [
    {
      aspect: 'Management',
      eventHub: 'Fully managed by Azure',
      kafka: 'Self-managed clusters',
      icon: Settings,
      eventHubAdvantage: true
    },
    {
      aspect: 'Scalability',
      eventHub: 'Auto-scaling built-in',
      kafka: 'Manual cluster scaling',
      icon: Zap,
      eventHubAdvantage: true
    },
    {
      aspect: 'Compatibility',
      eventHub: 'Kafka protocol compatible',
      kafka: 'Native Kafka protocol',
      icon: Cloud,
      eventHubAdvantage: false
    },
    {
      aspect: 'Security',
      eventHub: 'Azure AD integration',
      kafka: 'Custom security setup',
      icon: Shield,
      eventHubAdvantage: true
    },
    {
      aspect: 'Cost',
      eventHub: 'Pay-per-use model',
      kafka: 'Infrastructure + maintenance',
      icon: DollarSign,
      eventHubAdvantage: true
    },
    {
      aspect: 'Deployment',
      eventHub: 'Cloud-native service',
      kafka: 'On-premises or cloud VMs',
      icon: Server,
      eventHubAdvantage: true
    }
  ]
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">⚖️ Event Hub vs Apache Kafka</h3>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <Cloud className="w-6 h-6 text-blue-600" />
          <div>
            <h4 className="font-semibold text-blue-900">Kafka Compatibility</h4>
            <p className="text-blue-800 text-sm">
              Event Hub is Kafka-compatible, meaning existing Kafka producers and consumers 
              can often connect without code changes.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mb-8">
        {comparisons.map((comparison, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              activeComparison === index
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setActiveComparison(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <comparison.icon className={`w-6 h-6 ${
                  activeComparison === index ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <h4 className="font-semibold text-gray-900">{comparison.aspect}</h4>
              </div>
              <div className="grid grid-cols-2 gap-8 flex-1 max-w-2xl">
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-900 mb-1">Event Hub</div>
                  <div className={`text-sm p-2 rounded ${
                    comparison.eventHubAdvantage ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {comparison.eventHub}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-900 mb-1">Apache Kafka</div>
                  <div className={`text-sm p-2 rounded ${
                    !comparison.eventHubAdvantage ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {comparison.kafka}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-4">✅ Choose Event Hub When:</h4>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• You want fully managed service</li>
            <li>• Auto-scaling is important</li>
            <li>• Azure ecosystem integration needed</li>
            <li>• Minimal operational overhead desired</li>
            <li>• Pay-per-use pricing preferred</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-4">⚠️ Choose Kafka When:</h4>
          <ul className="space-y-2 text-orange-800 text-sm">
            <li>• Full control over configuration needed</li>
            <li>• On-premises deployment required</li>
            <li>• Custom Kafka features essential</li>
            <li>• Multi-cloud strategy in place</li>
            <li>• Existing Kafka expertise available</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <h5 className="font-semibold text-green-900">Migration Path</h5>
            <p className="text-green-800 text-sm">
              Event Hub provides "Kafka as a Service" - enterprises can migrate existing Kafka 
              workloads to Azure without rewriting applications, while gaining managed service benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}