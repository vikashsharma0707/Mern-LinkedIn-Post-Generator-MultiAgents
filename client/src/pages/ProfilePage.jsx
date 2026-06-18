import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { User, Mail, Shield, Calendar, Loader2 } from 'lucide-react'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Profile</h1>
        <p className="text-secondary-500 mt-1">Manage your account settings</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary-900">{user?.name}</h2>
            <p className="text-secondary-500">{user?.email}</p>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium mt-2">
              <Shield size={12} />
              {user?.role || 'User'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <User size={18} className="text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Full Name</p>
              <p className="font-medium text-secondary-900">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Mail size={18} className="text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Email Address</p>
              <p className="font-medium text-secondary-900">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Shield size={18} className="text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Account Type</p>
              <p className="font-medium text-secondary-900 capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
