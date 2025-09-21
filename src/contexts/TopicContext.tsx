import { createContext, useContext, useState, ReactNode } from 'react'
interface Topic {
  id: string
  title: string
  duration: string
  content: string
  subtopics?: Topic[]
}
interface TopicContextType {
  currentTopic: string
  setCurrentTopic: (topicId: string) => void
  topics: Topic[]
}
const topics: Topic[] = [
  {
    id: 'intro',
    title: 'Introduction to Event-Driven Architecture',
    duration: '1 hr',
    content: 'Event-Driven Architecture & Messaging in Azure',
    subtopics: [
      {
        id: 'what-is-eda',
        title: 'What is Event-Driven Architecture?',
        duration: '10 mins',
        content: 'Definition, key characteristics, decoupling, async processing'
      },
      {
        id: 'characteristics',
        title: 'Characteristics & Benefits',
        duration: '10 mins',
        content: 'Scalability, resilience, flexibility, cost optimization'
      },
      {
        id: 'event-grid',
        title: 'Azure Event Grid Overview',
        duration: '10 mins',
        content: 'Event sources, topics, subscriptions, handlers'
      },
      {
        id: 'event-hub',
        title: 'Azure Event Hub Overview',
        duration: '15 mins',
        content: 'Event ingestion, real-time streaming, analytics'
      },
      {
        id: 'comparison',
        title: 'Comparison: Event Grid vs Event Hub vs Service Bus',
        duration: '10 mins',
        content: 'Use case driven comparison'
      },
      {
        id: 'architecture-example',
        title: 'Architecture Example – Real-Time Order Processing',
        duration: '5 mins',
        content: 'Diagram: Order received → Event Grid → Function → Storage'
      }
    ]
  },
  {
    id: 'event-grid-design',
    title: 'Designing Event-Driven Apps using Event Grid',
    duration: '1 hr',
    content: 'Deep dive into Event Grid design patterns',
    subtopics: [
      {
        id: 'design-principles',
        title: 'Design Principles for Event-Driven Apps',
        duration: '10 mins',
        content: 'Loose coupling, scalability, failure handling'
      },
      {
        id: 'custom-events',
        title: 'Event Grid Topics & Custom Events',
        duration: '10 mins',
        content: 'Publishing custom events, topic creation'
      },
      {
        id: 'routing-filtering',
        title: 'Event Routing & Filtering',
        duration: '10 mins',
        content: 'Advanced filtering, event domains'
      },
      {
        id: 'security-governance',
        title: 'Security & Governance in Event Grid',
        duration: '15 mins',
        content: 'Authentication, RBAC, policies'
      },
      {
        id: 'serverless-processing',
        title: 'Use Case – Serverless Event Processing',
        duration: '10 mins',
        content: 'Functions + Event Grid demo scenario'
      },
      {
        id: 'logic-apps-diagram',
        title: 'Architecture Diagram – Event Grid with Logic Apps',
        duration: '5 mins',
        content: 'Integration example'
      }
    ]
  },
  {
    id: 'queues',
    title: 'Azure Storage Queues and Service Bus Queues',
    duration: '1 hr',
    content: 'Messaging queues deep dive',
    subtopics: [
      {
        id: 'messaging-intro',
        title: 'Introduction to Messaging Queues',
        duration: '10 mins',
        content: 'Asynchronous messaging basics'
      },
      {
        id: 'storage-queues',
        title: 'Azure Storage Queues',
        duration: '10 mins',
        content: 'Features, use cases, limitations'
      },
      {
        id: 'service-bus-queues',
        title: 'Service Bus Queues',
        duration: '10 mins',
        content: 'Features – sessions, dead-letter, transactions'
      },
      {
        id: 'topics-subscriptions',
        title: 'Service Bus Topics & Subscriptions',
        duration: '15 mins',
        content: 'Publish-subscribe pattern in Service Bus'
      },
      {
        id: 'queues-comparison',
        title: 'Storage Queues vs Service Bus Queues',
        duration: '10 mins',
        content: 'Comparison table'
      },
      {
        id: 'fulfillment-pipeline',
        title: 'Architecture Example – Order Fulfillment Pipeline',
        duration: '5 mins',
        content: 'End-to-end workflow'
      }
    ]
  },
  {
    id: 'integration-patterns',
    title: 'Integration Patterns: Publish-Subscribe, FIFO',
    duration: '1 hr',
    content: 'Advanced integration patterns',
    subtopics: [
      {
        id: 'patterns-overview',
        title: 'Integration Patterns Overview',
        duration: '10 mins',
        content: 'Common messaging/integration patterns'
      },
      {
        id: 'pub-sub-pattern',
        title: 'Publish-Subscribe Pattern',
        duration: '15 mins',
        content: 'Fan-out, broadcasting'
      },
      {
        id: 'fifo-ordering',
        title: 'FIFO & Message Ordering',
        duration: '10 mins',
        content: 'Message sequencing, ordering guarantees'
      },
      {
        id: 'dead-letter-retry',
        title: 'Dead-Letter Queues & Retry Policies',
        duration: '15 mins',
        content: 'Reliability & fault handling'
      },
      {
        id: 'hybrid-integration',
        title: 'Hybrid Integration',
        duration: '5 mins',
        content: 'Event Grid + Service Bus + Functions'
      },
      {
        id: 'ecommerce-workflow',
        title: 'Real-World Example – E-commerce Checkout Workflow',
        duration: '5 mins',
        content: 'Diagram and explanation'
      }
    ]
  }
]
const TopicContext = createContext<TopicContextType | undefined>(undefined)
export function TopicProvider({ children }: { children: ReactNode }) {
  const [currentTopic, setCurrentTopic] = useState('intro')
  return (
    <TopicContext.Provider value={{ currentTopic, setCurrentTopic, topics }}>
      {children}
    </TopicContext.Provider>
  )
}
export function useTopics() {
  const context = useContext(TopicContext)
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider')
  }
  return context
}