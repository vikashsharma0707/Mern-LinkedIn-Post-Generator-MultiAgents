import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, Loader2, Copy, Check, RefreshCw } from 'lucide-react'
import api from '../services/api.js'
import toast from 'react-hot-toast'

const models = [
  { value: 'gemini', label: 'Google Gemini', icon: 'G' },
  { value: 'llama', label: 'Meta Llama', icon: 'L' },
  { value: 'qwen', label: 'Qwen', icon: 'Q' },
  { value: 'mistral', label: 'Mistral', icon: 'M' },
]

const HashtagGeneratorPage = () => {
  const [topic, setTopic] = useState('')
  const [industry, setIndustry] = useState('')
  const [count, setCount] = useState(15)
  const [model, setModel] = useState('gemini')
  const [hashtags, setHashtags] = useState([])
  const [hashtagString, setHashtagString] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic) {
      toast.error('Please enter a topic')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/hashtags/generate', { topic, industry, count, model })
      if (response.data.success) {
        setHashtags(response.data.data.hashtags)
        setHashtagString(response.data.data.hashtagString)
        toast.success(`${response.data.data.hashtags.length} hashtags generated!`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate hashtags')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Hashtags copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Hashtag Generator</h1>
        <p className="text-secondary-500 mt-1">Generate optimized hashtags for maximum reach</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Artificial Intelligence"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Technology, Marketing"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Number of Hashtags</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.min(20, Math.max(5, parseInt(e.target.value) || 5)))}
                min="5"
                max="20"
                className="input-field"
              />
            </div>
            <div>
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
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Hash size={18} />}
              {loading ? 'Generating...' : 'Generate Hashtags'}
            </button>
          </form>
        </div>

        <div>
          <AnimatePresence>
            {hashtags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary-900 flex items-center gap-2">
                    <Hash size={18} className="text-success-600" />
                    Generated Hashtags
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(hashtagString)}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy All'}
                    </button>
                    <button
                      onClick={() => handleSubmit({ preventDefault: () => {} })}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <RefreshCw size={14} />
                      Regenerate
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hashtags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100 cursor-pointer hover:bg-primary-100 transition-colors"
                      onClick={() => handleCopy(`#${tag}`)}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>

                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="text-xs text-secondary-500 mb-2 font-medium">Full String</div>
                  <p className="text-sm text-secondary-700 leading-relaxed">{hashtagString}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default HashtagGeneratorPage
