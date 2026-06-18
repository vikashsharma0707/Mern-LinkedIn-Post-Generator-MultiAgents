import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Loader2, FileText, Sparkles, Hash, Wand2, Layers, Repeat, Bookmark } from 'lucide-react'
import api from '../services/api.js'

const statCards = [
  { label: 'Total Posts', field: 'totalPosts', icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
  { label: 'Hooks', field: 'totalHooks', icon: Sparkles, color: 'text-accent-600', bg: 'bg-accent-50' },
  { label: 'Hashtags', field: 'totalHashtags', icon: Hash, color: 'text-success-600', bg: 'bg-success-50' },
  { label: 'Improved', field: 'totalImproves', icon: Wand2, color: 'text-warning-600', bg: 'bg-warning-50' },
  { label: 'Carousels', field: 'totalCarousels', icon: Layers, color: 'text-secondary-600', bg: 'bg-secondary-100' },
  { label: 'Repurposed', field: 'totalRepurpose', icon: Repeat, color: 'text-primary-700', bg: 'bg-primary-50' },
]

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics')
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error('Analytics error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-primary-600" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <BarChart3 size={48} className="text-secondary-300 mx-auto mb-4" />
        <p className="text-secondary-600">Failed to load analytics  ai</p>
      </div>
    )
  }

  const totalGenerations = stats.totalGenerations || 0
  const totalSaved = stats.totalSaved || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Analytics</h1>
        <p className="text-secondary-500 mt-1">Track your content generation activity</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BarChart3 size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">Total Generations</span>
          </div>
          <p className="text-3xl font-bold">{totalGenerations}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Bookmark size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">Saved Posts</span>
          </div>
          <p className="text-3xl font-bold">{totalSaved}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-success-500 to-success-600 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">Posts Created</span>
          </div>
          <p className="text-3xl font-bold">{stats.totalPosts || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-secondary-600 to-secondary-700 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">Hooks Generated</span>
          </div>
          <p className="text-3xl font-bold">{stats.totalHooks || 0}</p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const value = stats[stat.field] || 0
          const percentage = totalGenerations > 0 ? Math.round((value / totalGenerations) * 100) : 0
          return (
            <motion.div
              key={stat.field}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <span className="text-sm text-secondary-500 font-medium">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-secondary-900">{value}</p>
                <span className="text-xs text-secondary-500">{percentage}% of total</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5 mt-3">
                <div
                  className={`h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="card">
        <h3 className="font-semibold text-secondary-900 mb-4">Activity Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Post Generation</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalPosts || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalPosts / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Hook Generation</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalHooks || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-accent-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalHooks / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Hashtag Generation</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalHashtags || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-success-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalHashtags / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Post Improvements</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalImproves || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-warning-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalImproves / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Carousels</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalCarousels || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-secondary-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalCarousels / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-secondary-700">Content Repurposed</span>
                <span className="text-sm font-semibold text-secondary-900">{stats.totalRepurpose || 0}</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-1.5">
                <div className="bg-primary-700 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalRepurpose / totalGenerations) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
