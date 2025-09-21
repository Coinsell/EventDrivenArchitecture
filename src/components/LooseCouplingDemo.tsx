import { useState, useEffect } from 'react'
import { Mail, Users, Package, CreditCard, BarChart3, ArrowRight, X, Zap } from 'lucide-react'
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
    } else {
      // Reset active connection for loose coupling
      setActiveConnection(-1)
    }
  }, [couplingType, services.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' },
      indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderServiceIcon = (service: typeof services[0], isActive: boolean = false) => {
    const IconComponent = service.icon
    return <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white'}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🔗 Loose Coupling Demonstration</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setCouplingType('tight')}
          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            couplingType === 'tight'
              ? 'border-red-300 bg-red-100 text-red-900 scale-105'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <X className={`w-6 h-6 ${couplingType === 'tight' ? 'text-red-600' : 'text-gray-500'}`} />
            <div className="text-left">
              <h4 className="font-semibold">Tightly Coupled</h4>
              <p className="text-sm">Direct service dependencies</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setCouplingType('loose')}
          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            couplingType === 'loose'
              ? 'border-green-300 bg-green-100 text-green-900 scale-105'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Zap className={`w-6 h-6 ${couplingType === 'loose' ? 'text-green-600' : 'text-gray-500'}`} />
            <div className="text-left">
              <h4 className="font-semibold">Loosely Coupled</h4>
              <p className="text-sm">Event-driven communication</p>
            </div>
          </div>
        </button>
      </div>
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg border overflow-hidden" style={{ height: '400px' }}>
        {/* Order Service - Left Side */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
            couplingType === 'tight' ? 'bg-indigo-500' : 'bg-indigo-600'
          }`}>
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="text-center mt-3 max-w-20">
            <div className="font-semibold text-gray-900 text-sm">Order Service</div>
            <div className="text-xs text-gray-600 mt-1">Producer</div>
          </div>
        </div>
        {couplingType === 'tight' ? (
          // Tight Coupling Visualization
          <>
            {/* Services on the right */}
            {services.map((service, index) => (
              <div key={service.id}>
                {/* Service Node */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{
                    right: '80px',
                    top: `${25 + index * 15}%`
                  }}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                    activeConnection === index 
                      ? getColorClasses(service.color).bg + ' scale-110' 
                      : 'bg-gray-400 scale-100'
                  }`}>
                    {renderServiceIcon(service, true)}
                  </div>
                  <div className="text-center mt-2 max-w-16">
                    <div className={`text-xs font-medium transition-colors ${
                      activeConnection === index ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {service.name}
                    </div>
                  </div>
                </div>
                {/* Animated Connection Line */}
                <svg 
                  className="absolute pointer-events-none"
                  style={{
                    left: '120px',
                    top: `${25 + index * 15}%`,
                    width: 'calc(100% - 240px)',
                    height: '2px',
                    transform: 'translateY(-1px)'
                  }}
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="100%"
                    y2="1"
                    stroke={activeConnection === index ? getColorClasses(service.color).bg.replace('bg-', '') : '#d1d5db'}
                    strokeWidth="3"
                    className={activeConnection === index ? 'animate-pulse' : ''}
                  />
                  {activeConnection === index && (
                    <circle
                      cx="0"
                      cy="1"
                      r="3"
                      fill={getColorClasses(service.color).bg.replace('bg-', '')}
                      className="animate-ping"
                    />
                  )}
                </svg>
                {/* Arrow */}
                <div
                  className="absolute transform -translate-y-1/2 transition-all duration-300"
                  style={{
                    right: '160px',
                    top: `${25 + index * 15}%`
                  }}
                >
                  <ArrowRight className={`w-6 h-6 transition-colors ${
                    activeConnection === index ? getColorClasses(service.color).text + ' animate-bounce' : 'text-gray-400'
                  }`} />
                </div>
                {/* API Call Label */}
                {activeConnection === index && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: '50%',
                      top: `${25 + index * 15 - 5}%`
                    }}
                  >
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium animate-pulse">
                      Direct API Call
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Problem Alert */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-red-50 rounded-lg border-2 border-red-200 animate-pulse">
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-800 text-sm font-medium">
                    <strong>Problem:</strong> Order Service must know about all downstream services.
                  </p>
                  <p className="text-red-700 text-xs mt-1">
                    If {services[activeConnection]?.name || 'any service'} fails, the whole chain breaks!
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Loose Coupling Visualization
          <>
            {/* Event Grid - Center */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <div className="text-center mt-3 max-w-20">
                <div className="font-semibold text-gray-900 text-sm">Event Grid</div>
                <div className="text-xs text-gray-600 mt-1">Dispatcher</div>
              </div>
            </div>
            {/* Arrow from Order to Event Grid */}
            <div className="absolute left-28 top-1/2 transform -translate-y-1/2">
              <ArrowRight className="w-8 h-8 text-green-500 animate-bounce" />
              <div className="text-xs text-green-600 mt-1 font-medium">Publish Event</div>
            </div>
            {/* Services around Event Grid */}
            {services.map((service, index) => (
              <div key={service.id}>
                {/* Service Node */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                  style={{
                    right: '80px',
                    top: `${25 + index * 15}%`
                  }}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                    getColorClasses(service.color).bg
                  } animate-pulse`} style={{ animationDelay: `${index * 200}ms` }}>
                    {renderServiceIcon(service, true)}
                  </div>
                  <div className="text-center mt-2 max-w-16">
                    <div className="text-xs font-medium text-gray-900">{service.name}</div>
                  </div>
                </div>
                {/* Dashed line from Event Grid to Service */}
                <svg 
                  className="absolute pointer-events-none"
                  style={{
                    left: '60%',
                    top: '50%',
                    width: '30%',
                    height: `${Math.abs((25 + index * 15) - 50)}%`,
                    transform: `translateY(${(25 + index * 15) > 50 ? '0' : '-100'}%)`
                  }}
                >
                  <line
                    x1="0"
                    y1={`${(25 + index * 15) > 50 ? '0' : '100'}%`}
                    x2="100%"
                    y2={`${(25 + index * 15) > 50 ? '100' : '0'}%`}
                    stroke={getColorClasses(service.color).text.replace('text-', '')}
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 300}ms` }}
                  />
                </svg>
                {/* Subscribe Label */}
                <div
                  className="absolute transform -translate-x-1/2 transition-all duration-500"
                  style={{
                    right: '40px',
                    top: `${25 + index * 15 + (index % 2 === 0 ? -3 : 3)}%`
                  }}
                >
                  <div className={`${getColorClasses(service.color).light} ${getColorClasses(service.color).text} px-2 py-1 rounded text-xs font-medium animate-pulse border ${getColorClasses(service.color).border}`}
                       style={{ animationDelay: `${index * 400}ms` }}>
                    Subscribe
                  </div>
                </div>
              </div>
            ))}
            {/* Success Alert */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-green-800 text-sm font-medium">
                    <strong>Solution:</strong> Order Service only knows about Event Grid.
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    Services subscribe independently and can be added/removed without changes!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Current Mode Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-2 rounded-lg font-medium text-sm ${
            couplingType === 'tight' 
              ? 'bg-red-100 text-red-800 border border-red-300' 
              : 'bg-green-100 text-green-800 border border-green-300'
          }`}>
            {couplingType === 'tight' ? '❌ Tightly Coupled' : '✅ Loosely Coupled'}
          </div>
        </div>
      </div>
      {/* Additional Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className={`p-4 rounded-lg border-2 transition-all ${
          couplingType === 'tight' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
        }`}>
          <h5 className="font-semibold text-gray-900 mb-2">Tight Coupling Issues:</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Order Service knows all downstream APIs</li>
            <li>• Single point of failure</li>
            <li>• Hard to add new services</li>
            <li>• Synchronous processing bottlenecks</li>
          </ul>
        </div>
        <div className={`p-4 rounded-lg border-2 transition-all ${
          couplingType === 'loose' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
        }`}>
          <h5 className="font-semibold text-gray-900 mb-2">Loose Coupling Benefits:</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Order Service only knows Event Grid</li>
            <li>• Services fail independently</li>
            <li>• Easy to add new subscribers</li>
            <li>• Asynchronous processing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}