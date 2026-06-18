import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Loader2, Trash2, FileText, Copy, Check, ExternalLink } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const SavedPostsPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts')
      if (response.data.success) {
        const saved = response.data.data.filter(p => p.isSaved)
        setPosts(saved)
      }
    } catch (error) {
      toast.error('Failed to load saved posts')
    } finally {
      setLoading(false)
    }
  }

  const handleUnsave = async (id) => {
    try {
      await api.put(`/posts/${id}/save`)
      setPosts(posts.filter(p => p._id !== id))
      toast.success('Post removed from saved')
    } catch (error) {
      toast.error('Failed to remove post')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await api.delete(`/posts/${id}`)
      setPosts(posts.filter(p => p._id !== id))
      toast.success('Post deleted')
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    toast.success('Post copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Saved Posts</h1>
        <p className="text-secondary-500 mt-1">Your collection of saved LinkedIn posts</p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <Bookmark size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-600 mb-2">No saved posts</h3>
          <p className="text-sm text-secondary-500">Generate posts and save them to see them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <FileText size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{post.topic}</h3>
                    <div className="flex items-center gap-2 text-xs text-secondary-500">
                      <span className="capitalize">{post.tone}</span>
                      <span>·</span>
                      <span className="capitalize">{post.length}</span>
                      <span>·</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(post.content, post._id)}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                    title="Copy post"
                  >
                    {copiedId === post._id ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                  </button>
                  <button
                    onClick={() => handleUnsave(post._id)}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark size={16} className="text-primary-600 fill-primary-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 rounded-lg hover:bg-error-50 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 size={16} className="text-error-500" />
                  </button>
                </div>
              </div>

              <div className="bg-secondary-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-secondary-800 leading-relaxed whitespace-pre-wrap line-clamp-6">{post.content}</p>
              </div>

              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPostsPage
