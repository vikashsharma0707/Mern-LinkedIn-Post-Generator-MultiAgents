import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Sparkles, Loader2, Copy, Check, Hash, TrendingUp, Lightbulb, FileSearch, PenTool, Search, Tag, ClipboardCheck } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const tones = ['professional', 'technical', 'casual', 'storytelling', 'motivational', 'founder style']
const lengths = ['short', 'medium', 'long']
const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const agentSteps = [
  { id: 'research', label: 'Research Agent', icon: Search },
  { id: 'planner', label: 'Planner Agent', icon: Lightbulb },
  { id: 'writer', label: 'Writer Agent', icon: PenTool },
  { id: 'hashtag', label: 'Hashtag Agent', icon: Tag },
  { id: 'reviewer', label: 'Reviewer Agent', icon: ClipboardCheck },
]

const GeneratePostPage = () => {
  const [formData, setFormData] = useState({
    topic: '',
    industry: '',
    audience: '',
    tone: 'professional',
    length: 'medium',
    additionalContext: '',
    model: 'gemini'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('post')
  const [activeStep, setActiveStep] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.topic || !formData.industry || !formData.audience) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    setActiveStep(0)
    setResult(null)

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < 4) return prev + 1
        return prev
      })
    }, 2000)

    try {
      const response = await api.post('/posts/generate', formData)
      if (response.data.success) {
        setResult(response.data.data.post)
        setActiveStep(5)
        toast.success('Post generated successfully!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate post')
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Generate LinkedIn Post</h1>
        <p className="text-secondary-500 mt-1">Let AI agents create your next viral post</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Topic *</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., AI in Marketing"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Industry *</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Target Audience *</label>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                placeholder="e.g., Marketing Managers, Founders, Developers"
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Tone</label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="select-field"
                >
                  {tones.map(tone => (
                    <option key={tone} value={tone}>{tone.charAt(0).toUpperCase() + tone.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Length</label>
                <select
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="select-field"
                >
                  {lengths.map(len => (
                    <option key={len} value={len}>{len.charAt(0).toUpperCase() + len.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">AI Model</label>
              <div className="grid grid-cols-4 gap-2">
                {models.map((model) => (
                  <button
                    key={model.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, model: model.value })}
                    className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                      formData.model === model.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'
                    }`}
                  >
                    <div className="text-lg font-bold mb-1">{model.icon}</div>
                    <div className="text-xs font-medium">{model.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Additional Context</label>
              <textarea
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                placeholder="Any specific points, angle, or context..."
                className="textarea-field"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {loading ? 'AI Agents Working...' : 'Generate with AI Agents'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="card">
              <h3 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-primary-600" />
                Agentic Workflow
              </h3>
              <div className="space-y-2">
                {agentSteps.map((step, index) => {
                  const Icon = step.icon
                  const status = index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending'
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`agent-step ${status === 'complete' ? 'agent-step-complete' : status === 'active' ? 'agent-step-active' : 'agent-step-pending'}`}
                    >
                      <Icon size={16} />
                      <span>{step.label}</span>
                      {status === 'complete' && <Check size={14} className="ml-auto" />}
                      {status === 'active' && <Loader2 size={14} className="ml-auto animate-spin" />}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                    <FileText size={18} className="text-primary-600" />
                    Generated Post
                  </h3>
                  <div className="flex items-center gap-2">
                    {result.scores && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-primary-50 rounded-lg text-xs font-semibold text-primary-700">
                        <TrendingUp size={12} />
                        Score: {result.scores.overall}
                      </div>
                    )}
                    <button
                      onClick={() => handleCopy(result.content + '\n\n' + result.hashtagString)}
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 border-b border-secondary-200">
                  {['post', 'hashtags', 'review'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-all ${
                        activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-secondary-500 hover:text-secondary-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'post' && (
                  <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm leading-relaxed text-secondary-800">
                    {result.content}
                  </div>
                )}

                {activeTab === 'hashtags' && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 text-sm text-secondary-700">
                      {result.hashtagString}
                    </div>
                  </div>
                )}

                {activeTab === 'review' && (
                  <div className="space-y-4">
                    {result.scores && (
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(result.scores).map(([key, value]) => (
                          <div key={key} className="bg-secondary-50 rounded-lg p-3">
                            <div className="text-xs text-secondary-500 uppercase mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="text-2xl font-bold text-secondary-900">{value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {result.review && (
                      <div className="bg-secondary-50 rounded-lg p-4 text-sm text-secondary-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
                        {result.review}
                      </div>
                    )}
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

export default GeneratePostPage
