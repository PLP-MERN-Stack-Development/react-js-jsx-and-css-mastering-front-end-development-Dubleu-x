import React, { useState, useEffect, useCallback } from 'react'
import { api } from '../api/jsonPlaceholder'
import Button from '../components/Button'
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card'

const ApiDemo = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [total, setTotal] = useState(0)

  const limit = 10

  const fetchPosts = useCallback(async (pageNum, query = '') => {
    setLoading(true)
    setError('')
    
    try {
      const result = query 
        ? await api.searchPosts(query, pageNum, limit)
        : await api.getPosts(pageNum, limit)
      
      if (pageNum === 1) {
        setPosts(result.data)
      } else {
        setPosts(prev => [...prev, ...result.data])
      }
      
      setTotal(result.total)
      setHasMore(pageNum * limit < result.total)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts(1, searchQuery)
  }, [searchQuery, fetchPosts])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage, searchQuery)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const query = formData.get('search')
    setSearchQuery(query)
    setPage(1)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Integration Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching and displaying data from JSONPlaceholder API
          </p>
        </div>

        <Card className="mb-6">
          <CardBody>
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
              <input
                type="text"
                name="search"
                placeholder="Search posts..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>
            {searchQuery && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing results for "{searchQuery}" ({posts.length} of {total} posts)
              </div>
            )}
          </CardBody>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <CardBody>
              <div className="text-red-600 dark:text-red-400 text-center">
                Error: {error}
              </div>
            </CardBody>
          </Card>
        )}

        {loading && posts.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post, index) => (
                <Card 
                  key={`${post.id}-${index}`} 
                  hover 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.body}
                    </p>
                  </CardBody>
                  <CardFooter>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Post ID: {post.id} | User ID: {post.userId}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}

            {hasMore && !loading && (
              <div className="text-center">
                <Button onClick={loadMore} variant="primary">
                  Load More
                </Button>
              </div>
            )}

            {!hasMore && posts.length > 0 && (
              <Card>
                <CardBody>
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    You've reached the end! {posts.length} of {total} posts loaded.
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ApiDemo