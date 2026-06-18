import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Sparkles, Hash, Wand2, TrendingUp, Layers, Repeat,
  ArrowRight, Zap, Bookmark, Clock, BarChart3
} from 'lucide-react'
import api from '../services/api.js'

const quickActions = [
  { label: 'Generate Post', icon: FileText, path: '/dashboard/generate', color: 'bg-primary-50 text-primary-600', border: 'border-primary-200' },
  { label: 'Hook Generator', icon: Sparkles, path: '/dashboard/hooks', color: 'bg-accent-50 text-accent-600', border: 'border-accent-200' },
  { label: 'Hashtags', icon: Hash, path: '/dashboard/hashtags', color: 'bg-success-50 text-success-600', border: 'border-success-200' },
  { label: 'Post Improver', icon: Wand2, path: '/dashboard/improve', color: 'bg-warning-50 text-warning-600', border: 'border-warning-200' },
  { label: 'Viral Score', icon: TrendingUp, path: '/dashboard/viral', color: 'bg-error-50 text-error-600', border: 'border-error-200' },
  { label: 'Carousel', icon: Layers, path: '/dashboard/carousel', color: 'bg-secondary-100 text-secondary-600', border: 'border-secondary-200' },
  { label: 'Repurpose', icon: Repeat, path: '/dashboard/repurpose', color: 'bg-primary-50 text-primary-700', border: 'border-primary-200' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', color: 'bg-accent-50 text-accent-700', border: 'border-accent-200' },
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalGenerations: 0,
    totalPosts: 0,
    totalHooks: 0,
    totalHashtags: 0,
    totalImproves: 0,
    totalCarousels: 0,
    totalRepurpose: 0,
    totalSaved: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/analytics')
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error('Stats error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Hooks Generated', value: stats.totalHooks, icon: Sparkles, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Hashtags Sets', value: stats.totalHashtags, icon: Hash, color: 'text-success-600', bg: 'bg-success-50' },
    { label: 'Saved Posts', value: stats.totalSaved, icon: Bookmark, color: 'text-warning-600', bg: 'bg-warning-50' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-secondary-500 mt-1">Manage your LinkedIn content generation</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/generate')}
          className="btn-primary flex items-center gap-2"
        >
          <Zap size={18} />
          Generate Post
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <span className="text-sm text-secondary-500 font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-secondary-900">{loading ? '...' : stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                onClick={() => navigate(action.path)}
                className={`card text-left hover:shadow-md transition-all duration-200 border ${action.border}`}
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{action.label}</h3>
                <div className="flex items-center gap-1 text-sm text-secondary-500">
                  <span>Open</span>
                  <ArrowRight size={14} />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Clock size={18} className="text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-secondary-900">Recent Activity</h2>
        </div>
        {loading ? (
          <div className="text-center py-8 text-secondary-500">Loading...</div>
        ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="space-y-3">
            {stats.recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary-50 transition-colors">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">{item.title}</p>
                  <p className="text-xs text-secondary-500">{item.tone} tone</p>
                </div>
                <span className="text-xs text-secondary-400">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary-500">
            <p className="mb-3">No activity yet. Start generating content!</p>
            <button onClick={() => navigate('/dashboard/generate')} className="btn-outline text-sm">
              Generate First Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
