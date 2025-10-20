import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card, { CardHeader, CardBody } from './Card';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Limit to 10 posts for demo
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                API Data from JSONPlaceholder
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Demonstrating API integration with search functionality
              </p>
            </div>
            <Button onClick={fetchData} variant="primary" disabled={loading}>
              {loading ? 'Loading...' : 'Refresh Data'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Search Input */}
      <Card>
        <CardBody>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </CardBody>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 dark:border-red-800">
          <CardBody>
            <div className="text-red-600 dark:text-red-400 text-center">
              Error: {error}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardBody>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Data Display */}
      {!loading && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} hover className="animate-fade-in">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.body}
                </p>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Post ID: {post.id}</span>
                  <span>User ID: {post.userId}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && searchTerm && filteredPosts.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No posts found matching "{searchTerm}"
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ApiData;