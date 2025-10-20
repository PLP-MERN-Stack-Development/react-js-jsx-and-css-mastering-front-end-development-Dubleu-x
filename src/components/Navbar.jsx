import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              PLP Task Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="primary" size="sm">
              Home
            </Button>
            <Button variant="secondary" size="sm">
              Tasks
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;