import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import GeneratePostPage from './pages/GeneratePostPage.jsx'
import HookGeneratorPage from './pages/HookGeneratorPage.jsx'
import HashtagGeneratorPage from './pages/HashtagGeneratorPage.jsx'
import PostImprovementPage from './pages/PostImprovementPage.jsx'
import ViralScorePage from './pages/ViralScorePage.jsx'
import CarouselGeneratorPage from './pages/CarouselGeneratorPage.jsx'
import ContentRepurposePage from './pages/ContentRepurposePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SavedPostsPage from './pages/SavedPostsPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <DashboardLayout /> : <LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="generate" element={<GeneratePostPage />} />
        <Route path="hooks" element={<HookGeneratorPage />} />
        <Route path="hashtags" element={<HashtagGeneratorPage />} />
        <Route path="improve" element={<PostImprovementPage />} />
        <Route path="viral" element={<ViralScorePage />} />
        <Route path="carousel" element={<CarouselGeneratorPage />} />
        <Route path="repurpose" element={<ContentRepurposePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="saved" element={<SavedPostsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
