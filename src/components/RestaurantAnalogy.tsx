import { useState, useEffect } from 'react'
import { ChefHat, Users, Utensils, Clock } from 'lucide-react'
export function RestaurantAnalogy() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    {
      id: 'order',
      title: 'Customer Places Order',
      description: 'You place your order with the waiter',
      role: 'Event Producer',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'kitchen',
      title: 'Order Goes to Kitchen',
      description: 'Order is passed to the kitchen system',
      role: 'Event Router',
      icon: Utensils,
      color: 'bg-yellow-500'
    },
    {
      id: 'chefs',
      title: 'Chefs Process Order',
      description: 'Different chefs handle different parts',
      role: 'Event Consumers',
      icon: ChefHat,
      color: 'bg-green-500'
    }
  ]
  const chefs = [
    { name: 'Grill Chef', specialty: 'Meat orders only', active: false },
    { name: 'Dessert Chef', specialty: 'Dessert orders only', active: true },
    { name: 'Drinks Station', specialty: 'Beverage orders only', active: false }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [steps.length])
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">🍽️ Real-World Analogy: Restaurant</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-6 rounded-lg border-2 transition-all duration-500 ${
              activeStep === index
                ? 'border-blue-300 bg-blue-50 scale-105'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              activeStep === index ? step.color : 'bg-gray-300'
            }`}>
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{step.description}</p>
            <div className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {step.role}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">The Beauty of Loose Coupling</h4>
        <p className="text-gray-700 mb-4">
          When you order dessert, the grill chef doesn't even care. Each chef only reacts to relevant orders.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                chef.active
                  ? 'bg-green-100 border-green-300'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ChefHat className={`w-5 h-5 ${
                  chef.active ? 'text-green-600' : 'text-gray-500'
                }`} />
                <div>
                  <div className="font-medium text-gray-900">{chef.name}</div>
                  <div className="text-xs text-gray-600">{chef.specialty}</div>
                </div>
              </div>
              {chef.active && (
                <div className="mt-2 text-xs text-green-700 bg-green-200 px-2 py-1 rounded">
                  Currently Processing
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h5 className="font-semibold text-blue-900">Key Takeaway</h5>
            <p className="text-blue-800 text-sm">
              Each consumer (chef) listens for relevant events and reacts accordingly. 
              This is exactly how event-driven systems work in the cloud!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}