import { useState, useEffect } from 'react'
import { Mail, Users, Package, CreditCard, BarChart3, ArrowRight, X } from 'lucide-react'
export function LooseCouplingDemo() {
  const [couplingType, setCouplingType] = useState<'tight' | 'loose'>('tight')
  const [activeConnection, setActiveConnection] = useState(0)
  const services = [
    { id: 'inventory', name: 'Inventory', icon: Package, color: 'blue' },
    { id: 'payment', name: 'Payment', icon: CreditCard, color: 'green' },
    { id: 'email', name: 'Email', icon: Mail, color: 'purple' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'orange' }
  ]
  useEffect(() => {
    if (couplingType === 'tight') {
      const interval = setInterval(() => {
        setActiveConnection((prev) => (prev + 1) % services.length)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [couplingType, services.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔗 Loose Coupling Demonstration</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setCouplingType('tight')}
          className={`p-4 rounded-lg border-2 transition-all ${
            couplingType === 'tight'
              ? 'border-red-300 bg-red-100 text-red-900'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <X className="w-6 h-6" />
            <div className="text-left">
              <h4 className="font-semibold">Tightly Coupled</h4>
              <p className="text-sm">Direct service dependencies</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setCouplingType('loose')}
          className={`p-4 rounded-lg border-2 transition-all ${
            couplingType === 'loose'
              ? 'border-green-300 bg-green-100 text-green-900'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6" />
            <div className="text-left">
              <h4 className="font-semibold">Loosely Coupled</h4>
              <p className="text-sm">Event-driven communication</p>
            </div>
          </div>
        </button>
      </div>
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg border" style={{ height: '300px' }}>
        {/* Order Service */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="text-center mt-2">
            <div className="font-semibold text-gray-900">Order Service</div>
          </div>
        </div>
        {couplingType === 'tight' ? (
          // Tight Coupling Visualization
          <>
            {services.map((service, index) => (
              <div key={service.id}>
                {/* Service Node */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    right: '60px',
                    top: `${20 + index * 20}%`
                  }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeConnection === index ? service.color === 'blue' ? 'bg-blue-500' :
                    service.color === 'green' ? 'bg-green-500' :
                    service.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500' : 'bg-gray-300'
                  }`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center mt-1">
                    <div className="text-xs font-medium text-gray-700">{service.name}</div>
                  </div>
                </div>
                {/* Direct Connection Arrow */}
                <div
                  className="absolute"
                  style={{
                    left: '120px',
                    top: `${20 + index * 20}%`,
                    width: 'calc(100% - 200px)',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <ArrowRight className={`w-6 h-6 ${
                    activeConnection === index ? 'text-red-500 animate-pulse' : 'text-gray-300'
                  }`} />
                  {activeConnection === index && (
                    <div className="text-xs text-red-600 mt-1">Direct API Call</div>
                  )}
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-800 text-sm">
                <strong>Problem:</strong> Order Service must know about all downstream services. 
                If one fails, the whole chain breaks.
              </p>
            </div>
          </>
        ) : (
          // Loose Coupling Visualization
          <>
            {/* Event Grid */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-center mt-2">
                <div className="font-semibold text-gray-900">Event Grid</div>
              </div>
            </div>
            {/* Arrow from Order to Event Grid */}
            <div className="absolute left-24 top-1/2 transform -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-green-500 animate-pulse" />
              <div className="text-xs text-green-600 mt-1">Publish Event</div>
            </div>
            {/* Services around Event Grid */}
            {services.map((service, index) => (
              <div key={service.id}>
                {/* Service Node */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    right: '60px',
                    top: `${20 + index * 20}%`
                  }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    service.color === 'blue' ? 'bg-blue-500' :
                    service.color === 'green' ? 'bg-green-500' :
                    service.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center mt-1">
                    <div className="text-xs font-medium text-gray-700">{service.name}</div>
                  </div>
                </div>
                {/* Dashed line from Event Grid to Service */}
                <div
                  className="absolute"
                  style={{
                    left: '60%',
                    top: '50%',
                    width: '30%',
                    height: `${(20 + index * 20) - 50}%`,
                    transformOrigin: '0 0'
                  }}
                >
                  <svg className="w-full h-full">
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      stroke={getColorClasses(service.color).text.replace('text-', '')}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 text-sm">
                <strong>Solution:</strong> Order Service only knows about Event Grid. 
                Services subscribe independently and can be added/removed without changes.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}