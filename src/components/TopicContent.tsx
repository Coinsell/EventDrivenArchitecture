import { Clock, Users, Target, Lightbulb, ArrowRight, Zap, Database, Settings, ShoppingCart } from 'lucide-react'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ComparisonTable } from './ComparisonTable'
import { AnimatedFlow } from './AnimatedFlow'
import { EDADefinitionVisual } from './EDADefinitionVisual'
import { RestaurantAnalogy } from './RestaurantAnalogy'
import { CharacteristicsBenefits } from './CharacteristicsBenefits'
import { UberEventFlow } from './UberEventFlow'
import { ScalabilityDemo } from './ScalabilityDemo'
import { AsyncProcessingDemo } from './AsyncProcessingDemo'
import { EventGridOverview } from './EventGridOverview'
import { EventGridConcepts } from './EventGridConcepts'
import { EventGridFlow } from './EventGridFlow'
import { PhotoSharingExample } from './PhotoSharingExample'
import { SmartHomeExercise } from './SmartHomeExercise'
import { NewsAnalogy } from './NewsAnalogy'
import { EventHubOverview } from './EventHubOverview'
import { EventHubArchitecture } from './EventHubArchitecture'
import { EventHubUseCases } from './EventHubUseCases'
import { UberExample } from './UberExample'
import { EventHubVsKafka } from './EventHubVsKafka'
interface Topic {
  id: string
  title: string
  duration: string
  content: string
}
interface TopicContentProps {
  topic: Topic
}
export function TopicContent({ topic }: TopicContentProps) {
  const renderTopicSpecificContent = () => {
    switch (topic.id) {
      case 'what-is-eda':
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">What is Event-Driven Architecture?</h2>
              <p className="text-xl opacity-90 mb-6">
                An approach to building software where events drive the flow of communication
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-lg">
                  💡 <strong>Think of it as:</strong> "I'll call you when I need you" instead of "I'll keep checking if you're ready"
                </p>
              </div>
            </div>
            {/* Traditional vs Event-Driven Comparison */}
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Traditional vs Event-Driven Communication</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-red-600">❌ Traditional Request-Response</h4>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Tight coupling between services</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Synchronous processing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>System fails if one service is down</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Hard to scale individual components</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-600">✅ Event-Driven Architecture</h4>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Loose coupling between services</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Asynchronous processing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Resilient to service failures</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Easy to scale horizontally</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* EDA Definition Visual */}
            <EDADefinitionVisual />
            {/* Restaurant Analogy */}
            <RestaurantAnalogy />
            {/* Interactive Event Flow */}
            <AnimatedFlow />
            {/* Food Delivery App Exercise */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🍕 Exercise: Food Delivery App Events</h3>
              <p className="text-lg text-gray-700 mb-6">
                Think about a food delivery app like Swiggy or Uber Eats. What events would you expect?
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Order Placed', 'Payment Successful', 'Restaurant Confirmed',
                  'Food Preparation Started', 'Delivery Partner Assigned', 'Order Picked Up',
                  'Order Out for Delivery', 'Order Delivered', 'Rating Submitted'
                ].map((event, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{event}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <p className="text-gray-700">
                  <strong>Key Insight:</strong> Each event can trigger multiple consumers - analytics, notifications, 
                  inventory updates, loyalty points, etc. - all working independently!
                </p>
              </div>
            </div>
          </div>
        )
      case 'characteristics':
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Characteristics & Benefits</h2>
              <p className="text-xl opacity-90">
                The DNA of event-driven systems - what makes them powerful and scalable
              </p>
            </div>
            {/* Characteristics Overview */}
            <CharacteristicsBenefits />
            {/* Scalability Demo */}
            <ScalabilityDemo />
            {/* Async Processing Demo */}
            <AsyncProcessingDemo />
            {/* Uber Event Flow Exercise */}
            <UberEventFlow />
            {/* School Assembly Analogy */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🏫 School Assembly Analogy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bell Rings</h4>
                  <p className="text-gray-600 text-sm">
                    Event Producer - The bell doesn't call each person individually, it just rings once
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Everyone Reacts</h4>
                  <p className="text-gray-600 text-sm">
                    Event Consumers - Students, teachers, admin all react based on their role
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Loose Coupling</h4>
                  <p className="text-gray-600 text-sm">
                    The bell doesn't know who will respond - perfect loose coupling example
                  </p>
                </div>
              </div>
            </div>
            {/* Key Takeaways */}
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Key Takeaways</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Loose Coupling</h4>
                      <p className="text-gray-600 text-sm">Systems are independent, easy to evolve</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Scalability</h4>
                      <p className="text-gray-600 text-sm">Handle millions of events, scale consumers independently</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Asynchronous Processing</h4>
                      <p className="text-gray-600 text-sm">Faster, more responsive user experiences</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-600 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Resilience</h4>
                      <p className="text-gray-600 text-sm">Fault-tolerant and reliable systems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-yellow-600 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexibility</h4>
                      <p className="text-gray-600 text-sm">Easy to plug in new features without redesign</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-indigo-600 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Responsiveness</h4>
                      <p className="text-gray-600 text-sm">Near real-time event processing capabilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'event-grid':
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Azure Event Grid Overview</h2>
              <p className="text-xl opacity-90 mb-6">
                The post office of Azure events - delivering messages reliably and at scale
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-lg">
                  🏢 <strong>Central Nervous System:</strong> Event Grid connects all your Azure services through events
                </p>
              </div>
            </div>
            {/* Event Grid Overview */}
            <EventGridOverview />
            {/* Key Concepts */}
            <EventGridConcepts />
            {/* Event Flow */}
            <EventGridFlow />
            {/* Photo Sharing Example */}
            <PhotoSharingExample />
            {/* News Analogy */}
            <NewsAnalogy />
            {/* Smart Home Exercise */}
            <SmartHomeExercise />
            {/* Benefits Summary */}
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Key Takeaways</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Event Routing Backbone</h4>
                      <p className="text-gray-600 text-sm">Central hub for all Azure event communication</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Target className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Topics & Subscriptions</h4>
                      <p className="text-gray-600 text-sm">Flexible event routing with smart filtering</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <Database className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Scalable & Reliable</h4>
                      <p className="text-gray-600 text-sm">Millions of events per second with guaranteed delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                      <Settings className="w-3 h-3 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Perfect for Serverless</h4>
                      <p className="text-gray-600 text-sm">Ideal for event-driven, serverless applications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'event-hub':
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Azure Event Hub Overview</h2>
              <p className="text-xl opacity-90 mb-6">
                Big data streaming platform and event ingestion service
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-lg">
                  🔥 <strong>The Massive Firehose:</strong> If Event Grid is the dispatcher, Event Hub is the streaming pipeline
                </p>
              </div>
            </div>
            {/* Event Hub Overview */}
            <EventHubOverview />
            {/* Architecture Flow */}
            <EventHubArchitecture />
            {/* Use Cases */}
            <EventHubUseCases />
            {/* Uber Example */}
            <UberExample />
            {/* Event Hub vs Kafka */}
            <EventHubVsKafka />
            {/* Key Takeaways */}
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">🎯 Key Takeaways</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Big Data Streaming</h4>
                      <p className="text-gray-600 text-sm">Azure's event ingestion pipeline for massive scale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <Database className="w-3 h-3 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">High-Throughput</h4>
                      <p className="text-gray-600 text-sm">Millions of events per second with low latency</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Target className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-Time Analytics</h4>
                      <p className="text-gray-600 text-sm">Perfect for streaming analytics and insights</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <Settings className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Kafka Compatible</h4>
                      <p className="text-gray-600 text-sm">Seamless migration from existing Kafka workloads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'comparison':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Service Comparison</h2>
              <ComparisonTable />
            </div>
          </div>
        )
      case 'architecture-example':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Real-Time Order Processing</h2>
              <ArchitectureDiagram />
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{topic.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Cloud Architects</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg">{topic.content}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Learning Objectives</h3>
                <p className="text-gray-600 text-sm">
                  Understand core concepts and practical implementation strategies
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hands-on Examples</h3>
                <p className="text-gray-600 text-sm">
                  Real-world scenarios and architecture patterns
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interactive Learning</h3>
                <p className="text-gray-600 text-sm">
                  Engaging visualizations and animated workflows
                </p>
              </div>
            </div>
          </div>
        )
    }
  }
  return (
    <div className="max-w-6xl mx-auto">
      {renderTopicSpecificContent()}
    </div>
  )
}