import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Loader2, Trash2, FileText, Sparkles, Hash, Wand2, TrendingUp, Layers, Repeat, ChevronDown, ChevronUp } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const typeIcons = {
  post: FileText,
  hook: Sparkles,
  hashtag: Hash,
  improve: Wand2,
  viral: TrendingUp,
  carousel: Layers,
  repurpose: Repeat,
}

const typeColors = {
  post: 'bg-primary-50 text-primary-600',
  hook: 'bg-accent-50 text-accent-600',
  hashtag: 'bg-success-50 text-success-600',
  improve: 'bg-warning-50 text-warning-600',
  viral: 'bg-error-50 text-error-600',
  carousel: 'bg-secondary-100 text-secondary-600',
  repurpose: 'bg-primary-50 text-primary-700',
}

const typeLabels = {
  post: 'Post',
  hook: 'Hook',
  hashtag: 'Hashtag',
  improve: 'Improvement',
  viral: 'Viral Analysis',
  carousel: 'Carousel',
  repurpose: 'Repurpose',
}

const HistoryPage = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchHistory()
  }, [filter])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? { type: filter } : {}
      const response = await api.get('/history', { params })
      if (response.data.success) {
        setHistory(response.data.data.items)
      }
    } catch (error) {
      toast.error('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all history?')) return
    try {
      await api.delete('/history/clear')
      setHistory([])
      toast.success('History cleared')
    } catch (error) {
      toast.error('Failed to clear history')
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filters = ['all', 'post', 'hook', 'hashtag', 'improve', 'viral', 'carousel', 'repurpose']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">History</h1>
          <p className="text-secondary-500 mt-1">Your past content generation activity</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Clear History
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-white text-secondary-600 border border-secondary-200 hover:border-primary-300'
            }`}
          >
            {f === 'all' ? 'All' : typeLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-primary-600" />
        </div>
      ) : history.length === 0 ? (
        <div className="card text-center py-12">
          <Clock size={48} className="text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-600 mb-2">No history yet</h3>
          <p className="text-sm text-secondary-500">Start generating content to see your activity here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, index) => {
            const Icon = typeIcons[item.type] || FileText
            const isExpanded = expandedId === item._id
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:shadow-md transition-shadow"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => toggleExpand(item._id)}
                >
                  <div className={`w-10 h-10 ${typeColors[item.type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-secondary-900 truncate">{item.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type]}`}>
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-secondary-400" /> : <ChevronDown size={18} className="text-secondary-400" />}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-secondary-200">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-500 uppercase mb-2">Input</h4>
                            <div className="bg-secondary-50 rounded-lg p-3 text-sm text-secondary-700 max-h-48 overflow-y-auto">
                              <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(item.input, null, 2)}</pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-secondary-500 uppercase mb-2">Output</h4>
                            <div className="bg-secondary-50 rounded-lg p-3 text-sm text-secondary-700 max-h-48 overflow-y-auto">
                              <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(item.output, null, 2)}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HistoryPage
