// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import {
//   FileText, Sparkles, Hash, Wand2, TrendingUp, Layers, Repeat,
//   ArrowRight, Zap, Bookmark, Clock, BarChart3
// } from 'lucide-react'
// import api from '../services/api.js'

// const quickActions = [
//   { label: 'Generate Post', icon: FileText, path: '/dashboard/generate', color: 'bg-primary-50 text-primary-600', border: 'border-primary-200' },
//   { label: 'Hook Generator', icon: Sparkles, path: '/dashboard/hooks', color: 'bg-accent-50 text-accent-600', border: 'border-accent-200' },
//   { label: 'Hashtags', icon: Hash, path: '/dashboard/hashtags', color: 'bg-success-50 text-success-600', border: 'border-success-200' },
//   { label: 'Post Improver', icon: Wand2, path: '/dashboard/improve', color: 'bg-warning-50 text-warning-600', border: 'border-warning-200' },
//   { label: 'Viral Score', icon: TrendingUp, path: '/dashboard/viral', color: 'bg-error-50 text-error-600', border: 'border-error-200' },
//   { label: 'Carousel', icon: Layers, path: '/dashboard/carousel', color: 'bg-secondary-100 text-secondary-600', border: 'border-secondary-200' },
//   { label: 'Repurpose', icon: Repeat, path: '/dashboard/repurpose', color: 'bg-primary-50 text-primary-700', border: 'border-primary-200' },
//   { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', color: 'bg-accent-50 text-accent-700', border: 'border-accent-200' },
// ]

// const DashboardPage = () => {
//   const navigate = useNavigate()
//   const [stats, setStats] = useState({
//     totalGenerations: 0,
//     totalPosts: 0,
//     totalHooks: 0,
//     totalHashtags: 0,
//     totalImproves: 0,
//     totalCarousels: 0,
//     totalRepurpose: 0,
//     totalSaved: 0,
//     recentActivity: []
//   })
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchStats()
//   }, [])

