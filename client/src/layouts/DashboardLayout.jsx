// import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'
// import Sidebar from '../components/Sidebar.jsx'
// import TopBar from '../components/TopBar.jsx'

// const DashboardLayout = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   if (!user) {
//     navigate('/login')
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-secondary-50 flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
//         <TopBar />
//         <main className="flex-1 overflow-y-auto p-6 lg:p-8">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout


import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Sidebar from '../components/Sidebar.jsx'
import TopBar from '../components/TopBar.jsx'

const DashboardLayout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-[#0a0c12]">
      <Sidebar />

      {/*
        ml-* values MUST match Sidebar's SIDEBAR_WIDTH (w-72 lg:w-64 xl:w-72).
        Sidebar is `fixed`, so this margin reserves its space instead of
        the old flex layout (which made the sidebar scroll with the page).
      */}
      <div className="flex flex-col min-h-screen lg:ml-64 xl:ml-72">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout