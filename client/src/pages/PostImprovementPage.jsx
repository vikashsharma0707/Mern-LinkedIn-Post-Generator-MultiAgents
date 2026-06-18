import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Loader2, Copy, Check, ArrowDown } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const PostImprovementPage = () => {
  const [content, setContent] = useState('')
  const [model, setModel] = useState('gemini')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copiedField, setCopiedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content || content.trim().length < 10) {
      toast.error('Please enter at least 10 characters')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/improve/post', { content, model })
      if (response.data.success) {
        setResult(response.data.data)
        toast.success('Post improved!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to improve post')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Post Improvement Agent</h1>
        <p className="text-secondary-500 mt-1">Paste your LinkedIn post and get AI-powered improvements</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-700 mb-2">Your LinkedIn Post *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your LinkedIn post here..."
                className="textarea-field"
                rows={8}
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
              {loading ? 'Improving...' : 'Improve My Post'}
            </button>
          </div>
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                      <Wand2 size={18} className="text-warning-600" />
                      Improved Post
                    </h3>
                    <button
                      onClick={() => handleCopy(result.improvedPost, 'improved')}
                      className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                    >
                      {copiedField === 'improved' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                    </button>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-800 leading-relaxed">
                    {result.improvedPost}
                  </div>
                </div>

                {result.betterHooks && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-secondary-900 text-sm">Better Hooks</h3>
                      <button
                        onClick={() => handleCopy(result.betterHooks, 'hooks')}
                        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                      >
                        {copiedField === 'hooks' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                      </button>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
                      {result.betterHooks}
                    </div>
                  </div>
                )}

                {result.betterCta && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-secondary-900 text-sm">Better CTAs</h3>
                      <button
                        onClick={() => handleCopy(result.betterCta, 'cta')}
                        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                      >
                        {copiedField === 'cta' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                      </button>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
                      {result.betterCta}
                    </div>
                  </div>
                )}

                {result.formattingTips && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-secondary-900 text-sm">Formatting Tips</h3>
                      <button
                        onClick={() => handleCopy(result.formattingTips, 'formatting')}
                        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                      >
                        {copiedField === 'formatting' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                      </button>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
                      {result.formattingTips}
                    </div>
                  </div>
                )}

                {result.engagementBoosters && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-secondary-900 text-sm">Engagement Boosters</h3>
                      <button
                        onClick={() => handleCopy(result.engagementBoosters, 'engagement')}
                        className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                      >
                        {copiedField === 'engagement' ? <Check size={16} className="text-success-600" /> : <Copy size={16} className="text-secondary-600" />}
                      </button>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-secondary-700">
                      {result.engagementBoosters}
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

export default PostImprovementPage
