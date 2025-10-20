import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';
import Card, { CardHeader, CardBody, CardFooter } from './Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('plp-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(), // Simple unique ID based on timestamp
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [task, ...prev]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="space-y-6">
      {/* Task Input Form */}
      <Card>
        <CardBody>
          <form onSubmit={addTask} className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.all}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.active}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Active</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.completed}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.all - stats.completed}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Remaining</div>
          </CardBody>
        </Card>
      </div>

      {/* Action Buttons */}
      {(tasks.length > 0) && (
        <Card>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="danger"
                onClick={clearCompletedTasks}
                disabled={stats.completed === 0}
                size="sm"
              >
                Clear Completed ({stats.completed})
              </Button>
              <Button
                variant="danger"
                onClick={clearAllTasks}
                size="sm"
              >
                Clear All Tasks
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Task List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Tasks ({filteredTasks.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'primary' : 'secondary'}
                  onClick={() => setFilter(filterType)}
                  size="sm"
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
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <span
                      className={`flex-1 ${
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
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardBody>
        {tasks.length > 0 && (
          <CardFooter>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ✅ Tasks are automatically saved to your browser's local storage and will persist after refresh.
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default TaskManager;