import { useState, useEffect } from 'react'
import { Link, Zap, Target, RefreshCw, FileText, Shield, BarChart3 } from 'lucide-react'
export function DesignPrinciples() {
  const [activePrinciple, setActivePrinciple] = useState(0)
  const principles = [
    {
      id: 'loose-coupling',
      title: 'Loose Coupling',
      icon: Link,
      color: 'blue',
      description: 'Producers and consumers don\'t depend on each other directly',
      analogy: 'Like a mailroom - sender drops letter, subscribers pick up what they need',
      benefits: [
        'Services evolve independently',
        'Easy to add new consumers',
        'No direct dependencies',
        'Better maintainability'
      ],
      example: 'Producer emits OrderCreated event without knowing who will consume it'
    },
    {
      id: 'async-communication',
      title: 'Asynchronous Communication',
      icon: Zap,
      color: 'green',
      description: 'Producers don\'t wait for consumers to finish processing',
      analogy: 'Like a busy restaurant - chef doesn\'t wait for waiter to deliver each dish',
      benefits: [
        'Better scalability',
        'Improved resilience',
        'Non-blocking operations',
        'Automatic retry handling'
      ],
      example: 'Order API publishes event and continues processing new orders'
    },
    {
      id: 'event-granularity',
      title: 'Event Granularity',
      icon: Target,
      color: 'purple',
      description: 'Balance between too coarse and too fine-grained events',
      analogy: 'Like choosing the right size container - not too big, not too small',
      benefits: [
        'Efficient processing',
        'Reduced overhead',
        'Clear event purpose',
        'Optimal data transfer'
      ],
      example: 'CustomerUpdated vs separate NameChanged, AddressChanged events'
    },
    {
      id: 'idempotency',
      title: 'Idempotency',
      icon: RefreshCw,
      color: 'orange',
      description: 'Handle duplicate events gracefully without side effects',
      analogy: 'Like a light switch - pressing it twice doesn\'t break the bulb',
      benefits: [
        'Prevents duplicate actions',
        'Data consistency',
        'Fault tolerance',
        'Reliable processing'
      ],
      example: 'Payment service won\'t charge customer twice for same OrderPaid event'
    },
    {
      id: 'schema-versioning',
      title: 'Event Schema & Versioning',
      icon: FileText,
      color: 'indigo',
      description: 'Well-defined contracts with backward compatibility',
      analogy: 'Like API contracts - clear structure that evolves gracefully',
      benefits: [
        'Clear data contracts',
        'Backward compatibility',
        'Smooth evolution',
        'Consumer reliability'
      ],
      example: 'Adding discountApplied field to OrderCreated without breaking old consumers'
    },
    {
      id: 'security-governance',
      title: 'Security & Governance',
      icon: Shield,
      color: 'red',
      description: 'Authentication, encryption, and access control',
      analogy: 'Like a secure building - proper ID checks and access levels',
      benefits: [
        'Authorized access only',
        'Data protection',
        'Compliance ready',
        'Audit capabilities'
      ],
      example: 'RBAC controls who can publish to OrderEvents topic'
    },
    {
      id: 'observability',
      title: 'Monitoring & Observability',
      icon: BarChart3,
      color: 'yellow',
      description: 'Track delivery, failures, and performance metrics',
      analogy: 'Like a car dashboard - shows you what\'s happening under the hood',
      benefits: [
        'Early problem detection',
        'Performance insights',
        'Failure tracking',
        'System health visibility'
      ],
      example: 'Dead-letter queues capture failed events for investigation'
    }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrinciple((prev) => (prev + 1) % principles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [principles.length])
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', border: 'border-green-300' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
      indigo: { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300' },
      red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600', border: 'border-red-300' },
      yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }
  const renderPrincipleIcon = (principle: typeof principles[0], isActive: boolean) => {
    const IconComponent = principle.icon
    return <IconComponent className={`w-6 h-6 ${
      isActive ? getColorClasses(principle.color).text : 'text-gray-500'
    }`} />
  }
  const renderActivePrincipleIcon = () => {
    const activePrincipleData = principles[activePrinciple]
    const IconComponent = activePrincipleData.icon
    return <IconComponent className={`w-8 h-8 ${getColorClasses(activePrincipleData.color).text}`} />
  }
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🏗️ Design Principles for Event-Driven Apps</h3>
      <p className="text-gray-600 mb-8">
        Seven fundamental principles for building robust, scalable event-driven applications
      </p>
      {/* Principles Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {principles.map((principle, index) => (
          <button
            key={principle.id}
            onClick={() => setActivePrinciple(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
              activePrinciple === index
                ? `${getColorClasses(principle.color).border} ${getColorClasses(principle.color).light} scale-105`
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              {renderPrincipleIcon(principle, activePrinciple === index)}
              <span className="text-sm font-medium text-gray-900">{index + 1}</span>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{principle.title}</h4>
            <p className="text-xs text-gray-600">{principle.description}</p>
          </button>
        ))}
      </div>
      {/* Active Principle Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 ${getColorClasses(principles[activePrinciple].color).light} rounded-lg flex items-center justify-center`}>
            {renderActivePrincipleIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Principle {activePrinciple + 1}: {principles[activePrinciple].title}
            </h4>
            <p className="text-gray-700 mb-4">{principles[activePrinciple].description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Real-World Analogy:</h5>
                <div className={`p-3 rounded-lg ${getColorClasses(principles[activePrinciple].color).light} border ${getColorClasses(principles[activePrinciple].color).border}`}>
                  <p className={`text-sm ${getColorClasses(principles[activePrinciple].color).text}`}>
                    {principles[activePrinciple].analogy}
                  </p>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2 mt-4">Example:</h5>
                <p className="text-gray-700 text-sm">{principles[activePrinciple].example}</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Key Benefits:</h5>
                <ul className="space-y-2">
                  {principles[activePrinciple].benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${getColorClasses(principles[activePrinciple].color).bg} rounded-full`}></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
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