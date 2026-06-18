import { useNavigate } from 'react-router-dom'
import { Bot, FileText, Sparkles, Hash, Wand2, TrendingUp, Layers, Repeat, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: FileText, title: 'AI Post Generator', desc: 'Generate professional LinkedIn posts with optimized structure and CTAs.' },
  { icon: Sparkles, title: 'Hook Generator', desc: 'Create scroll-stopping hooks that capture attention instantly.' },
  { icon: Hash, title: 'Hashtag Optimizer', desc: 'Get the perfect mix of hashtags to maximize your reach.' },
  { icon: Wand2, title: 'Post Improver', desc: 'Transform your existing posts into high-performing content.' },
  { icon: TrendingUp, title: 'Viral Score', desc: 'Analyze your posts and predict their viral potential.' },
  { icon: Layers, title: 'Carousel Creator', desc: 'Build multi-slide carousel content for maximum engagement.' },
  { icon: Repeat, title: 'Content Repurposer', desc: 'Turn any content into LinkedIn posts, Twitter threads, and blogs.' },
]

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-secondary-50">
      <nav className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-secondary-900 leading-tight">LinkedIn Post Generator</h1>
              <p className="text-xs text-secondary-500 font-medium">Agentic AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-secondary-700 font-medium hover:text-primary-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-primary text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              Powered by OpenRouter AI
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
              Generate LinkedIn Posts<br />
              <span className="gradient-text">10x Faster with AI</span>
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our Agentic AI workflow analyzes trends, plans content, writes posts, and reviews quality
              to deliver professional LinkedIn content that drives engagement.
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary flex items-center gap-2"
              >
                Start Creating Free
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-outline"
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-secondary-500">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Multiple AI Models</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Agentic Workflow</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Free to Start</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Everything You Need</h2>
            <p className="text-secondary-600">A complete toolkit for LinkedIn content creation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-secondary-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Amazing LinkedIn Content?</h2>
          <p className="text-secondary-400 mb-8">Join thousands of professionals using AI to grow their LinkedIn presence.</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <footer className="bg-secondary-950 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-secondary-500 text-sm"> LinkedIn Post Generator Agent. Built with Agentic AI.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
