// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { BarChart3, Loader2, FileText, Sparkles, Hash, Wand2, Layers, Repeat, Bookmark } from 'lucide-react'
// import api from '../services/api.js'

// const statCards = [
//   { label: 'Total Posts', field: 'totalPosts', icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
//   { label: 'Hooks', field: 'totalHooks', icon: Sparkles, color: 'text-accent-600', bg: 'bg-accent-50' },
//   { label: 'Hashtags', field: 'totalHashtags', icon: Hash, color: 'text-success-600', bg: 'bg-success-50' },
//   { label: 'Improved', field: 'totalImproves', icon: Wand2, color: 'text-warning-600', bg: 'bg-warning-50' },
//   { label: 'Carousels', field: 'totalCarousels', icon: Layers, color: 'text-secondary-600', bg: 'bg-secondary-100' },
//   { label: 'Repurposed', field: 'totalRepurpose', icon: Repeat, color: 'text-primary-700', bg: 'bg-primary-50' },
// ]

// const AnalyticsPage = () => {
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchAnalytics()
//   }, [])

//   const fetchAnalytics = async () => {
//     try {
//       const response = await api.get('/analytics')
//       if (response.data.success) {
//         setStats(response.data.data)
//       }
//     } catch (error) {
//       console.error('Analytics error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <Loader2 size={24} className="animate-spin text-primary-600" />
//       </div>
//     )
//   }

//   if (!stats) {
//     return (
//       <div className="text-center py-12">
//         <BarChart3 size={48} className="text-secondary-300 mx-auto mb-4" />
//         <p className="text-secondary-600">Failed to load analytics  ai</p>
//       </div>
//     )
//   }

//   const totalGenerations = stats.totalGenerations || 0
//   const totalSaved = stats.totalSaved || 0

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-secondary-900">Analytics</h1>
//         <p className="text-secondary-500 mt-1">Track your content generation activity</p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//               <BarChart3 size={18} className="text-white" />
//             </div>
//             <span className="text-sm font-medium text-white/80">Total Generations</span>
//           </div>
//           <p className="text-3xl font-bold">{totalGenerations}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//               <Bookmark size={18} className="text-white" />
//             </div>
//             <span className="text-sm font-medium text-white/80">Saved Posts</span>
//           </div>
//           <p className="text-3xl font-bold">{totalSaved}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="card bg-gradient-to-br from-success-500 to-success-600 text-white"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//               <FileText size={18} className="text-white" />
//             </div>
//             <span className="text-sm font-medium text-white/80">Posts Created</span>
//           </div>
//           <p className="text-3xl font-bold">{stats.totalPosts || 0}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="card bg-gradient-to-br from-secondary-600 to-secondary-700 text-white"
//         >
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//               <Sparkles size={18} className="text-white" />
//             </div>
//             <span className="text-sm font-medium text-white/80">Hooks Generated</span>
//           </div>
//           <p className="text-3xl font-bold">{stats.totalHooks || 0}</p>
//         </motion.div>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {statCards.map((stat, index) => {
//           const Icon = stat.icon
//           const value = stats[stat.field] || 0
//           const percentage = totalGenerations > 0 ? Math.round((value / totalGenerations) * 100) : 0
//           return (
//             <motion.div
//               key={stat.field}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 + index * 0.05 }}
//               className="card hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
//                   <Icon size={18} className={stat.color} />
//                 </div>
//                 <span className="text-sm text-secondary-500 font-medium">{stat.label}</span>
//               </div>
//               <div className="flex items-end justify-between">
//                 <p className="text-2xl font-bold text-secondary-900">{value}</p>
//                 <span className="text-xs text-secondary-500">{percentage}% of total</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5 mt-3">
//                 <div
//                   className={`h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')}`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               </div>
//             </motion.div>
//           )
//         })}
//       </div>

//       <div className="card">
//         <h3 className="font-semibold text-secondary-900 mb-4">Activity Summary</h3>
//         <div className="space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Post Generation</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalPosts || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalPosts / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Hook Generation</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalHooks || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-accent-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalHooks / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-success-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Hashtag Generation</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalHashtags || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-success-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalHashtags / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Post Improvements</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalImproves || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-warning-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalImproves / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Carousels</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalCarousels || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-secondary-500 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalCarousels / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-secondary-700">Content Repurposed</span>
//                 <span className="text-sm font-semibold text-secondary-900">{stats.totalRepurpose || 0}</span>
//               </div>
//               <div className="w-full bg-secondary-100 rounded-full h-1.5">
//                 <div className="bg-primary-700 h-1.5 rounded-full" style={{ width: `${totalGenerations > 0 ? (stats.totalRepurpose / totalGenerations) * 100 : 0}%` }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AnalyticsPage





import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis,
} from 'recharts'
import {
  BarChart3, FileText, Sparkles, Hash, Wand2, Layers, Repeat, Bookmark,
  TrendingUp, Zap, ArrowRight, Flame, Lightbulb, Award,
} from 'lucide-react'
import api from '../services/api.js'

