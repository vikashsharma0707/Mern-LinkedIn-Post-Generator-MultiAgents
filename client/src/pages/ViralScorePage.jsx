import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Loader2, BarChart3, Lightbulb, AlertTriangle, ArrowUp } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const scoreColors = {
  engagement: 'bg-primary-500',
  readability: 'bg-success-500',
  hookStrength: 'bg-accent-500',
  viralPotential: 'bg-warning-500',
  overall: 'bg-secondary-700',
  formatting: 'bg-primary-400',
  ctaEffectiveness: 'bg-success-400'
}

const scoreLabels = {
  engagement: 'Engagement',
  readability: 'Readability',
  hookStrength: 'Hook Strength',
  viralPotential: 'Viral Potential',
  overall: 'Overall',
  formatting: 'Formatting',
  ctaEffectiveness: 'CTA Effectiveness'
}

const ViralScorePage = () => {
  const [content, setContent] = useState('')
  const [model, setModel] = useState('gemini')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content || content.trim().length < 10) {
      toast.error('Please enter at least 10 characters')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/viral/analyze', { content, model })
      if (response.data.success) {
        setResult(response.data.data)
        toast.success('Analysis complete!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-error-600'
  }

  const getScoreBarColor = (score) => {
    if (score >= 80) return 'bg-success-500'
    if (score >= 60) return 'bg-warning-500'
    return 'bg-error-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Viral Score Analyzer</h1>
        <p className="text-secondary-500 mt-1">Analyze your post and predict its viral potential</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-700 mb-2">Your LinkedIn Post *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your LinkedIn post here to analyze..."
              className="textarea-field"
              rows={10}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
            <div className="grid grid-cols-4 gap-2">
              {models.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setModel(m.value)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    model === m.value ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'
                  }`}
                >
                  <div className="text-lg font-bold mb-1">{m.icon}</div>
                  <div className="text-xs font-medium">{m.label}</div>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <TrendingUp size={18} />}
            {loading ? 'Analyzing...' : 'Analyze Viral Potential'}
          </button>
        </div>

        <div>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      <BarChart3 size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Viral Score Analysis</h3>
                      <p className="text-sm text-secondary-500">AI-powered content assessment</p>
                    </div>
                  </div>

                  {result.scores && (
                    <div className="space-y-4">
                      {Object.entries(result.scores).filter(([key]) => key !== 'overall').map(([key, value]) => (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-secondary-600">{scoreLabels[key] || key}</span>
                            <span className={`text-sm font-bold ${getScoreColor(value)}`}>{value}/100</span>
                          </div>
                          <div className="w-full bg-secondary-100 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`h-2 rounded-full ${getScoreBarColor(value)}`}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-secondary-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-secondary-700">Overall Score</span>
                          <span className={`text-lg font-bold ${getScoreColor(result.scores.overall)}`}>{result.scores.overall}/100</span>
                        </div>
                        <div className="w-full bg-secondary-100 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.scores.overall}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-3 rounded-full ${getScoreBarColor(result.scores.overall)}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {result.strengths && (
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={18} className="text-success-600" />
                      <h3 className="font-semibold text-secondary-900 text-sm">Strengths</h3>
                    </div>
                    <div className="bg-success-50 rounded-lg p-4 text-sm text-secondary-700 whitespace-pre-wrap">
                      {result.strengths}
                    </div>
                  </div>
                )}

                {result.weaknesses && (
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={18} className="text-warning-600" />
                      <h3 className="font-semibold text-secondary-900 text-sm">Weaknesses</h3>
                    </div>
                    <div className="bg-warning-50 rounded-lg p-4 text-sm text-secondary-700 whitespace-pre-wrap">
                      {result.weaknesses}
                    </div>
                  </div>
                )}

                {result.improvements && (
                  <div className="card">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowUp size={18} className="text-primary-600" />
                      <h3 className="font-semibold text-secondary-900 text-sm">Actionable Improvements</h3>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 text-sm text-secondary-700 whitespace-pre-wrap">
                      {result.improvements}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ViralScorePage
