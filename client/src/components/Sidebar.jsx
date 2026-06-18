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

const Sidebar = () => {
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-secondary-200"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-secondary-200 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-secondary-900 leading-tight">LinkedIn Gen</h1>
              <p className="text-xs text-secondary-500 font-medium">AI Agent</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={isActive ? 'nav-item-active' : 'nav-item'}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-secondary-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-error-600 hover:bg-error-50 transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
