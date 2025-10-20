import { useState } from 'react';
import './App.css';

// Import your components here
import Button from './components/Button';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import ApiData from './components/ApiData';
import { ThemeProvider } from './context/ThemeContext';

// Card component (since we're using it directly in App.jsx)
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg ${className}`}>
    {children}
  </div>
);

function App() {
  const [count, setCount] = useState(0);
  const [activeSection, setActiveSection] = useState('tasks');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
        {/* Navbar component */}
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant={activeSection === 'tasks' ? 'primary' : 'secondary'}
              onClick={() => setActiveSection('tasks')}
            >
              Task Manager
            </Button>
            <Button
              variant={activeSection === 'api' ? 'primary' : 'secondary'}
              onClick={() => setActiveSection('api')}
            >
              API Data
            </Button>
            <Button
              variant={activeSection === 'demo' ? 'primary' : 'secondary'}
              onClick={() => setActiveSection('demo')}
            >
              Demo Counter
            </Button>
          </div>

          {/* Task Manager Section */}
          {activeSection === 'tasks' && <TaskManager />}

          {/* API Data Section */}
          {activeSection === 'api' && <ApiData />}

          {/* Demo Counter Section (Your original code) */}
          {activeSection === 'demo' && (
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg mb-4">
                    Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR
                  </p>
                  
                  <div className="flex items-center gap-4 my-4">
                    <Button
                      onClick={() => setCount((count) => count - 1)}
                      variant="danger"
                    >
                      -
                    </Button>
                    <span className="text-xl font-bold">{count}</span>
                    <Button
                      onClick={() => setCount((count) => count + 1)}
                      variant="success"
                    >
                      +
                    </Button>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 mt-4">
                    This demonstrates state management with useState hook
                  </p>
                </div>
              </Card>
            </div>
          )}
        </main>

        {/* Footer component */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;