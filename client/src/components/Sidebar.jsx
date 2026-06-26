// import { NavLink, useLocation } from 'react-router-dom'
// import { useState } from 'react'
// import {
//   LayoutDashboard,
//   FileText,
//   Sparkles,
//   Hash,
//   Wand2,
//   TrendingUp,
//   Layers,
//   Repeat,
//   Clock,
//   BarChart3,
//   Bookmark,
//   User,
//   LogOut,
//   Menu,
//   X,
//   Bot
// } from 'lucide-react'
// import { useAuth } from '../context/AuthContext.jsx'

// const menuItems = [
//   { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { path: '/dashboard/generate', label: 'Generate Post', icon: FileText },
//   { path: '/dashboard/hooks', label: 'Hook Generator', icon: Sparkles },
//   { path: '/dashboard/hashtags', label: 'Hashtags', icon: Hash },
//   { path: '/dashboard/improve', label: 'Post Improver', icon: Wand2 },
//   { path: '/dashboard/viral', label: 'Viral Score', icon: TrendingUp },
//   { path: '/dashboard/carousel', label: 'Carousel', icon: Layers },
//   { path: '/dashboard/repurpose', label: 'Repurpose', icon: Repeat },
//   { path: '/dashboard/history', label: 'History', icon: Clock },
//   { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
//   { path: '/dashboard/saved', label: 'Saved Posts', icon: Bookmark },
//   { path: '/dashboard/profile', label: 'Profile', icon: User },
// ]

// const Sidebar = () => {
//   const { logout } = useAuth()
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const location = useLocation()

//   return (
//     <>
//       <button
//         onClick={() => setMobileOpen(!mobileOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-secondary-200"
//       >
//         {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-secondary-200 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
//         <div className="p-6 border-b border-secondary-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
//               <Bot size={20} className="text-white" />
//             </div>
//             <div>
//               <h1 className="font-bold text-lg text-secondary-900 leading-tight">LinkedIn Gen</h1>
//               <p className="text-xs text-secondary-500 font-medium">AI Agent</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
//           {menuItems.map((item) => {
//             const Icon = item.icon
//             const isActive = location.pathname === item.path
//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={isActive ? 'nav-item-active' : 'nav-item'}
//               >
//                 <Icon size={18} />
//                 <span>{item.label}</span>
//               </NavLink>
//             )
//           })}
//         </nav>

//         <div className="p-4 border-t border-secondary-200">
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-error-600 hover:bg-error-50 transition-all duration-200 font-medium"
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
//     </>
//   )
// }

// export default Sidebar



import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Hash,
  Wand2,
  TrendingUp,
  Layers,
  Repeat,
  Clock,
  BarChart3,
  Bookmark,
  User,
  LogOut,
  Menu,
  X,
  Bot
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/generate', label: 'Generate Post', icon: FileText },
  { path: '/dashboard/hooks', label: 'Hook Generator', icon: Sparkles },
  { path: '/dashboard/hashtags', label: 'Hashtags', icon: Hash },
  { path: '/dashboard/improve', label: 'Post Improver', icon: Wand2 },
  { path: '/dashboard/viral', label: 'Viral Score', icon: TrendingUp },
  { path: '/dashboard/carousel', label: 'Carousel', icon: Layers },
  { path: '/dashboard/repurpose', label: 'Repurpose', icon: Repeat },
  { path: '/dashboard/history', label: 'History', icon: Clock },
  { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/dashboard/saved', label: 'Saved Posts', icon: Bookmark },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
]

// IMPORTANT: keep this in sync with the lg:ml-* values in DashboardLayout.jsx
const SIDEBAR_WIDTH = 'w-72 lg:w-64 xl:w-72'

const Sidebar = () => {
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl
                   bg-white border border-gray-200 shadow-md
                   dark:bg-white/[0.06] dark:border-white/10 dark:backdrop-blur-xl
                   text-gray-700 dark:text-white"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Fixed sidebar — stays in place on desktop, slides in/out on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 ${SIDEBAR_WIDTH}
                    bg-white border-r border-gray-200
                    dark:bg-[#0a0c12] dark:border-white/[0.06]
                    flex flex-col transition-transform duration-300 ease-out
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="p-5 lg:p-6 border-b border-gray-200 dark:border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500
                            flex items-center justify-center shadow-lg shadow-fuchsia-500/20 flex-shrink-0">
              <Bot size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base lg:text-lg text-gray-900 dark:text-white leading-tight truncate">
                LinkedIn Gen
              </h1>
              <p className="text-xs text-gray-500 dark:text-white/40 font-medium truncate">AI Agent</p>
            </div>
          </div>
        </div>

        {/* Nav — scrolls independently if menu list is taller than viewport */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200 group
                            ${isActive
                              ? 'bg-gradient-to-r from-indigo-50 to-fuchsia-50 text-indigo-700 border border-indigo-100 dark:from-indigo-500/20 dark:to-fuchsia-500/20 dark:text-white dark:border-white/10'
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/[0.05]'}`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-white/40 dark:group-hover:text-white/70'}
                />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 lg:p-4 border-t border-gray-200 dark:border-white/[0.06] flex-shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium
                       text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10
                       transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar