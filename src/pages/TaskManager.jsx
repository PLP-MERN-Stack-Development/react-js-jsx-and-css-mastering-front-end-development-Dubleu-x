import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Button from '../components/Button'
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTasks(prev => [task, ...prev])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const stats = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your tasks efficiently
          </p>
        </div>

        <Card className="mb-6">
          <CardBody>
            <form onSubmit={addTask} className="flex gap-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button type="submit" variant="primary">
                Add Task
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <CardBody>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.all}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.completed}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.all - stats.completed}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Remaining</div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Tasks
              </h2>
              <div className="flex space-x-2">
                {['all', 'active', 'completed'].map((filterType) => (
                  <Button
                    key={filterType}
                    variant={filter === filterType ? 'primary' : 'secondary'}
                    onClick={() => setFilter(filterType)}
                    className="capitalize"
                  >
                    {filterType}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {tasks.length === 0 
                  ? "No tasks yet. Add your first task above!" 
                  : `No ${filter} tasks found.`}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 animate-slide-in ${
                      task.completed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span
                        className={`${
                          task.completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TaskManager