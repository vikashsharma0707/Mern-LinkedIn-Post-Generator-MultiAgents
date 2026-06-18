import { useAuth } from '../context/AuthContext.jsx'
import { Bell, User } from 'lucide-react'

const TopBar = () => {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-secondary-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 ml-12 lg:ml-0">
        <div className="text-sm text-secondary-500">
          Welcome back, <span className="font-semibold text-secondary-900">{user?.name || 'User'}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors">
          <Bell size={20} className="text-secondary-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-secondary-900">{user?.name}</p>
            <p className="text-xs text-secondary-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