//   const fetchStats = async () => {
//     try {
//       const response = await api.get('/analytics')
//       if (response.data.success) {
//         setStats(response.data.data)
//       }
//     } catch (error) {
//       console.error('Stats error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const statCards = [
//     { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
//     { label: 'Hooks Generated', value: stats.totalHooks, icon: Sparkles, color: 'text-accent-600', bg: 'bg-accent-50' },
//     { label: 'Hashtags Sets', value: stats.totalHashtags, icon: Hash, color: 'text-success-600', bg: 'bg-success-50' },
//     { label: 'Saved Posts', value: stats.totalSaved, icon: Bookmark, color: 'text-warning-600', bg: 'bg-warning-50' },
//   ]

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
//           <p className="text-secondary-500 mt-1">Manage your LinkedIn content generation</p>
//         </div>
//         <button
//           onClick={() => navigate('/dashboard/generate')}
//           className="btn-primary flex items-center gap-2"
//         >
//           <Zap size={18} />
//           Generate Post
//         </button>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statCards.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="card hover:shadow-md transition-shadow duration-200"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
//                   <Icon size={18} className={stat.color} />
//                 </div>
//                 <span className="text-sm text-secondary-500 font-medium">{stat.label}</span>
//               </div>
//               <p className="text-2xl font-bold text-secondary-900">{loading ? '...' : stat.value}</p>
//             </motion.div>
//           )
//         })}
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {quickActions.map((action, index) => {
//             const Icon = action.icon
//             return (
//               <motion.button
//                 key={action.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
//                 onClick={() => navigate(action.path)}
//                 className={`card text-left hover:shadow-md transition-all duration-200 border ${action.border}`}
//               >
//                 <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
//                   <Icon size={18} />
//                 </div>
//                 <h3 className="font-semibold text-secondary-900 mb-1">{action.label}</h3>
//                 <div className="flex items-center gap-1 text-sm text-secondary-500">
//                   <span>Open</span>
//                   <ArrowRight size={14} />
//                 </div>
//               </motion.button>
//             )
//           })}
//         </div>
//       </div>

//       <div className="card">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
//             <Clock size={18} className="text-primary-600" />
//           </div>
//           <h2 className="text-lg font-semibold text-secondary-900">Recent Activity</h2>
//         </div>
//         {loading ? (
//           <div className="text-center py-8 text-secondary-500">Loading...</div>
//         ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
//           <div className="space-y-3">
//             {stats.recentActivity.map((item, index) => (
//               <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary-50 transition-colors">
//                 <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <FileText size={14} className="text-primary-600" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-secondary-900 truncate">{item.title}</p>
//                   <p className="text-xs text-secondary-500">{item.tone} tone</p>
//                 </div>
//                 <span className="text-xs text-secondary-400">
//                   {new Date(item.date).toLocaleDateString()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8 text-secondary-500">
//             <p className="mb-3">No activity yet. Start generating content!</p>
//             <button onClick={() => navigate('/dashboard/generate')} className="btn-outline text-sm">
//               Generate First Post
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DashboardPage



import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Sparkles, Hash, Wand2, TrendingUp, Layers, Repeat,
  ArrowRight, Zap, Bookmark, Clock, BarChart3, ChevronRight
} from 'lucide-react'
import api from '../services/api.js'

const quickActions = [
  { label: 'Generate Post', desc: 'Create AI-powered LinkedIn content', icon: FileText, path: '/dashboard/generate', gradient: 'from-indigo-500 to-fuchsia-500' },
  { label: 'Hook Generator', desc: 'Generate viral hooks in seconds', icon: Sparkles, path: '/dashboard/hooks', gradient: 'from-fuchsia-500 to-pink-500' },
  { label: 'Hashtags', desc: 'Find the right reach, every post', icon: Hash, path: '/dashboard/hashtags', gradient: 'from-emerald-500 to-teal-500' },
  { label: 'Post Improver', desc: 'Enhance content you already wrote', icon: Wand2, path: '/dashboard/improve', gradient: 'from-amber-500 to-orange-500' },
  { label: 'Viral Score', desc: 'Predict performance before you post', icon: TrendingUp, path: '/dashboard/viral', gradient: 'from-rose-500 to-red-500' },
  { label: 'Carousel', desc: 'Turn ideas into swipe-worthy posts', icon: Layers, path: '/dashboard/carousel', gradient: 'from-violet-500 to-indigo-500' },
  { label: 'Repurpose', desc: 'One post, many formats', icon: Repeat, path: '/dashboard/repurpose', gradient: 'from-indigo-500 to-blue-500' },
  { label: 'Analytics', desc: 'Track what is actually working', icon: BarChart3, path: '/dashboard/analytics', gradient: 'from-blue-500 to-cyan-500' },
]

const activityMeta = {
  post: { icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  hook: { icon: Sparkles, color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10' },
  hashtag: { icon: Hash, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  improve: { icon: Wand2, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  carousel: { icon: Layers, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  default: { icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
}

const relativeTime = (date) => {
  const d = new Date(date)
  const diffMs = Date.now() - d.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

const StatCard = ({ stat, index, loading }) => {
  const Icon = stat.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="relative group rounded-2xl bg-white border border-gray-200 shadow-sm p-5
                 dark:bg-white/[0.04] dark:border-white/[0.06] dark:backdrop-blur-xl dark:shadow-none
                 hover:shadow-md dark:hover:border-white/[0.12] dark:hover:shadow-[0_0_30px_-10px_rgba(129,79,255,0.35)]
                 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>
        {stat.badge !== null && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.badge >= 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
            {stat.badge >= 0 ? '↑' : '↓'} {Math.abs(stat.badge)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{loading ? '—' : stat.value}</p>
      <p className="text-sm text-gray-500 dark:text-white/50 mt-1">{stat.label}</p>
    </motion.div>
  )
}

const QuickActionCard = ({ action, index, navigate }) => {
  const Icon = action.icon
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(action.path)}
      className="group relative text-left rounded-2xl bg-white border border-gray-200 shadow-sm p-5
                 dark:bg-white/[0.04] dark:border-white/[0.06] dark:shadow-none
                 hover:shadow-md dark:hover:border-white/[0.14] transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${action.gradient} mb-4 shadow-lg
                       group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{action.label}</h3>
      <p className="text-sm text-gray-500 dark:text-white/45 leading-snug mb-3">{action.desc}</p>
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        <span>Open</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  )
}

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

  // All derived purely from real fetched stats — no hardcoded/static numbers.
  const totalActions = stats.totalPosts + stats.totalHooks + stats.totalHashtags + stats.totalImproves + stats.totalCarousels + stats.totalRepurpose
  const shareOf = (value) => totalActions > 0 ? Math.round((value / totalActions) * 100) : 0

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, gradient: 'from-indigo-500 to-blue-500', badge: null },
    { label: 'Hooks Generated', value: stats.totalHooks, icon: Sparkles, gradient: 'from-fuchsia-500 to-pink-500', badge: null },
    { label: 'Hashtag Sets', value: stats.totalHashtags, icon: Hash, gradient: 'from-emerald-500 to-teal-500', badge: null },
    { label: 'Saved Posts', value: stats.totalSaved, icon: Bookmark, gradient: 'from-amber-500 to-orange-500', badge: null },
  ]

  const performanceBars = [
    { label: 'Posts', value: stats.totalPosts, pct: shareOf(stats.totalPosts), gradient: 'from-indigo-500 to-fuchsia-500' },
    { label: 'Hooks', value: stats.totalHooks, pct: shareOf(stats.totalHooks), gradient: 'from-fuchsia-500 to-pink-500' },
    { label: 'Hashtags', value: stats.totalHashtags, pct: shareOf(stats.totalHashtags), gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Saved', value: stats.totalSaved, pct: shareOf(stats.totalSaved), gradient: 'from-amber-500 to-orange-500' },
    { label: 'Carousels', value: stats.totalCarousels, pct: shareOf(stats.totalCarousels), gradient: 'from-violet-500 to-indigo-500' },
  ]

  return (
    <div className="space-y-8 text-gray-900 dark:text-white">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative rounded-3xl border border-gray-200 bg-white shadow-sm p-8 overflow-hidden
                   dark:border-white/[0.06] dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-none"
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-200/40 to-fuchsia-200/30 dark:from-indigo-500/20 dark:to-fuchsia-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-fuchsia-200/30 to-indigo-200/20 dark:from-fuchsia-500/15 dark:to-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              👋 Welcome back
            </h1>
            <p className="text-gray-500 dark:text-white/50 mt-2 text-base">
              Ready to create high-performing LinkedIn content today?
            </p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold">{loading ? '—' : stats.totalGenerations}</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Total Generations</p>
              </div>
              <div className="w-px bg-gray-200 dark:bg-white/10" />
              <div>
                <p className="text-2xl font-bold">{loading ? '—' : stats.totalSaved}</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Saved Posts</p>
              </div>
              <div className="w-px bg-gray-200 dark:bg-white/10" />
              <div>
                <p className="text-2xl font-bold">{loading ? '—' : stats.recentActivity?.length || 0}</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Recent Actions</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard/generate')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white
                         bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20"
            >
              <Zap size={18} />
              Generate New Post
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard/analytics')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                         text-gray-700 border border-gray-300 hover:bg-gray-50
                         dark:text-white/80 dark:border-white/10 dark:hover:bg-white/[0.06]
                         transition-colors"
            >
              View Analytics
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ANALYTICS CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} loading={loading} />
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={action.label} action={action} index={index} navigate={navigate} />
          ))}
        </div>
      </div>

      {/* PERFORMANCE OVERVIEW */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6
                      dark:bg-white/[0.04] dark:border-white/[0.06] dark:backdrop-blur-xl dark:shadow-none">
        <h2 className="text-lg font-semibold mb-6">Performance Overview</h2>
        <div className="space-y-4">
          {performanceBars.map((bar, i) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-600 dark:text-white/60">{bar.label}</span>
                <span className="text-sm text-gray-400 dark:text-white/40">{bar.value}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${bar.gradient}`}
                />
              </div>
            </div>
          ))}
          {totalActions === 0 && !loading && (
            <p className="text-sm text-gray-400 dark:text-white/40 pt-2">Generate content to see your performance breakdown.</p>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY TIMELINE */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6
                      dark:bg-white/[0.04] dark:border-white/[0.06] dark:backdrop-blur-xl dark:shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400 dark:text-white/40">Loading...</div>
        ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gray-200 dark:bg-white/10" />
            <div className="space-y-5">
              {stats.recentActivity.map((item, index) => {
                const meta = activityMeta[item.type] || activityMeta.default
                const Icon = meta.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="relative flex items-start gap-4"
                  >
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ${meta.bg} ring-4 ring-white dark:ring-[#0a0c12]`} />
                    <div className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={15} className={meta.color} />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-3 p-3 rounded-xl
                                     hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{item.tone} tone</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-white/40 whitespace-nowrap">
                        {relativeTime(item.date)}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100
                            dark:from-indigo-500/20 dark:to-fuchsia-500/20
                            flex items-center justify-center mb-4">
              <FileText size={26} className="text-indigo-500 dark:text-indigo-300" />
            </div>
            <p className="text-gray-600 dark:text-white/60 mb-1">No activity yet</p>
            <p className="text-sm text-gray-400 dark:text-white/40 mb-5">Start generating content to see it show up here.</p>
            <button
              onClick={() => navigate('/dashboard/generate')}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-white
                         bg-gradient-to-r from-indigo-500 to-fuchsia-500"
            >
              Generate First Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage