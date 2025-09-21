export function ComparisonTable() {
  const services = [
    {
      name: 'Event Grid',
      useCase: 'Event routing & filtering',
      throughput: 'High',
      latency: 'Low',
      pricing: 'Pay per operation',
      bestFor: 'Reactive programming, serverless'
    },
    {
      name: 'Event Hub',
      useCase: 'Big data streaming',
      throughput: 'Very High',
      latency: 'Low',
      pricing: 'Throughput units',
      bestFor: 'Telemetry, IoT, analytics'
    },
    {
      name: 'Service Bus',
      useCase: 'Enterprise messaging',
      throughput: 'Medium',
      latency: 'Medium',
      pricing: 'Message operations',
      bestFor: 'Reliable messaging, transactions'
    }
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Primary Use Case</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Throughput</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Latency</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Pricing Model</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Best For</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <div className="font-semibold text-blue-600">{service.name}</div>
              </td>
              <td className="py-4 px-4 text-gray-700">{service.useCase}</td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.throughput === 'Very High' ? 'bg-green-100 text-green-800' :
                  service.throughput === 'High' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.throughput}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.latency === 'Low' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.latency}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-700">{service.pricing}</td>
              <td className="py-4 px-4 text-gray-600 text-sm">{service.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}