// ---------- static visual config only (no fake data values) ----------
const kpiConfig = [
  { key: 'totalPosts', label: 'Total Posts', icon: FileText, gradient: 'from-indigo-500 to-blue-500' },
  { key: 'totalHooks', label: 'Hooks', icon: Sparkles, gradient: 'from-fuchsia-500 to-pink-500' },
  { key: 'totalSaved', label: 'Saved', icon: Bookmark, gradient: 'from-amber-500 to-orange-500' },
  { key: 'totalHashtags', label: 'Hashtags', icon: Hash, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'viralScore', label: 'Viral Score', icon: TrendingUp, gradient: 'from-rose-500 to-red-500', unavailable: true },
  { key: 'aiCredits', label: 'AI Credits', icon: Zap, gradient: 'from-violet-500 to-indigo-500', unavailable: true },
]

const distributionConfig = [
  { key: 'totalPosts', label: 'Posts', color: '#6366f1' },
  { key: 'totalHooks', label: 'Hooks', color: '#d946ef' },
  { key: 'totalHashtags', label: 'Hashtags', color: '#10b981' },
  { key: 'totalImproves', label: 'Improved', color: '#f59e0b' },
  { key: 'totalCarousels', label: 'Carousels', color: '#8b5cf6' },
  { key: 'totalRepurpose', label: 'Repurposed', color: '#3b82f6' },
]

const activityRowsConfig = [
  { field: 'totalPosts', label: 'Post Generation', color: 'bg-indigo-500' },
  { field: 'totalHooks', label: 'Hook Generation', color: 'bg-fuchsia-500' },
  { field: 'totalHashtags', label: 'Hashtag Generation', color: 'bg-emerald-500' },
  { field: 'totalImproves', label: 'Post Improvements', color: 'bg-amber-500' },
  { field: 'totalCarousels', label: 'Carousels', color: 'bg-violet-500' },
  { field: 'totalRepurpose', label: 'Content Repurposed', color: 'bg-blue-500' },
]

// ---------- helpers that derive everything from REAL data only ----------
const dayKey = (d) => new Date(d).toISOString().slice(0, 10)

const buildWeeklyActivity = (recentActivity = []) => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({ key: dayKey(d), label: d.toLocaleDateString(undefined, { weekday: 'short' }), count: 0 })
  }
  const map = Object.fromEntries(days.map((d) => [d.key, d]))
  recentActivity.forEach((item) => {
    const k = dayKey(item.date)
    if (map[k]) map[k].count += 1
  })
  return days
}

const buildSparkline = (recentActivity = [], type) => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({ key: dayKey(d), value: 0 })
  }
  const map = Object.fromEntries(days.map((d) => [d.key, d]))
  recentActivity.forEach((item) => {
    if (item.type !== type) return
    const k = dayKey(item.date)
    if (map[k]) map[k].value += 1
  })
  return days
}

const buildGrowthHistory = (recentActivity = []) => {
  const sorted = [...recentActivity].sort((a, b) => new Date(a.date) - new Date(b.date))
  let running = 0
  return sorted.map((item, i) => {
    running += 1
    return { name: `#${i + 1}`, total: running }
  })
}

