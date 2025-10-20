import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card, { CardBody } from '../components/Card'

const Home = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with ease.',
      icon: '✅',
      path: '/tasks'
    },
    {
      title: 'API Integration',
      description: 'Explore real API integration with JSONPlaceholder.',
      icon: '🌐',
      path: '/api-demo'
    },
    {
      title: 'Responsive Design',
      description: 'Works perfectly on all devices and screen sizes.',
      icon: '📱',
      path: '/'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to TaskFlow
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            A modern React application built with Vite, Tailwind CSS, and best practices for frontend development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tasks">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Get Started with Tasks
              </Button>
            </Link>
            <Link to="/api-demo">
              <Button variant="secondary" className="text-lg px-8 py-3">
                Explore API Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the powerful features built with modern React and Tailwind CSS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                hover 
                className="text-center animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardBody className="p-8">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                  <Link to={feature.path}>
                    <Button variant="primary">
                      Explore
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built With Modern Technologies
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { name: 'React 18', icon: '⚛️' },
              { name: 'Vite', icon: '⚡' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'React Router', icon: '🔄' }
            ].map((tech, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {tech.name}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home