// ---------- small presentational pieces ----------
const KpiCard = ({ cfg, value, sparkline, index, loading }) => {
  const Icon = cfg.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="relative rounded-3xl p-5 bg-white border border-gray-200 shadow-sm
                 dark:bg-white/[0.04] dark:border-white/[0.06] dark:shadow-none
                 hover:shadow-lg dark:hover:border-white/[0.14] dark:hover:shadow-[0_0_30px_-10px_rgba(129,79,255,0.35)]
                 transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${cfg.gradient} shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>
        {cfg.unavailable && (
          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-white/40">
            Coming soon
          </span>
        )}
      </div>

      {loading ? (
        <Skeleton height={32} width={70} />
      ) : (
        <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {cfg.unavailable ? '—' : <CountUp end={value} duration={1.2} separator="," />}
        </p>
      )}
      <p className="text-sm text-gray-500 dark:text-white/50 mt-1">{cfg.label}</p>

      {!cfg.unavailable && (
        <div className="h-10 mt-3 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline}>
              <defs>
                <linearGradient id={`spark-${cfg.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} fill={`url(#spark-${cfg.key})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}

const ChartCard = ({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.4, delay }}
    className="rounded-3xl p-6 bg-white border border-gray-200 shadow-sm
               dark:bg-white/[0.04] dark:border-white/[0.06] dark:shadow-none"
  >
    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    {children}
  </motion.div>
)

const tooltipStyle = {
  background: 'rgba(20,20,28,0.92)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
  color: '#fff',
  fontSize: 12,
}

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

  if (!loading && !stats) {
    return (
      <div className="flex flex-col items-center text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100
                        dark:from-indigo-500/20 dark:to-fuchsia-500/20 flex items-center justify-center mb-4">
          <BarChart3 size={26} className="text-indigo-500 dark:text-indigo-300" />
        </div>
        <p className="text-gray-700 dark:text-white/70 mb-1 font-medium">Couldn't load analytics</p>
        <p className="text-sm text-gray-400 dark:text-white/40 mb-5">Check your connection and try again.</p>
        <div className="flex gap-3">
          <button onClick={fetchAnalytics} className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500">
            Retry
          </button>
          <button className="px-5 py-2.5 rounded-xl font-medium text-sm text-gray-600 border border-gray-300 dark:text-white/70 dark:border-white/10">
            Learn More
          </button>
        </div>
      </div>
    )
  }

  const s = stats || {}
  const totalGenerations = s.totalGenerations || 0
  const recentActivity = s.recentActivity || []

  const weeklyActivity = buildWeeklyActivity(recentActivity)
  const growthHistory = buildGrowthHistory(recentActivity)
  const distribution = distributionConfig
    .map((d) => ({ name: d.label, value: s[d.key] || 0, color: d.color }))
    .filter((d) => d.value > 0)

  const completionPct = totalGenerations > 0
    ? Math.min(100, Math.round(((s.totalSaved || 0) / totalGenerations) * 100))
    : 0

  return (
    <SkeletonTheme baseColor="rgba(120,120,140,0.15)" highlightColor="rgba(160,160,180,0.25)">
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
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Analytics</h1>
              <p className="text-gray-500 dark:text-white/50 mt-2 text-base">
                Track your content generation activity, in real time.
              </p>
              <div className="flex flex-wrap gap-6 mt-6">
                <div>
                  <p className="text-2xl font-bold">{loading ? '—' : <CountUp end={totalGenerations} duration={1.2} />}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Total Generations</p>
                </div>
                <div className="w-px bg-gray-200 dark:bg-white/10" />
                <div>
                  <p className="text-2xl font-bold">{loading ? '—' : <CountUp end={s.totalSaved || 0} duration={1.2} />}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Saved Posts</p>
                </div>
                <div className="w-px bg-gray-200 dark:bg-white/10" />
                <div>
                  <p className="text-2xl font-bold">{loading ? '—' : recentActivity.length}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">Recent Actions</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white
                         bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20 self-start"
            >
              <Zap size={18} />
              Generate New Post
            </motion.button>
          </div>
        </motion.div>

        {/* KPI CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiConfig.map((cfg, i) => (
            <KpiCard
              key={cfg.key}
              cfg={cfg}
              value={s[cfg.key] || 0}
              sparkline={buildSparkline(recentActivity, cfg.key.replace('total', '').toLowerCase().replace(/s$/, ''))}
              index={i}
              loading={loading}
            />
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-5">
          <ChartCard title="Weekly Activity">
            {loading ? <Skeleton height={220} /> : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyActivity}>
                  <defs>
                    <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,170,0.15)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="count" stroke="#818cf8" strokeWidth={2.5} fill="url(#weeklyFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Content Distribution" delay={0.05}>
            {loading ? <Skeleton height={220} /> : distribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {distribution.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-gray-400 dark:text-white/40">
                No content generated yet
              </div>
            )}
          </ChartCard>

          <ChartCard title="Growth History" delay={0.1}>
            {loading ? <Skeleton height={220} /> : growthHistory.length > 1 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={growthHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,170,0.15)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="total" stroke="#d946ef" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-gray-400 dark:text-white/40">
                Not enough activity yet to chart growth
              </div>
            )}
          </ChartCard>

          <ChartCard title="Generation Breakdown" delay={0.15}>
            {loading ? <Skeleton height={220} /> : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,170,0.15)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* PERFORMANCE PROGRESS */}
        <ChartCard title="Performance Progress" delay={0.05}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-44 h-44 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: completionPct, fill: '#818cf8' }]} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'rgba(150,150,170,0.12)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{completionPct}%</span>
                <span className="text-xs text-gray-400 dark:text-white/40">Save Rate</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              {activityRowsConfig.map((row, i) => {
                const value = s[row.field] || 0
                const pct = totalGenerations > 0 ? Math.round((value / totalGenerations) * 100) : 0
                return (
                  <div key={row.field}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-600 dark:text-white/60">{row.label}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: 0.1 * i }}
                        className={`h-full rounded-full ${row.color}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ChartCard>

        {/* AI INSIGHTS — derived from real totals only, no fabricated claims */}
        <div>
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {totalGenerations === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-white/[0.04] dark:border-white/[0.06] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} className="text-white" />
                </div>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Generate a few posts and insights about your content patterns will show up here.
                </p>
              </motion.div>
            ) : (
              <>
                {distribution.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-white/[0.04] dark:border-white/[0.06] flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Flame size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Most used: {[...distribution].sort((a, b) => b.value - a.value)[0].name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white/40">
                        Based on your generation history so far
                      </p>
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-white/[0.04] dark:border-white/[0.06] flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {completionPct}% of your generations are saved
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white/40">Your save rate so far</p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default AnalyticsPage